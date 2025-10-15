-- Consolidated adjustments that were applied directly in Neon production.
-- V1 already provisions the schema with those columns/tables for fresh environments.
-- Keeping V2 as a no-op ensures Flyway history remains consistent while allowing
-- repair to align checksums with the current migration source.

DO $$
BEGIN
    -- no-op placeholder migration
END
$$;

