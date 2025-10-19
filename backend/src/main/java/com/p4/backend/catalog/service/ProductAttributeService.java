package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductAttributeDto;
import com.p4.backend.catalog.model.ProductAttribute;
import com.p4.backend.catalog.repository.ProductAttributeRepository;
import com.p4.backend.shared.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductAttributeService {

    private final ProductAttributeRepository attributeRepository;

    @Transactional
    public ApiResponse<ProductAttributeDto> createProductAttribute(ProductAttributeDto attributeDto) {
        try {
            // Check if attribute with same name already exists
            if (attributeRepository.existsByName(attributeDto.getName())) {
                return ApiResponse.<ProductAttributeDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            ProductAttribute attribute = new ProductAttribute();
            attribute.setName(attributeDto.getName());
            attribute.setDisplayName(attributeDto.getDisplayName());
            attribute.setDescription(attributeDto.getDescription());
            attribute.setAttributeType(ProductAttribute.AttributeType.valueOf(attributeDto.getAttributeType()));
            attribute.setIsRequired(attributeDto.getIsRequired());
            attribute.setIsFilterable(attributeDto.getIsFilterable());
            attribute.setSortOrder(attributeDto.getSortOrder());
            
            ProductAttribute savedAttribute = attributeRepository.save(attribute);
            
            ProductAttributeDto responseDto = mapToProductAttributeDto(savedAttribute);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductAttributeDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<ProductAttributeDto> getProductAttributeById(String attributeId) {
        try {
            Optional<ProductAttribute> attributeOpt = attributeRepository.findById(attributeId);
            
            if (attributeOpt.isEmpty()) {
                return ApiResponse.<ProductAttributeDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            ProductAttribute attribute = attributeOpt.get();
            ProductAttributeDto responseDto = mapToProductAttributeDto(attribute);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductAttributeDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<ProductAttributeDto> updateProductAttribute(String attributeId, ProductAttributeDto attributeDto) {
        try {
            Optional<ProductAttribute> attributeOpt = attributeRepository.findById(attributeId);
            
            if (attributeOpt.isEmpty()) {
                return ApiResponse.<ProductAttributeDto>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            ProductAttribute existingAttribute = attributeOpt.get();
            
            // Update fields
            existingAttribute.setName(attributeDto.getName());
            existingAttribute.setDisplayName(attributeDto.getDisplayName());
            existingAttribute.setDescription(attributeDto.getDescription());
            existingAttribute.setAttributeType(ProductAttribute.AttributeType.valueOf(attributeDto.getAttributeType()));
            existingAttribute.setIsRequired(attributeDto.getIsRequired());
            existingAttribute.setIsFilterable(attributeDto.getIsFilterable());
            existingAttribute.setSortOrder(attributeDto.getSortOrder());
            
            ProductAttribute updatedAttribute = attributeRepository.save(existingAttribute);
            
            ProductAttributeDto responseDto = mapToProductAttributeDto(updatedAttribute);
            return ApiResponse.success(responseDto);
        } catch (Exception e) {
            return ApiResponse.<ProductAttributeDto>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional(readOnly = true)
    public ApiResponse<List<ProductAttributeDto>> getAllProductAttributes(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            
            Page<ProductAttribute> attributePage = attributeRepository.findAll(pageable);
            
            List<ProductAttributeDto> responseDtos = attributePage.getContent().stream()
                    .map(this::mapToProductAttributeDto)
                    .toList();
            
            return ApiResponse.success(responseDtos);
        } catch (Exception e) {
            return ApiResponse.<List<ProductAttributeDto>>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    @Transactional
    public ApiResponse<Void> deleteProductAttribute(String attributeId) {
        try {
            if (!attributeRepository.existsById(attributeId)) {
                return ApiResponse.<Void>builder()
                        .success(false)
                        .data(null)
                        .timestamp(java.time.Instant.now())
                        .build();
            }
            
            attributeRepository.deleteById(attributeId);
            return ApiResponse.success(null);
        } catch (Exception e) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .data(null)
                    .timestamp(java.time.Instant.now())
                    .build();
        }
    }

    private ProductAttributeDto mapToProductAttributeDto(ProductAttribute attribute) {
        return ProductAttributeDto.builder()
                .id(attribute.getId())
                .name(attribute.getName())
                .displayName(attribute.getDisplayName())
                .description(attribute.getDescription())
                .attributeType(attribute.getAttributeType().name())
                .isRequired(attribute.getIsRequired())
                .isFilterable(attribute.getIsFilterable())
                .sortOrder(attribute.getSortOrder())
                .build();
    }
}