-- =========================================================
-- TWO-FACTOR AUTHENTICATION (2FA) TABLES
-- =========================================================

-- =========================================================
-- Two FA Methods
-- =========================================================
CREATE TABLE two_fa_methods (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(255) UNIQUE NOT NULL,
  code        VARCHAR(70) UNIQUE NOT NULL,
  description TEXT,
  reserve1    VARCHAR(1),  -- reserved column
  reserve2    VARCHAR(1),  -- reserved column
  reserve3    VARCHAR(1),  -- reserved column
  reserve4    VARCHAR(1),  -- reserved column
  status      status_enum NOT NULL DEFAULT 'ACTIVE',
  created_on  TIMESTAMPTZ DEFAULT current_timestamp,
  created_by  BIGINT NOT NULL,
  updated_on  TIMESTAMPTZ DEFAULT current_timestamp,
  updated_by  BIGINT NOT NULL
);

COMMENT ON TABLE two_fa_methods
IS 'Table holds list of available two FA methods in the system';

CREATE TRIGGER update_two_fa_methods_modtime
BEFORE UPDATE ON two_fa_methods
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- User Two FA Settings
-- =========================================================
CREATE TABLE user_two_fa_settings (
  id                BIGSERIAL PRIMARY KEY,
  user_id           BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  two_fa_method_id  BIGINT NOT NULL REFERENCES two_fa_methods ON UPDATE CASCADE ON DELETE CASCADE,
  two_fa_sender_details VARCHAR(255) NOT NULL,
  reserve1          VARCHAR(1),  -- reserved column
  reserve2          VARCHAR(1),  -- reserved column
  reserve3          VARCHAR(1),  -- reserved column
  reserve4          VARCHAR(1),  -- reserved column
  status            status_enum NOT NULL DEFAULT 'ACTIVE',
  created_on        TIMESTAMPTZ DEFAULT current_timestamp,
  created_by        BIGINT NOT NULL,
  updated_on        TIMESTAMPTZ DEFAULT current_timestamp,
  updated_by        BIGINT NOT NULL
);

COMMENT ON TABLE user_two_fa_settings
IS 'Table holds the list of user two FA settings in the system';

CREATE TRIGGER update_user_two_fa_settings_modtime
BEFORE UPDATE ON user_two_fa_settings
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- User Two FA Tokens
-- =========================================================
CREATE TABLE user_two_fa_tokens (
  id                BIGSERIAL PRIMARY KEY,
  user_id           BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  two_fa_method_id  BIGINT NOT NULL REFERENCES two_fa_methods ON UPDATE CASCADE ON DELETE CASCADE,
  token             VARCHAR(255) UNIQUE NOT NULL,
  token_type        VARCHAR(70) NOT NULL,
  validity_seconds INT DEFAULT 3600 NOT NULL,
  request_ip        VARCHAR(255) NOT NULL,
  request_user_agent VARCHAR(255) NOT NULL,
  reserve1          VARCHAR(1),  -- reserved column
  reserve2          VARCHAR(1),  -- reserved column
  reserve3          VARCHAR(1),  -- reserved column
  reserve4          VARCHAR(1),  -- reserved column
  created_on        TIMESTAMPTZ DEFAULT current_timestamp,
  created_by        BIGINT NOT NULL
);

COMMENT ON TABLE user_two_fa_tokens
IS 'Table holds the list of user two FA tokens in the system';

CREATE TRIGGER update_user_two_fa_tokens_modtime
BEFORE UPDATE ON user_two_fa_tokens
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- User Two FA Token Usage History
-- =========================================================
CREATE TABLE user_two_fa_token_usage_history (
  id                BIGSERIAL PRIMARY KEY,
  user_id           BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  two_fa_method_id  BIGINT NOT NULL REFERENCES two_fa_methods ON UPDATE CASCADE ON DELETE CASCADE,
  token             VARCHAR(255) NOT NULL,
  token_type        VARCHAR(70) NOT NULL,
  request_ip        VARCHAR(255) NOT NULL,
  request_user_agent VARCHAR(255) NOT NULL,
  reserve1          VARCHAR(1),  -- reserved column
  reserve2          VARCHAR(1),  -- reserved column
  reserve3          VARCHAR(1),  -- reserved column
  reserve4          VARCHAR(1),  -- reserved column
  created_on        TIMESTAMPTZ DEFAULT current_timestamp,
  created_by        BIGINT NOT NULL
);

COMMENT ON TABLE user_two_fa_token_usage_history
IS 'Table holds the list of user two FA token history in the system';

CREATE TRIGGER update_user_two_fa_token_usage_history_modtime
BEFORE UPDATE ON user_two_fa_token_usage_history
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

-- =========================================================
-- INITIAL DATA
-- =========================================================
INSERT INTO two_fa_methods (name, code, status, updated_by, created_by)
VALUES ('Email', 'EMAIL', 'ACTIVE', 0, 0);
