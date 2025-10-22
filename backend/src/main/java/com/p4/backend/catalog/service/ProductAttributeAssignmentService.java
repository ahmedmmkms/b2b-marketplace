package com.p4.backend.catalog.service;

import com.p4.backend.catalog.dto.ProductAttributeAssignmentDto;
import com.p4.backend.catalog.dto.ProductAttributeAssignmentRequestDto;
import com.p4.backend.catalog.model.Product;
import com.p4.backend.catalog.model.ProductAttribute;
import com.p4.backend.catalog.model.ProductAttributeAssignment;
import com.p4.backend.catalog.model.ProductAttributeValue;
import com.p4.backend.catalog.repository.ProductAttributeAssignmentRepository;
import com.p4.backend.catalog.repository.ProductAttributeRepository;
import com.p4.backend.catalog.repository.ProductAttributeValueRepository;
import com.p4.backend.catalog.repository.ProductRepository;
import com.p4.backend.shared.response.ApiResponse;
import com.p4.backend.shared.response.ProblemDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductAttributeAssignmentService {

    private final ProductRepository productRepository;
    private final ProductAttributeRepository attributeRepository;
    private final ProductAttributeValueRepository valueRepository;
    private final ProductAttributeAssignmentRepository assignmentRepository;

    @Transactional(readOnly = true)
    public ApiResponse<List<ProductAttributeAssignmentDto>> getProductAttributes(String productId) {
        if (!productRepository.existsById(productId)) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        List<ProductAttributeAssignmentDto> attributes = assignmentRepository.findByProductId(productId)
                .stream()
                .map(this::toAssignmentDto)
                .toList();
        return ApiResponse.success(attributes);
    }

    @Transactional
    public ApiResponse<ProductAttributeAssignmentDto> addAttributeToProduct(String productId,
                                                                            ProductAttributeAssignmentRequestDto request) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product"));
        }

        Optional<ProductAttribute> attributeOpt = attributeRepository.findById(request.getAttributeId());
        if (attributeOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product Attribute"));
        }

        ProductAttribute attribute = attributeOpt.get();
        ProductAttributeAssignment assignment = assignmentRepository
                .findByProductIdAndAttributeId(productId, attribute.getId())
                .orElseGet(() -> ProductAttributeAssignment.builder()
                        .product(productOpt.get())
                        .attribute(attribute)
                        .build());

        if (request.getValueId() != null && !request.getValueId().isBlank()) {
            Optional<ProductAttributeValue> valueOpt = valueRepository.findById(request.getValueId());
            if (valueOpt.isEmpty()) {
                return ApiResponse.error(ProblemDetails.notFound("Product Attribute Value"));
            }
            ProductAttributeValue value = valueOpt.get();
            if (!value.getProductAttribute().getId().equals(attribute.getId())) {
                return ApiResponse.error(ProblemDetails.validationError("Attribute value does not belong to the specified attribute"));
            }
            assignment.setAttributeValue(value);
            assignment.setCustomValue(null);
            assignment.setDisplayValue(value.getDisplayValue());
            assignment.setIsDefault(Boolean.TRUE.equals(request.getIsDefault()));
        } else {
            assignment.setAttributeValue(null);
            assignment.setCustomValue(request.getCustomValue());
            assignment.setDisplayValue(request.getDisplayValue());
            assignment.setIsDefault(Boolean.TRUE.equals(request.getIsDefault()));
        }

        ProductAttributeAssignment saved = assignmentRepository.save(assignment);
        return ApiResponse.success(toAssignmentDto(saved));
    }

    @Transactional
    public ApiResponse<ProductAttributeAssignmentDto> updateAttributeForProduct(String productId,
                                                                                String attributeId,
                                                                                ProductAttributeAssignmentRequestDto request) {
        Optional<ProductAttributeAssignment> assignmentOpt = assignmentRepository
                .findByProductIdAndAttributeId(productId, attributeId);

        if (assignmentOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product Attribute assignment"));
        }

        request.setAttributeId(attributeId);
        return addAttributeToProduct(productId, request);
    }

    @Transactional
    public ApiResponse<Void> removeAttributeFromProduct(String productId, String attributeId) {
        Optional<ProductAttributeAssignment> assignmentOpt = assignmentRepository
                .findByProductIdAndAttributeId(productId, attributeId);

        if (assignmentOpt.isEmpty()) {
            return ApiResponse.error(ProblemDetails.notFound("Product Attribute assignment"));
        }

        assignmentRepository.delete(assignmentOpt.get());
        return ApiResponse.success(null);
    }

    private ProductAttributeAssignmentDto toAssignmentDto(ProductAttributeAssignment assignment) {
        ProductAttribute attribute = assignment.getAttribute();
        ProductAttributeValue value = assignment.getAttributeValue();

        return ProductAttributeAssignmentDto.builder()
                .attributeId(attribute.getId())
                .attributeName(attribute.getDisplayName())
                .attributeType(attribute.getAttributeType() != null ? attribute.getAttributeType().name() : null)
                .isRequired(attribute.getIsRequired())
                .isFilterable(attribute.getIsFilterable())
                .isSearchable(attribute.getIsSearchable())
                .valueId(value != null ? value.getId() : null)
                .value(value != null ? value.getValue() : assignment.getCustomValue())
                .displayValue(value != null ? value.getDisplayValue() : assignment.getDisplayValue())
                .isDefault(Boolean.TRUE.equals(assignment.getIsDefault()))
                .build();
    }
}
