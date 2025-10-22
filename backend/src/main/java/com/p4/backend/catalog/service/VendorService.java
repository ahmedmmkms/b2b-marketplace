package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.VendorRequestDto;
import com.p4.backend.catalog.dto.VendorResponseDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.MediaAsset;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;
    private final ProductRepository productRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional
    public ApiResponse<VendorResponseDto> createVendor(VendorRequestDto request) {
        if (vendorRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error(ProblemDetails.validationError("Vendor with the provided email already exists"));
        }

        Vendor vendor = new Vendor();
        applyVendorUpdates(vendor, request);

        Vendor savedVendor = vendorRepository.save(vendor);
        return ApiResponse.success(CatalogMapper.toVendorResponse(savedVendor));
    }

    @Transactional(readOnly = true)
    public ApiResponse<VendorResponseDto> getVendorById(String vendorId) {
        return vendorRepository.findById(vendorId)
                .map(CatalogMapper::toVendorResponse)
                .map(ApiResponse::success)
                .orElseGet(() -> ApiResponse.error(ProblemDetails.notFound("Vendor")));
    }

    @Transactional
    public ApiResponse<VendorResponseDto> updateVendor(String vendorId, VendorRequestDto request) {
        Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
        if (vendorOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Vendor"));
        }

        Vendor vendor = vendorOpt.get();

        if (!vendor.getEmail().equalsIgnoreCase(request.getEmail())
                && vendorRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error(ProblemDetails.validationError("Another vendor already uses the provided email"));
        }

        applyVendorUpdates(vendor, request);
        Vendor updatedVendor = vendorRepository.save(vendor);

        return ApiResponse.success(CatalogMapper.toVendorResponse(updatedVendor));
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<VendorResponseDto>> listVendors(String status,
                                                            String search,
                                                            int page,
                                                            int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Vendor> vendorPage;
        Vendor.VendorStatus resolvedStatus = resolveStatus(status);

        if (resolvedStatus != null && search != null && !search.isBlank()) {
            vendorPage = vendorRepository.findByVendorStatusAndBusinessNameContainingIgnoreCase(
                    resolvedStatus, search, pageable);
        } else if (resolvedStatus != null) {
            vendorPage = vendorRepository.findByVendorStatus(resolvedStatus, pageable);
        } else if (search != null && !search.isBlank()) {
            vendorPage = vendorRepository.findByBusinessNameContainingIgnoreCase(search, pageable);
        } else {
            vendorPage = vendorRepository.findAll(pageable);
        }

        Page<VendorResponseDto> dtoPage = vendorPage.map(CatalogMapper::toVendorResponse);
        return ApiResponse.success(dtoPage, paginationMetadata(vendorPage));
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductResponseDto>> listVendorProducts(String vendorId,
                                                                    String status,
                                                                    int page,
                                                                    int size) {
        Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
        if (vendorOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Vendor"));
        }

        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1),
                Sort.by(Sort.Direction.DESC, "createdAt"));

        Product.ProductStatus productStatus = resolveProductStatus(status);

        Page<Product> productPage;
        if (productStatus != null) {
            productPage = productRepository.findByVendorIdAndProductStatus(vendorId, productStatus, pageable);
        } else {
            productPage = productRepository.findByVendorId(vendorId, pageable);
        }

        List<ProductResponseDto> productDtos = productPage.stream()
                .map(product -> {
                    List<ProductMedia> media = productMediaRepository
                            .findByProductIdOrderByDisplayOrderAsc(product.getId());
                    List<MediaAsset> mediaAssets = media.stream()
                            .map(ProductMedia::getMediaAsset)
                            .collect(Collectors.toList());
                    return CatalogMapper.toProductResponse(
                            product,
                            List.of(),
                            mediaAssets.stream()
                                    .map(CatalogMapper::toMediaAssetDto)
                                    .toList());
                })
                .toList();

        Page<ProductResponseDto> dtoPage = new PageImpl<>(productDtos, pageable, productPage.getTotalElements());

        return ApiResponse.success(dtoPage, paginationMetadata(productPage));
    }

    private Product.ProductStatus resolveProductStatus(String status) {
        if (status == null || status.isBlank()) {
            return null;
        }

        try {
            return Product.ProductStatus.valueOf(status.trim().toUpperCase(Locale.US));
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }

    private void applyVendorUpdates(Vendor vendor, VendorRequestDto request) {
        vendor.setBusinessName(request.getBusinessName());
        vendor.setDescription(request.getDescription());
        vendor.setEmail(request.getEmail());
        vendor.setPhone(request.getPhone());
        vendor.setAddress(request.getAddress());
        vendor.setTaxId(request.getTaxId());
        vendor.setBusinessLicenseNo(request.getBusinessLicenseNo());
        vendor.setRegistrationDate(parseLocalDate(request.getRegistrationDate(), vendor.getRegistrationDate()));
        vendor.setApprovalDate(parseLocalDate(request.getApprovalDate(), vendor.getApprovalDate()));
        vendor.setVendorStatus(resolveStatus(request.getVendorStatus(),
                vendor.getVendorStatus() != null ? vendor.getVendorStatus() : Vendor.VendorStatus.PENDING));
        Boolean currentKyc = vendor.getKycVerified() != null ? vendor.getKycVerified() : Boolean.FALSE;
        vendor.setKycVerified(request.getKycVerified() != null ? request.getKycVerified() : currentKyc);
        vendor.setKycVerifiedAt(parseLocalDate(request.getKycVerifiedAt(), vendor.getKycVerifiedAt()));
        vendor.setKycVerifiedBy(request.getKycVerifiedBy());
    }

    private LocalDate parseLocalDate(String value, LocalDate fallback) {
        if (value == null || value.isBlank()) {
            return fallback;
        }
        try {
            return LocalDate.parse(value);
        } catch (DateTimeParseException ex) {
            return fallback;
        }
    }

    private Vendor.VendorStatus resolveStatus(String status) {
        return resolveStatus(status, null);
    }

    private Vendor.VendorStatus resolveStatus(String status, Vendor.VendorStatus fallback) {
        if (status == null || status.isBlank()) {
            return fallback;
        }

        try {
            return Vendor.VendorStatus.valueOf(status.trim().toUpperCase(Locale.US));
        } catch (IllegalArgumentException ex) {
            return fallback;
        }
    }

    private Map<String, Object> paginationMetadata(Page<?> page) {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("page", page.getNumber());
        metadata.put("size", page.getSize());
        metadata.put("totalPages", page.getTotalPages());
        metadata.put("totalElements", page.getTotalElements());
        metadata.put("numberOfElements", page.getNumberOfElements());
        metadata.put("first", page.isFirst());
        metadata.put("last", page.isLast());
        metadata.put("sorted", page.getSort().isSorted());
        return metadata;
    }
}
