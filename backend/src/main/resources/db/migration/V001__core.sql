-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ULID generator (if generated at DB), else generated at app.
-- For simplicity we accept app-generated ULIDs; enforce format via CHECK.
CREATE DOMAIN ulid AS char(26)
  CHECK (VALUE ~ '^[0-9A-HJKMNP-TV-Z]{26}$');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END$$;

-- ========== Core Tables ==========

CREATE TABLE organizations (
  id            ulid PRIMARY KEY,
  name          text NOT NULL,
  role          text NOT NULL CHECK (role IN ('buyer','vendor','ops')),
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER organizations_set_updated_at
BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE users (
  id            ulid PRIMARY KEY,
  org_id        ulid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  email         citext UNIQUE NOT NULL,
  full_name     text NOT NULL,
  role          text NOT NULL CHECK (role IN ('buyer','vendor','ops','admin')),
  password_hash text,         -- if using local auth; can be NULL when using SSO
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX users_org_idx ON users(org_id);
CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();