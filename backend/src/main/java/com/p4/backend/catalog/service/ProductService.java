package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductRequestDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.model.Vendor;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.catalog.repository.VendorRepository;
import com.p4.backend.catalog.specification.ProductSpecifications;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ProductService {

    private static final Pattern NON_ALPHANUMERIC = Pattern.compile("[^a-z0-9]+");

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional
    public ApiResponse<ProductResponseDto> createProduct(ProductRequestDto request) {
        if (productRepository.existsBySku(request.getSku())) {
            return ApiResponse.error(ProblemDetails.validationError("SKU already exists"));
        }

        Optional<Vendor> vendorOpt = vendorRepository.findById(request.getVendorId());
        if (vendorOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Vendor"));
        }

        Product product = new Product();
        applyProductUpdates(product, request, vendorOpt.get());

        Product saved = productRepository.save(product);

        ProductResponseDto dto = mapToProductResponse(saved);
        return ApiResponse.success(dto);
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductResponseDto> getProductById(String productId) {
        return productRepository.findById(productId)
                .map(this::mapToProductResponse)
                .map(ApiResponse::success)
                .orElseGet(() -> ApiResponse.error(ProblemDetails.notFound("Product")));
    }

    @Transactional
    public ApiResponse<ProductResponseDto> updateProduct(String productId, ProductRequestDto request) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        Product existing = productOpt.get();

        if (!existing.getSku().equalsIgnoreCase(request.getSku())
                && productRepository.existsBySku(request.getSku())) {
            return ApiResponse.error(ProblemDetails.validationError("SKU already exists"));
        }

        Optional<Vendor> vendorOpt = vendorRepository.findById(request.getVendorId());
        if (vendorOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Vendor"));
        }

        applyProductUpdates(existing, request, vendorOpt.get());
        Product updated = productRepository.save(existing);

        return ApiResponse.success(mapToProductResponse(updated));
    }

    @Transactional
    public ApiResponse<Void> deleteProduct(String productId) {
        if (!productRepository.existsById(productId)) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        productRepository.deleteById(productId);
        return ApiResponse.success(null);
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductResponseDto>> listProducts(String keyword,
                                                              String vendorId,
                                                              String categoryId,
                                                              String status,
                                                              Boolean isActive,
                                                              BigDecimal minPrice,
                                                              BigDecimal maxPrice,
                                                              int page,
                                                              int size,
                                                              String sort,
                                                              String direction) {
        Sort sortSpec = Sort.by(resolveDirection(direction), resolveSortField(sort));
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1), sortSpec);

        Product.ProductStatus productStatus = resolveProductStatus(status);

        Specification<Product> specification = ProductSpecifications.build(
                keyword,
                vendorId,
                categoryId,
                productStatus,
                isActive,
                minPrice,
                maxPrice
        );

        Page<Product> productPage = productRepository.findAll(specification, pageable);

        List<ProductResponseDto> dtos = productPage.stream()
                .map(this::mapToProductResponse)
                .toList();

        Page<ProductResponseDto> dtoPage = new PageImpl<>(dtos, pageable, productPage.getTotalElements());
        return ApiResponse.success(dtoPage, paginationMetadata(productPage));
    }

    private void applyProductUpdates(Product product, ProductRequestDto request, Vendor vendor) {
        product.setVendor(vendor);
        product.setName(request.getName());
        product.setSlug(normalizeSlug(request.getSlug(), request.getName()));
        product.setDescription(request.getDescription());
        product.setShortDescription(request.getShortDescription());
        product.setSku(request.getSku());
        product.setUpc(request.getUpc());
        product.setGtin(request.getGtin());
        product.setMpn(request.getMpn());
        product.setBrand(request.getBrand());
        product.setCategoryId(request.getCategoryId());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setMinOrderQuantity(request.getMinOrderQuantity());
        product.setMoq(request.getMoq());
        product.setWeight(request.getWeight());
        product.setDimensionsLength(request.getDimensionsLength());
        product.setDimensionsWidth(request.getDimensionsWidth());
        product.setDimensionsHeight(request.getDimensionsHeight());
        product.setDimensions(request.getDimensions());
        product.setPackagingInfo(request.getPackagingInfo());
        product.setTaxClass(request.getTaxClass());
        product.setMetaTitle(request.getMetaTitle());
        product.setMetaDescription(request.getMetaDescription());
        product.setMetaKeywords(request.getMetaKeywords());
        product.setInventoryTracking(request.getInventoryTracking() != null ? request.getInventoryTracking() : Boolean.FALSE);
        product.setInventoryStatus(resolveInventoryStatus(request.getInventoryStatus(), product.getInventoryStatus()));
        product.setProductStatus(resolveProductStatus(request.getProductStatus(), product.getProductStatus()));
        product.setIsActive(request.getIsActive() != null ? request.getIsActive() : Boolean.TRUE);
    }

    private ProductResponseDto mapToProductResponse(Product product) {
        List<ProductMedia> productMedia = productMediaRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
        return CatalogMapper.toProductResponse(
                product,
                List.of(),
                productMedia.stream()
                        .map(ProductMedia::getMediaAsset)
                        .map(CatalogMapper::toMediaAssetDto)
                        .toList()
        );
    }

    private Sort.Direction resolveDirection(String direction) {
        if ("asc".equalsIgnoreCase(direction)) {
            return Sort.Direction.ASC;
        }
        return Sort.Direction.DESC;
    }

    private String resolveSortField(String sort) {
        if (sort == null || sort.isBlank()) {
            return "createdAt";
        }

        return switch (sort) {
            case "name" -> "name";
            case "price" -> "price.amount";
            case "sku" -> "sku";
            case "stockQuantity" -> "stockQuantity";
            default -> "createdAt";
        };
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

    private String normalizeSlug(String slug, String fallback) {
        String base = (slug == null || slug.isBlank()) ? fallback : slug;
        if (base == null) {
            return null;
        }

        String normalized = Normalizer.normalize(base, Normalizer.Form.NFD);
        String lowercase = normalized.toLowerCase(Locale.US);
        String sanitized = NON_ALPHANUMERIC.matcher(lowercase).replaceAll("-");
        return sanitized.replaceAll("^-+|-+$", "");
    }

    private Product.ProductStatus resolveProductStatus(String status) {
        return resolveProductStatus(status, null);
    }

    private Product.ProductStatus resolveProductStatus(String status, Product.ProductStatus fallback) {
        if (status == null || status.isBlank()) {
            return fallback != null ? fallback : Product.ProductStatus.DRAFT;
        }

        try {
            return Product.ProductStatus.valueOf(status.trim().toUpperCase(Locale.US));
        } catch (IllegalArgumentException ex) {
            return fallback != null ? fallback : Product.ProductStatus.DRAFT;
        }
    }

    private Product.InventoryStatus resolveInventoryStatus(String status, Product.InventoryStatus fallback) {
        if (status == null || status.isBlank()) {
            return fallback != null ? fallback : Product.InventoryStatus.IN_STOCK;
        }

        try {
            return Product.InventoryStatus.valueOf(status.trim().toUpperCase(Locale.US));
        } catch (IllegalArgumentException ex) {
            return fallback != null ? fallback : Product.InventoryStatus.IN_STOCK;
        }
    }
}
