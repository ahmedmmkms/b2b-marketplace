package com.p4.backend.rfq;

import com.p4.backend.identity.entity.Account;
import com.p4.backend.identity.entity.User;
import com.p4.backend.identity.repository.AccountRepository;
import com.p4.backend.identity.repository.UserRepository;
import com.p4.backend.rfq.entity.Rfq;
import com.p4.backend.rfq.entity.RfqLine;
import com.p4.backend.rfq.entity.Quote;
import com.p4.backend.rfq.entity.QuoteLine;
import com.p4.backend.rfq.service.RfqService;
import com.p4.backend.rfq.service.QuoteComparisonService;
import com.p4.backend.rfq.service.QuoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
public class RfqQuoteFlowIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private RfqService rfqService;

    @Autowired
    private QuoteService quoteService;

    @Autowired
    private QuoteComparisonService quoteComparisonService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRfqToQuoteAcceptanceFlow() throws Exception {
        // Create a test account
        Account account = new Account("Test Company", "test@example.com");
        account = accountRepository.save(account);

        // Create a test user
        User user = new User("testuser", "test@example.com", "Test", "User", account.getId());
        user = userRepository.save(user);

        // Create an RFQ
        Rfq rfq = new Rfq(account.getId(), "Contact Person", "contact@example.com", LocalDateTime.now().plusDays(7));
        rfq.setDescription("Test RFQ for integration testing");

        RfqLine rfqLine = new RfqLine(rfq.getId(), "Test Product", 10);
        rfqLine.setProductDescription("Test product description");

        List<RfqLine> rfqLines = Arrays.asList(rfqLine);
        Rfq createdRfq = rfqService.createRfq(rfq, rfqLines, user.getId());

        assertNotNull(createdRfq.getId());
        assertEquals(Rfq.RfqStatus.PUBLISHED, createdRfq.getStatus());

        // Create a quote for the RFQ
        Quote quote = new Quote(createdRfq.getId(), "VENDOR123", user.getId(), "Q-001", LocalDateTime.now().plusDays(5));
        quote.setNotes("Test quote for integration testing");

        QuoteLine quoteLine = new QuoteLine(quote.getId(), rfqLine.getId(), new BigDecimal("100.00"), 10, new BigDecimal("1000.00"));
        quoteLine.setNotes("Test quote line");

        List<QuoteLine> quoteLines = Arrays.asList(quoteLine);
        Quote createdQuote = quoteService.createQuote(quote, quoteLines, user.getId());

        assertNotNull(createdQuote.getId());
        assertEquals(Quote.QuoteStatus.SUBMITTED, createdQuote.getStatus());

        // Accept the quote
        quoteComparisonService.acceptQuote(createdQuote.getId(), user.getId());

        // Verify the quote is accepted
        Quote acceptedQuote = quoteService.getQuoteById(createdQuote.getId()).orElse(null);
        assertNotNull(acceptedQuote);
        assertEquals(Quote.QuoteStatus.ACCEPTED, acceptedQuote.getStatus());
        assertNotNull(acceptedQuote.getAcceptedAt());
        assertEquals(user.getId(), acceptedQuote.getAcceptedById());
    }
}