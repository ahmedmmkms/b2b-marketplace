package com.p4.backend.rfq.service;

import com.p4.backend.catalog.entity.Product;
import com.p4.backend.catalog.repository.CatalogRepository;
import com.p4.backend.identity.entity.Account;
import com.p4.backend.identity.repository.AccountRepository;
import com.p4.backend.ops.service.AuditService;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.entity.RfqLine;
import com.p4.backend.rfq.repository.RfqLineRepository;
import com.p4.backend.rfq.repository.RfqRepository;
import com.p4.backend.shared.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RfqService {

    @Autowired
    private RfqRepository rfqRepository;

    @Autowired
    private RfqLineRepository rfqLineRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CatalogRepository catalogRepository; // Used to validate products if needed

    @Autowired
    private AuditService auditService;

    @Transactional
    public Rfq createRfq(Rfq rfq, List<RfqLine> rfqLines, String userId) throws BusinessException {
        // Validate the account exists
        Optional<Account> accountOpt = accountRepository.findById(rfq.getAccountId());
        if (accountOpt.isEmpty()) {
            throw new BusinessException("Account not found: " + rfq.getAccountId());
        }

        // Validate validity date is in the future
        if (rfq.getValidUntil().isBefore(LocalDateTime.now())) {
            throw new BusinessException("RFQ validity date must be in the future");
        }

        // Set status to PUBLISHED for new RFQs
        rfq.setStatus(Rfq.RfqStatus.PUBLISHED);

        // Save the RFQ first to get the ID
        Rfq savedRfq = rfqRepository.save(rfq);

        // Set the RFQ ID for each line and save them
        for (RfqLine line : rfqLines) {
            line.setRfqId(savedRfq.getId());
            rfqLineRepository.save(line);
        }

        // Log the creation action
        auditService.logAction(userId, "RFQ", savedRfq.getId(), "CREATE");

        return savedRfq;
    }

    public Optional<Rfq> getRfqById(String id) {
        return rfqRepository.findById(id);
    }

    public List<Rfq> getRfqsByAccount(String accountId) {
        return rfqRepository.findByAccountId(accountId);
    }

    public List<Rfq> getRfqsByStatus(Rfq.RfqStatus status) {
        return rfqRepository.findByStatus(status);
    }

    public List<Rfq> getRfqsByAccountIdAndStatus(String accountId, Rfq.RfqStatus status) {
        return rfqRepository.findByAccountIdAndStatus(accountId, status);
    }

    public void updateRfqStatus(String rfqId, Rfq.RfqStatus newStatus, String userId) throws BusinessException {
        Optional<Rfq> rfqOpt = rfqRepository.findById(rfqId);
        if (rfqOpt.isEmpty()) {
            throw new BusinessException("RFQ not found: " + rfqId);
        }

        Rfq rfq = rfqOpt.get();
        Rfq.RfqStatus oldStatus = rfq.getStatus();
        rfq.setStatus(newStatus);
        rfqRepository.save(rfq);
        
        // Log the status update action
        auditService.logAction(userId, "RFQ", rfqId, "UPDATE_STATUS");
    }

    public void closeExpiredRfqs() {
        List<Rfq> expiredRfqs = rfqRepository.findByValidUntilBefore(LocalDateTime.now());
        for (Rfq rfq : expiredRfqs) {
            if (rfq.getStatus() != Rfq.RfqStatus.CLOSED && rfq.getStatus() != Rfq.RfqStatus.CANCELLED) {
                rfq.setStatus(Rfq.RfqStatus.CLOSED);
                rfqRepository.save(rfq);
            }
        }
    }
}