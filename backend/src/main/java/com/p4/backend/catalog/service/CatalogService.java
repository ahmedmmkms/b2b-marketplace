package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.MediaAssetDto;
import com.p4.backend.catalog.dto.ProductResponseDto;
import com.p4.backend.catalog.dto.ProductSearchRequestDto;
import com.p4.backend.catalog.dto.SearchRequestDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductMedia;
import com.p4.backend.catalog.repository.ProductMediaRepository;
import com.p4.backend.catalog.repository.ProductRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final ProductRepository productRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductResponseDto>> browseCatalog(ProductSearchRequestDto request) {
        Pageable pageable = PageRequest.of(
                Math.max(Optional.ofNullable(request.getPage()).orElse(0), 0),
                Math.max(Optional.ofNullable(request.getSize()).orElse(20), 1),
                resolveSort(request.getSortBy(), request.getSortOrder())
        );

        Page<Product> productPage;
        boolean hasKeyword = request.getKeyword() != null && !request.getKeyword().isBlank();
        boolean hasVendor = request.getVendorId() != null && !request.getVendorId().isBlank();

        if (hasKeyword && hasVendor) {
            productPage = productRepository.searchByVendorIdAndFullText(
                    request.getVendorId(),
                    request.getKeyword(),
                    pageable
            );
        } else if (hasKeyword) {
            productPage = productRepository.searchFullText(request.getKeyword(), pageable);
        } else {
            Specification<Product> specification = ProductSpecifications.build(
                    request.getKeyword(),
                    request.getVendorId(),
                    request.getCategory(),
                    Product.ProductStatus.ACTIVE,
                    Boolean.TRUE,
                    request.getMinPrice(),
                    request.getMaxPrice()
            );
            productPage = productRepository.findAll(specification, pageable);
        }

        List<Product> filteredContent = applyAdditionalFilters(
                productPage.getContent(),
                request.getCategory(),
                request.getMinPrice(),
                request.getMaxPrice()
        );

        List<ProductResponseDto> dtos = filteredContent.stream()
                .map(this::mapToProductResponse)
                .toList();

        Page<ProductResponseDto> dtoPage = new PageImpl<>(
                dtos,
                pageable,
                hasKeyword ? dtos.size() : productPage.getTotalElements()
        );

        return ApiResponse.success(dtoPage, paginationMetadata(productPage));
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductResponseDto>> searchCatalog(SearchRequestDto request) {
        SearchRequestDto.SearchFilters filters = request.getFilters();
        SearchRequestDto.PriceRange priceRange = filters != null ? filters.getPriceRange() : null;

        String[] sortPreset = resolveSortPreset(request.getSort());

        ProductSearchRequestDto searchRequest = ProductSearchRequestDto.builder()
                .keyword(request.getQuery())
                .vendorId(filters != null ? filters.getVendorId() : null)
                .category(filters != null ? filters.getCategory() : null)
                .minPrice(priceRange != null ? priceRange.getMin() : null)
                .maxPrice(priceRange != null ? priceRange.getMax() : null)
                .sortBy(sortPreset[0])
                .sortOrder(sortPreset[1])
                .page(request.getPage())
                .size(request.getSize())
                .build();

        return browseCatalog(searchRequest);
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductResponseDto> getPublicProduct(String productId) {
        return productRepository.findById(productId)
                .filter(product -> Boolean.TRUE.equals(product.getIsActive()))
                .map(this::mapToProductResponse)
                .map(ApiResponse::success)
                .orElseGet(() -> ApiResponse.error(ProblemDetails.notFound("Product")));
    }

    private List<Product> applyAdditionalFilters(List<Product> products,
                                                 String category,
                                                 BigDecimal minPrice,
                                                 BigDecimal maxPrice) {
        return products.stream()
                .filter(product -> category == null || category.isBlank()
                        || category.equalsIgnoreCase(product.getCategoryId()))
                .filter(product -> minPrice == null
                        || (product.getPrice() != null && product.getPrice().getAmount().compareTo(minPrice) >= 0))
                .filter(product -> maxPrice == null
                        || (product.getPrice() != null && product.getPrice().getAmount().compareTo(maxPrice) <= 0))
                .collect(Collectors.toList());
    }

    private ProductResponseDto mapToProductResponse(Product product) {
        List<ProductMedia> productMedia = productMediaRepository
                .findByProductIdOrderByDisplayOrderAsc(product.getId());

        List<MediaAssetDto> mediaAssets = productMedia.stream()
                .map(ProductMedia::getMediaAsset)
                .map(CatalogMapper::toMediaAssetDto)
                .toList();

        return CatalogMapper.toProductResponse(product, List.of(), mediaAssets);
    }

    private Sort resolveSort(String sortBy, String sortOrder) {
        String sortField = switch (Optional.ofNullable(sortBy).orElse("createdAt")) {
            case "name" -> "name";
            case "price" -> "price.amount";
            case "sku" -> "sku";
            default -> "createdAt";
        };

        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        return Sort.by(direction, sortField);
    }

    private String[] resolveSortPreset(String sort) {
        if (sort == null || sort.isBlank()) {
            return new String[]{"createdAt", "desc"};
        }

        return switch (sort.toLowerCase(Locale.US)) {
            case "price_asc" -> new String[]{"price", "asc"};
            case "price_desc" -> new String[]{"price", "desc"};
            case "name_asc" -> new String[]{"name", "asc"};
            case "name_desc" -> new String[]{"name", "desc"};
            default -> new String[]{"createdAt", "desc"};
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
}
