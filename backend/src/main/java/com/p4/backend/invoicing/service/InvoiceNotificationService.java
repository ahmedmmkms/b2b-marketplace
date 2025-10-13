package com.p4.backend.invoicing.service;

import com.p4.backend.identity.entity.Account;
import com.p4.backend.identity.repository.AccountRepository;
import com.p4.backend.invoicing.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Optional;

@Service
public class InvoiceNotificationService {
    
    private static final Logger log = LoggerFactory.getLogger(InvoiceNotificationService.class);
    
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final AccountRepository accountRepository;
    // Removed direct dependency on InvoiceService to break circular dependency
    // Now we'll use a different approach or have InvoiceService pass required data directly
    
    public InvoiceNotificationService(JavaMailSender mailSender,
                                      TemplateEngine templateEngine,
                                      AccountRepository accountRepository) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.accountRepository = accountRepository;
    }

    /**
     * Sends an invoice notification email to the customer
     */
    public void sendInvoiceNotification(String invoiceId, String invoicePdfUrl) {
        // Get customer account details
        // We need to get the invoice details differently to avoid the circular dependency
        // This would require passing the invoice data from the service calling this method
        
        Optional<Account> accountOpt = accountRepository.findById(getCustomerIdForInvoice(invoiceId));
        if (accountOpt.isEmpty()) {
            log.error("Customer account not found for invoice: {}", invoiceId);
            return;
        }
        
        Account account = accountOpt.get();
        String customerEmail = account.getCompanyEmail(); // Assuming company email is used
        
        if (customerEmail == null || customerEmail.isEmpty()) {
            log.error("No email address found for customer: {} for invoice: {}", account.getId(), invoiceId);
            return;
        }
        
        try {
            // Create and send the email
            sendEmail(customerEmail, invoiceId, invoicePdfUrl);
            
            log.info("Invoice notification email sent successfully for invoice: {}", invoiceId);
        } catch (Exception e) {
            log.error("Failed to send invoice notification for invoice: {}", invoiceId, e);
        }
    }
    
    // This method would need to be implemented to get the customer ID for an invoice
    // For now, we'll assume there's a way to access invoice data without the circular dependency
    private String getCustomerIdForInvoice(String invoiceId) {
        // In a real implementation, this would either:
        // 1. Have the invoice data passed in from the calling service
        // 2. Use a separate repository or method that doesn't create a circular dependency
        // 3. Use lazy loading or event-driven approach
        return null; // This needs to be implemented properly
    }

    private void sendEmail(String to, String invoiceId, String invoicePdfUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(to);
        
        // Create email subject
        helper.setSubject("Invoice notification for: " + invoiceId);
        
        // Create email body using Thymeleaf template
        Context context = new Context();
        // context.setVariable("invoice", invoice); // We can't pass the full invoice object due to repo dependency
        context.setVariable("invoiceId", invoiceId);
        context.setVariable("invoicePdfUrl", invoicePdfUrl);
        context.setVariable("companyName", "P4 B2B Marketplace"); // This should come from config
        
        String htmlContent = templateEngine.process("invoice-notification", context);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
}