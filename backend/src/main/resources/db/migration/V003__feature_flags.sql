-- ========== Feature Flags Table ==========

CREATE TABLE feature_flags (
  key           text PRIMARY KEY,
  value         jsonb NOT NULL,  -- e.g., {"enabled":true,"scope":"public"}
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER feature_flags_set_updated_at
BEFORE UPDATE ON feature_flags FOR EACH ROW EXECUTE FUNCTION set_updated_at();