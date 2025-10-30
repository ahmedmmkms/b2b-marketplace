-- ========== Feature Flags Table ==========

CREATE TABLE IF NOT EXISTS feature_flags (
  key           text PRIMARY KEY,
  value         jsonb NOT NULL,  -- e.g., {"enabled":true,"scope":"public"}
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
DO $$ 
BEGIN 
   IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'feature_flags_set_updated_at') THEN 
      CREATE TRIGGER feature_flags_set_updated_at
      BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION set_updated_at();
   END IF; 
END $$;