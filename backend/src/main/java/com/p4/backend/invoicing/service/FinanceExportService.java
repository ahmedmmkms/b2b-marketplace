package com.p4.backend.invoicing.service;

import com.p4.backend.invoicing.entity.Invoice;
import com.p4.backend.invoicing.repository.InvoiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class FinanceExportService {
    
    private static final Logger log = LoggerFactory.getLogger(FinanceExportService.class);
    
    private final InvoiceRepository invoiceRepository;
    
    public FinanceExportService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    /**
     * Exports invoice data to CSV format for the specified date range
     */
    public byte[] exportInvoicesToCsv(LocalDate startDate, LocalDate endDate) {
        List<Invoice> invoices = invoiceRepository.findByIssueDateBetween(startDate, endDate);
        
        StringWriter stringWriter = new StringWriter();
        try (PrintWriter printWriter = new PrintWriter(stringWriter)) {
            // Header row
            printWriter.println("Invoice Number,Issue Date,Customer ID,Order ID,Subtotal Amount,Tax Amount,Total Amount,Currency,Status");
            
            // Data rows
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            for (Invoice invoice : invoices) {
                printWriter.printf("%s,%s,%s,%s,%.4f,%.4f,%.4f,%s,%s%n",
                    invoice.getInvoiceNumber(),
                    invoice.getIssueDate() != null ? invoice.getIssueDate().format(formatter) : "",
                    invoice.getCustomerId() != null ? invoice.getCustomerId() : "",
                    invoice.getOrderId() != null ? invoice.getOrderId() : "",
                    invoice.getSubtotalAmount() != null ? invoice.getSubtotalAmount().doubleValue() : 0.0,
                    invoice.getTaxAmount() != null ? invoice.getTaxAmount().doubleValue() : 0.0,
                    invoice.getTotalAmount() != null ? invoice.getTotalAmount().doubleValue() : 0.0,
                    invoice.getCurrency() != null ? invoice.getCurrency() : "",
                    invoice.getStatus() != null ? invoice.getStatus().toString() : "");
            }
        }
        
        return stringWriter.toString().getBytes();
    }

    /**
     * Exports invoice data to JSON format for the specified date range
     */
    public byte[] exportInvoicesToJson(LocalDate startDate, LocalDate endDate) {
        List<Invoice> invoices = invoiceRepository.findByIssueDateBetween(startDate, endDate);
        
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("[\n");
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        for (int i = 0; i < invoices.size(); i++) {
            Invoice invoice = invoices.get(i);
            
            jsonBuilder.append("  {\n");
            jsonBuilder.append("    \"invoiceNumber\": \"").append(invoice.getInvoiceNumber() != null ? invoice.getInvoiceNumber() : "").append("\",\n");
            jsonBuilder.append("    \"issueDate\": \"").append(invoice.getIssueDate() != null ? invoice.getIssueDate().format(formatter) : "").append("\",\n");
            jsonBuilder.append("    \"customerId\": \"").append(invoice.getCustomerId() != null ? invoice.getCustomerId() : "").append("\",\n");
            jsonBuilder.append("    \"orderId\": \"").append(invoice.getOrderId() != null ? invoice.getOrderId() : "").append("\",\n");
            jsonBuilder.append("    \"subtotalAmount\": ").append(invoice.getSubtotalAmount() != null ? invoice.getSubtotalAmount().doubleValue() : 0.0).append(",\n");
            jsonBuilder.append("    \"taxAmount\": ").append(invoice.getTaxAmount() != null ? invoice.getTaxAmount().doubleValue() : 0.0).append(",\n");
            jsonBuilder.append("    \"totalAmount\": ").append(invoice.getTotalAmount() != null ? invoice.getTotalAmount().doubleValue() : 0.0).append(",\n");
            jsonBuilder.append("    \"currency\": \"").append(invoice.getCurrency() != null ? invoice.getCurrency() : "").append("\",\n");
            jsonBuilder.append("    \"status\": \"").append(invoice.getStatus() != null ? invoice.getStatus().toString() : "").append("\"\n");
            jsonBuilder.append("  }");
            
            if (i < invoices.size() - 1) {
                jsonBuilder.append(",");
            }
            jsonBuilder.append("\n");
        }
        jsonBuilder.append("]\n");
        
        return jsonBuilder.toString().getBytes();
    }
}