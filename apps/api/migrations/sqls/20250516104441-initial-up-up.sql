-- Function to be used in triggers to automatically update updated_on column value
CREATE OR REPLACE FUNCTION update_updated_on_column()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_on = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =========================================================
-- ENUM TYPES
-- =========================================================
CREATE TYPE status_enum AS ENUM (
  'ACTIVE',
  'INACTIVE'
);