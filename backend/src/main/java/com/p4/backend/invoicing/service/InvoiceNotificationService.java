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
    private final InvoiceService invoiceService; // To get signed URL for the invoice PDF
    
    public InvoiceNotificationService(JavaMailSender mailSender,
                                      TemplateEngine templateEngine,
                                      AccountRepository accountRepository,
                                      InvoiceService invoiceService) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.accountRepository = accountRepository;
        this.invoiceService = invoiceService;
    }

    /**
     * Sends an invoice notification email to the customer
     */
    public void sendInvoiceNotification(String invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceService.getInvoiceByIdInternal(invoiceId);
        if (invoiceOpt.isEmpty()) {
            log.error("Invoice not found: {}", invoiceId);
            return;
        }
        
        Invoice invoice = invoiceOpt.get();
        
        // Get customer account details
        Optional<Account> accountOpt = accountRepository.findById(invoice.getCustomerId());
        if (accountOpt.isEmpty()) {
            log.error("Customer account not found: {}", invoice.getCustomerId());
            return;
        }
        
        Account account = accountOpt.get();
        String customerEmail = account.getCompanyEmail(); // Assuming company email is used
        
        if (customerEmail == null || customerEmail.isEmpty()) {
            log.error("No email address found for customer: {}", invoice.getCustomerId());
            return;
        }
        
        try {
            // Generate the invoice PDF URL
            String invoicePdfUrl = invoiceService.getInvoicePdfSignedUrl(invoiceId);
            
            // Create and send the email
            sendEmail(customerEmail, invoice, invoicePdfUrl);
            
            log.info("Invoice notification email sent successfully for invoice: {}", invoiceId);
        } catch (Exception e) {
            log.error("Failed to send invoice notification for invoice: {}", invoiceId, e);
        }
    }

    private void sendEmail(String to, Invoice invoice, String invoicePdfUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        helper.setTo(to);
        
        // Create email subject
        helper.setSubject("Invoice " + invoice.getInvoiceNumber() + " from Your Vendor");
        
        // Create email body using Thymeleaf template
        Context context = new Context();
        context.setVariable("invoice", invoice);
        context.setVariable("invoicePdfUrl", invoicePdfUrl);
        context.setVariable("companyName", "P4 B2B Marketplace"); // This should come from config
        
        String htmlContent = templateEngine.process("invoice-notification", context);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
}