-- Add TestEntity table which extends Base entity
-- This table is used for testing Base entity functionality in production

CREATE TABLE public.test_entity (
    id character varying(26) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT test_entity_pkey PRIMARY KEY (id)
);

-- Add the trigger to update updated_at column automatically
CREATE TRIGGER update_test_entity_updated_at 
    BEFORE UPDATE ON test_entity 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();