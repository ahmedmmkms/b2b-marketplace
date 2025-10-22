package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductAttributeDto;
import com.p4.backend.catalog.mapper.CatalogMapper;
import com.p4.backend.catalog.model.ProductAttribute;
import com.p4.backend.catalog.repository.ProductAttributeRepository;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductAttributeService {

    private final ProductAttributeRepository attributeRepository;

    @Transactional
    public ApiResponse<ProductAttributeDto> createAttribute(ProductAttributeDto dto) {
        if (attributeRepository.existsByName(dto.getName())) {
            return ApiResponse.error(ProblemDetails.validationError("Attribute with the same name already exists"));
        }

        ProductAttribute attribute = new ProductAttribute();
        applyAttributeUpdates(attribute, dto);

        ProductAttribute saved = attributeRepository.save(attribute);
        return ApiResponse.success(CatalogMapper.toProductAttributeDto(saved));
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductAttributeDto> getAttribute(String attributeId) {
        return attributeRepository.findById(attributeId)
                .map(CatalogMapper::toProductAttributeDto)
                .map(ApiResponse::success)
                .orElseGet(() -> ApiResponse.error(ProblemDetails.notFound("Product Attribute")));
    }

    @Transactional
    public ApiResponse<ProductAttributeDto> updateAttribute(String attributeId, ProductAttributeDto dto) {
        Optional<ProductAttribute> attributeOpt = attributeRepository.findById(attributeId);
        if (attributeOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product Attribute"));
        }

        ProductAttribute attribute = attributeOpt.get();
        applyAttributeUpdates(attribute, dto);
        ProductAttribute updated = attributeRepository.save(attribute);

        return ApiResponse.success(CatalogMapper.toProductAttributeDto(updated));
    }

    @Transactional(readOnly = true)
    public ApiResponse<Page<ProductAttributeDto>> listAttributes(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1), Sort.by("sortOrder").ascending());
        Page<ProductAttribute> attributePage = attributeRepository.findAll(pageable);
        Page<ProductAttributeDto> dtoPage = attributePage.map(CatalogMapper::toProductAttributeDto);
        return ApiResponse.success(dtoPage, paginationMetadata(attributePage));
    }

    @Transactional
    public ApiResponse<Void> deleteAttribute(String attributeId) {
        if (!attributeRepository.existsById(attributeId)) {
            return ApiResponse.error(ProblemDetails.notFound("Product Attribute"));
        }

        attributeRepository.deleteById(attributeId);
        return ApiResponse.success(null);
    }

    private void applyAttributeUpdates(ProductAttribute attribute, ProductAttributeDto dto) {
        attribute.setName(dto.getName());
        attribute.setDisplayName(dto.getDisplayName());
        attribute.setDescription(dto.getDescription());
        attribute.setAttributeType(dto.getAttributeType() != null
                ? ProductAttribute.AttributeType.valueOf(dto.getAttributeType())
                : ProductAttribute.AttributeType.TEXT);
        attribute.setIsRequired(dto.getIsRequired() != null ? dto.getIsRequired() : Boolean.FALSE);
        attribute.setIsFilterable(dto.getIsFilterable() != null ? dto.getIsFilterable() : Boolean.FALSE);
        attribute.setIsSearchable(dto.getIsSearchable() != null ? dto.getIsSearchable() : Boolean.FALSE);
        attribute.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0);
        attribute.setValidationRules(dto.getValidationRules());
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
