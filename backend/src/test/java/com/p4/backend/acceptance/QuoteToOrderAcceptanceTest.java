package com.p4.backend.acceptance;

import com.fasterxml.jackson.databind.JsonNode;
import com.p4.backend.catalog.entity.Vendor;
import com.p4.backend.identity.entity.Account;
import com.p4.backend.identity.entity.User;
import com.p4.backend.orders.entity.Order;
import com.p4.backend.orders.repository.OrderRepository;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.RfqLine;
import com.p4.backend.rfq.repository.QuoteRepository;
import com.p4.backend.rfq.repository.RfqLineRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class QuoteToOrderAcceptanceTest extends AcceptanceTestBase {

    @Autowired
    private RfqLineRepository rfqLineRepository;

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void buyerCanConvertAcceptedQuoteIntoOrder() throws Exception {
        Account buyerAccount = createBuyerAccount("Acme Industrial Buyers");
        User buyerUser = createAccountUser(buyerAccount, "acme-buyer");
        Vendor vendor = createActiveVendor("Desert Engineering Group");

        Map<String, Object> rfqBody = new LinkedHashMap<>();
        rfqBody.put("accountId", buyerAccount.getId());
        rfqBody.put("contactPerson", "Jane Buyer");
        rfqBody.put("contactEmail", "jane.buyer@example.com");
        rfqBody.put("contactPhone", "+966-555-0100");
        rfqBody.put("description", "Need 5 high-pressure valves for refinery upgrade");
        rfqBody.put("validUntil", isoTimestamp(java.time.LocalDateTime.now().plusDays(7)));
        rfqBody.put("createdById", buyerUser.getId());
        rfqBody.put("currency", "USD");
        rfqBody.put("paymentTerms", "NET_30");
        rfqBody.put("shippingTerms", "FOB Riyadh");
        rfqBody.put("taxIncluded", false);

        Map<String, Object> rfqLinePayload = new LinkedHashMap<>();
        rfqLinePayload.put("productName", "High Pressure Valve");
        rfqLinePayload.put("productDescription", "ANSI Class 600 gate valve with corrosion protection");
        rfqLinePayload.put("quantity", 5);
        rfqLinePayload.put("unitOfMeasure", "EA");
        rfqLinePayload.put("requiredByDate", isoTimestamp(java.time.LocalDateTime.now().plusDays(14)));
        rfqLinePayload.put("brandPreference", "Any top-tier manufacturer");
        rfqLinePayload.put("notes", "Must include calibration certificate");

        Map<String, Object> rfqPayloadMap = new LinkedHashMap<>();
        rfqPayloadMap.put("rfq", rfqBody);
        rfqPayloadMap.put("rfqLines", List.of(rfqLinePayload));

        String rfqPayload = objectMapper.writeValueAsString(rfqPayloadMap);

        HttpHeaders headers = jsonHeaders();
        HttpEntity<String> rfqRequest = new HttpEntity<>(rfqPayload, headers);
        ResponseEntity<String> rfqResponse = restTemplate.postForEntity("/api/rfq", rfqRequest, String.class);
        assertEquals(HttpStatus.OK, rfqResponse.getStatusCode());

        JsonNode rfqJson = objectMapper.readTree(rfqResponse.getBody());
        String rfqId = rfqJson.get("id").asText();

        List<RfqLine> rfqLines = rfqLineRepository.findByRfqId(rfqId);
        assertEquals(1, rfqLines.size(), "RFQ creation should persist the provided line items");

        RfqLine rfqLine = rfqLines.get(0);
        int quantity = rfqLine.getQuantity();
        BigDecimal unitPrice = new BigDecimal("1350.00");
        BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(quantity));

        Map<String, Object> quoteBody = new LinkedHashMap<>();
        quoteBody.put("rfqId", rfqId);
        quoteBody.put("vendorId", vendor.getId());
        quoteBody.put("quotedBy", "vendor-user-42");
        quoteBody.put("quoteNumber", "Q-" + System.currentTimeMillis());
        quoteBody.put("validUntil", isoTimestamp(java.time.LocalDateTime.now().plusDays(5)));
        quoteBody.put("currency", "USD");
        quoteBody.put("paymentTerms", "NET_30");
        quoteBody.put("deliveryTerms", "FCA Dubai Jebel Ali");
        quoteBody.put("freightIncluded", false);
        quoteBody.put("taxIncluded", false);
        quoteBody.put("notes", "Includes 12-month warranty");

        Map<String, Object> quoteLinePayload = new LinkedHashMap<>();
        quoteLinePayload.put("rfqLineId", rfqLine.getId());
        quoteLinePayload.put("unitPrice", unitPrice);
        quoteLinePayload.put("quantity", quantity);
        quoteLinePayload.put("lineTotal", lineTotal);
        quoteLinePayload.put("unitOfMeasure", "EA");
        quoteLinePayload.put("moq", 1);
        quoteLinePayload.put("leadTimeDays", 21);
        quoteLinePayload.put("productSpecifications", "API 6D compliant");

        Map<String, Object> quotePayloadMap = new LinkedHashMap<>();
        quotePayloadMap.put("quote", quoteBody);
        quotePayloadMap.put("quoteLines", List.of(quoteLinePayload));

        String quotePayload = objectMapper.writeValueAsString(quotePayloadMap);

        HttpEntity<String> quoteRequest = new HttpEntity<>(quotePayload, headers);
        ResponseEntity<String> quoteResponse = restTemplate.postForEntity("/api/quotes", quoteRequest, String.class);
        assertEquals(HttpStatus.OK, quoteResponse.getStatusCode());

        JsonNode quoteJson = objectMapper.readTree(quoteResponse.getBody());
        String quoteId = quoteJson.get("id").asText();

        Quote persistedQuote = quoteRepository.findById(quoteId).orElseThrow();
        assertEquals(Quote.QuoteStatus.SUBMITTED, persistedQuote.getStatus(), "Newly created quote should be SUBMITTED");
        assertEquals(lineTotal, persistedQuote.getTotalAmount());

        String acceptPayload = objectMapper.writeValueAsString(Map.of("userId", buyerUser.getId()));
        HttpEntity<String> acceptRequest = new HttpEntity<>(acceptPayload, headers);
        ResponseEntity<Void> acceptResponse = restTemplate.postForEntity(
            "/api/quotes/comparison/{quoteId}/accept",
            acceptRequest,
            Void.class,
            quoteId
        );
        assertEquals(HttpStatus.OK, acceptResponse.getStatusCode());

        Quote acceptedQuote = quoteRepository.findById(quoteId).orElseThrow();
        assertEquals(Quote.QuoteStatus.ACCEPTED, acceptedQuote.getStatus());
        assertThat(acceptedQuote.getAcceptedAt()).isNotNull();
        assertEquals(buyerUser.getId(), acceptedQuote.getAcceptedById());

        HttpHeaders orderHeaders = new HttpHeaders();
        orderHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<Void> orderRequest = new HttpEntity<>(null, orderHeaders);
        ResponseEntity<String> orderResponse = restTemplate.postForEntity(
            "/api/orders/from-quote/{quoteId}",
            orderRequest,
            String.class,
            quoteId
        );

        assertEquals(HttpStatus.OK, orderResponse.getStatusCode());
        JsonNode orderJson = objectMapper.readTree(orderResponse.getBody());
        assertEquals(buyerAccount.getId(), orderJson.get("buyerAccountId").asText());
        assertEquals(vendor.getId(), orderJson.get("vendorAccountId").asText());
        assertEquals("PENDING", orderJson.get("status").asText());
        assertThat(orderJson.get("poNumber").asText()).startsWith("PO-");

        JsonNode orderLines = orderJson.get("orderLines");
        assertTrue(orderLines.isArray());
        assertEquals(1, orderLines.size());
        JsonNode line = orderLines.get(0);
        assertEquals(rfqLine.getProductName(), line.get("productName").asText());
        assertEquals(quantity, line.get("quantity").asInt());
        assertEquals(unitPrice.doubleValue(), line.get("unitPrice").get("amount").asDouble(), 0.01);

        Optional<Order> orderOpt = orderRepository.findByQuoteId(quoteId);
        assertTrue(orderOpt.isPresent(), "Order should be persisted against the accepted quote");
        Order savedOrder = orderOpt.get();
        assertEquals(buyerAccount.getId(), savedOrder.getBuyerAccountId());

        String poNumber = orderJson.get("poNumber").asText();
        ResponseEntity<String> poLookupResponse = restTemplate.getForEntity(
            "/api/orders/po/{poNumber}",
            String.class,
            poNumber
        );
        assertEquals(HttpStatus.OK, poLookupResponse.getStatusCode());

        ResponseEntity<String> buyerOrdersResponse = restTemplate.getForEntity(
            "/api/orders/buyer/{buyerAccountId}",
            String.class,
            buyerAccount.getId()
        );
        assertEquals(HttpStatus.OK, buyerOrdersResponse.getStatusCode());
        JsonNode buyerOrders = objectMapper.readTree(buyerOrdersResponse.getBody());
        assertTrue(buyerOrders.isArray());
        assertEquals(1, buyerOrders.size());
    }
}
