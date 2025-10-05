-- Function to update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for the product table
CREATE TRIGGER update_product_updated_at 
    BEFORE UPDATE ON product 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();