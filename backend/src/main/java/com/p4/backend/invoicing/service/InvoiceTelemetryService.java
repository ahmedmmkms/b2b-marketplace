package com.p4.backend.invoicing.service;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Timer;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.concurrent.TimeUnit;

@Service
public class InvoiceTelemetryService {
    private static final Logger log = LoggerFactory.getLogger(InvoiceTelemetryService.class);

    private final MeterRegistry meterRegistry;
    
    public InvoiceTelemetryService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    private Counter invoiceGenerationCounter;
    private Counter invoiceErrorCounter;
    private Timer invoiceGenerationTimer;

    @PostConstruct
    public void init() {
        this.invoiceGenerationCounter = Counter.builder("invoice.generated")
                .description("Number of invoices generated")
                .register(meterRegistry);

        this.invoiceErrorCounter = Counter.builder("invoice.errors")
                .description("Number of invoice generation errors")
                .register(meterRegistry);

        this.invoiceGenerationTimer = Timer.builder("invoice.generation.duration")
                .description("Duration of invoice generation")
                .register(meterRegistry);
    }

    public void recordInvoiceGeneration() {
        invoiceGenerationCounter.increment();
    }

    public void recordInvoiceError() {
        invoiceErrorCounter.increment();
    }

    public void recordInvoiceGenerationTime(long duration, TimeUnit unit) {
        invoiceGenerationTimer.record(duration, unit);
    }

    public void recordInvoiceGenerationTime(Runnable operation) {
        Timer.Sample sample = Timer.start(meterRegistry);
        try {
            operation.run();
            recordInvoiceGeneration();
        } catch (Exception e) {
            recordInvoiceError();
            throw e;
        } finally {
            sample.stop(invoiceGenerationTimer);
        }
    }
}