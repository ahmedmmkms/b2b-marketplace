package com.p4.backend.rfq.controller;

import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.entity.RfqLine;
import com.p4.backend.rfq.service.RfqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rfq")
public class RfqController {

    @Autowired
    private RfqService rfqService;

    @PostMapping
    public ResponseEntity<Rfq> createRfq(@RequestBody CreateRfqRequest request) {
        Rfq rfq = request.getRfq();
        List<RfqLine> rfqLines = request.getRfqLines();
        
        // In a real implementation, you would extract the userId from the authenticated user context
        // For now, using a placeholder userId
        String userId = "PLACEHOLDER_USER_ID"; // This should be replaced with actual user authentication
        Rfq createdRfq = rfqService.createRfq(rfq, rfqLines, userId);
        return ResponseEntity.ok(createdRfq);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rfq> getRfqById(@PathVariable String id) {
        return rfqService.getRfqById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Rfq>> getRfqsByAccount(@PathVariable String accountId) {
        List<Rfq> rfqs = rfqService.getRfqsByAccount(accountId);
        return ResponseEntity.ok(rfqs);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateRfqStatus(@PathVariable String id, @RequestBody UpdateRfqStatusRequest request) {
        // In a real implementation, you would extract the userId from the authenticated user context
        // For now, using a placeholder userId
        String userId = "PLACEHOLDER_USER_ID"; // This should be replaced with actual user authentication
        rfqService.updateRfqStatus(id, request.getStatus(), userId);
        return ResponseEntity.ok().build();
    }

    // Inner request classes
    public static class CreateRfqRequest {
        private Rfq rfq;
        private List<RfqLine> rfqLines;

        public Rfq getRfq() {
            return rfq;
        }

        public void setRfq(Rfq rfq) {
            this.rfq = rfq;
        }

        public List<RfqLine> getRfqLines() {
            return rfqLines;
        }

        public void setRfqLines(List<RfqLine> rfqLines) {
            this.rfqLines = rfqLines;
        }
    }

    public static class UpdateRfqStatusRequest {
        private Rfq.RfqStatus status;

        public Rfq.RfqStatus getStatus() {
            return status;
        }

        public void setStatus(Rfq.RfqStatus status) {
            this.status = status;
        }
    }
}