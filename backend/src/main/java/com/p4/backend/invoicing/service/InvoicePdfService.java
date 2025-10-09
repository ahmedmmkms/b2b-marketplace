package com.p4.backend.invoicing.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.openhtmltopdf.util.XRLog;
import com.p4.backend.invoicing.entity.Invoice;
import com.p4.backend.invoicing.entity.InvoiceLine;
import com.p4.backend.invoicing.repository.InvoiceLineRepository;
import com.p4.backend.invoicing.repository.InvoiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import jakarta.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InvoicePdfService {
    
    private static final Logger log = LoggerFactory.getLogger(InvoicePdfService.class);
    
    private final InvoiceRepository invoiceRepository;
    private final InvoiceLineRepository invoiceLineRepository;
    
    @Value("${b2.account.id}")
    private String b2AccountId;
    
    @Value("${b2.application.key.id}")
    private String b2ApplicationKeyId;
    
    @Value("${b2.application.key}")
    private String b2ApplicationKey;
    
    @Value("${b2.bucket}")
    private String b2Bucket;
    
    @Value("${b2.endpoint.url}")
    private String b2EndpointUrl;
    
    private S3Client s3Client;
    private S3Presigner s3Presigner;

    public InvoicePdfService(InvoiceRepository invoiceRepository, InvoiceLineRepository invoiceLineRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceLineRepository = invoiceLineRepository;
    }

    @PostConstruct
    private void initializeS3Clients() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(b2ApplicationKeyId, b2ApplicationKey);
        
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Using US_EAST_1 as default
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .endpointOverride(java.net.URI.create(b2EndpointUrl))
                .build();
        
        this.s3Presigner = S3Presigner.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .endpointOverride(java.net.URI.create(b2EndpointUrl))
                .build();
        
        // Enable logging for troubleshooting
        XRLog.setLoggingEnabled(true);
    }

    /**
     * Generates a PDF for the given invoice and uploads it to B2
     */
    public String generateAndUploadInvoicePdf(String invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
        if (invoiceOpt.isEmpty()) {
            throw new RuntimeException("Invoice not found: " + invoiceId);
        }
        
        Invoice invoice = invoiceOpt.get();
        
        try {
            // Generate the PDF content
            byte[] pdfContent = generateInvoicePdf(invoice);
            
            // Upload to B2
            String objectKey = generateObjectKey(invoice);
            uploadToB2(objectKey, pdfContent);
            
            log.info("Successfully generated and uploaded PDF for invoice: {}", invoiceId);
            return objectKey; // Return the B2 object key which can be used to access the file
        } catch (Exception e) {
            log.error("Error generating or uploading PDF for invoice: {}", invoiceId, e);
            throw new RuntimeException("Error generating PDF for invoice: " + invoiceId, e);
        }
    }

    /**
     * Generates a signed URL for accessing the invoice PDF
     */
    public String generateSignedUrl(String objectKey, Duration duration) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(b2Bucket)
                .key(objectKey)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(duration)
                .getObjectRequest(getObjectRequest)
                .build();

        return s3Presigner.presignGetObject(presignRequest).url().toString();
    }

    private byte[] generateInvoicePdf(Invoice invoice) throws Exception {
        // Generate HTML for the invoice
        String htmlContent = generateInvoiceHtml(invoice);
        
        // Convert HTML to PDF using OpenPDF library
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withHtmlContent(htmlContent, null); // null for base URL since we're not referencing external resources

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            builder.toStream(outputStream);
            builder.run();
            return outputStream.toByteArray();
        }
    }

    private String generateInvoiceHtml(Invoice invoice) {
        StringBuilder html = new StringBuilder();
        
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head>");
        html.append("<meta charset=\"UTF-8\">");
        html.append("<title>Invoice ").append(invoice.getInvoiceNumber()).append("</title>");
        html.append("<style>");
        html.append("body { font-family: Arial, sans-serif; margin: 20px; }");
        html.append("table { width: 100%; border-collapse: collapse; margin: 20px 0; }");
        html.append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }");
        html.append("th { background-color: #f2f2f2; }");
        html.append(".header { text-align: center; margin-bottom: 30px; }");
        html.append(".invoice-info { margin-bottom: 20px; }");
        html.append(".totals { margin-top: 20px; text-align: right; }");
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");
        
        html.append("<div class=\"header\">");
        html.append("<h1>INVOICE</h1>");
        html.append("</div>");
        
        html.append("<div class=\"invoice-info\">");
        html.append("<p><strong>Invoice Number:</strong> ").append(invoice.getInvoiceNumber()).append("</p>");
        html.append("<p><strong>Issue Date:</strong> ").append(invoice.getIssueDate()).append("</p>");
        html.append("<p><strong>Due Date:</strong> ").append(invoice.getDueDate()).append("</p>");
        html.append("<p><strong>Order ID:</strong> ").append(invoice.getOrderId()).append("</p>");
        html.append("<p><strong>PO Number:</strong> ").append(invoice.getPoNumber() != null ? invoice.getPoNumber() : "N/A").append("</p>");
        html.append("</div>");
        
        html.append("<table>");
        html.append("<thead>");
        html.append("<tr><th>Product</th><th>Description</th><th>Quantity</th><th>Unit Price</th><th>Line Total</th><th>Tax Rate</th><th>Tax Amount</th></tr>");
        html.append("</thead>");
        html.append("<tbody>");
        
        // Fetch invoice lines to include in the PDF
        List<InvoiceLine> lines = invoice.getInvoiceLines();
        if (lines == null) {
            // If lines aren't loaded, fetch them from the repository
            lines = invoiceLineRepository.findByInvoiceId(invoice.getId());
        }
        
        if (lines != null) {
            for (InvoiceLine line : lines) {
                html.append("<tr>");
                html.append("<td>").append(line.getProductName() != null ? line.getProductName() : "").append("</td>");
                html.append("<td>").append(line.getDescription() != null ? line.getDescription() : "").append("</td>");
                html.append("<td>").append(line.getQuantity() != null ? line.getQuantity() : "").append("</td>");
                html.append("<td>").append(line.getUnitPrice() != null ? line.getUnitPrice().toString() : "").append("</td>");
                html.append("<td>").append(line.getLineTotal() != null ? line.getLineTotal().toString() : "").append("</td>");
                html.append("<td>").append(line.getTaxRate() != null ? line.getTaxRate().toString() : "0.00").append("</td>");
                html.append("<td>").append(line.getTaxAmount() != null ? line.getTaxAmount().toString() : "0.00").append("</td>");
                html.append("</tr>");
            }
        }
        
        html.append("</tbody>");
        html.append("</table>");
        
        html.append("<div class=\"totals\">");
        html.append("<p><strong>Subtotal:</strong> ").append(invoice.getSubtotalAmount() != null ? invoice.getSubtotalAmount() : "0.00").append(" ").append(invoice.getCurrency() != null ? invoice.getCurrency() : "USD").append("</p>");
        html.append("<p><strong>Tax Amount:</strong> ").append(invoice.getTaxAmount() != null ? invoice.getTaxAmount() : "0.00").append(" ").append(invoice.getCurrency() != null ? invoice.getCurrency() : "USD").append("</p>");
        html.append("<p><strong>Total:</strong> ").append(invoice.getTotalAmount() != null ? invoice.getTotalAmount() : "0.00").append(" ").append(invoice.getCurrency() != null ? invoice.getCurrency() : "USD").append("</p>");
        html.append("</div>");
        
        html.append("<div class=\"notes\">");
        if (invoice.getNotes() != null) {
            html.append("<p><strong>Notes:</strong> ").append(invoice.getNotes()).append("</p>");
        }
        html.append("</div>");
        
        html.append("</body>");
        html.append("</html>");
        
        return html.toString();
    }

    private String generateObjectKey(Invoice invoice) {
        // Generate a path like: invoices/2025/03/invoice-CGFHJK987654321.pdf
        String year = String.valueOf(LocalDate.now().getYear());
        String month = String.format("%02d", LocalDate.now().getMonthValue());
        
        return String.format("invoices/%s/%s/invoice-%s.pdf", year, month, invoice.getInvoiceNumber());
    }

    private void uploadToB2(String key, byte[] content) {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(b2Bucket)
                .key(key)
                .contentType("application/pdf")
                .contentLength((long) content.length)
                .build();

        s3Client.putObject(request, RequestBody.fromBytes(content));
    }
}