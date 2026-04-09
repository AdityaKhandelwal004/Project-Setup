-- =========================================================
-- ROLES
-- =========================================================
CREATE TABLE roles (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(27) UNIQUE NOT NULL,
  type        VARCHAR(70) NOT NULL,
  description TEXT,
  status      status_enum NOT NULL DEFAULT 'ACTIVE',
  created_on  TIMESTAMPTZ DEFAULT current_timestamp
);

COMMENT ON TABLE roles
IS 'Table holds list of available roles in the system';

-- =========================================================
-- PERMISSIONS
-- =========================================================
CREATE TABLE permissions (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  status      status_enum DEFAULT 'ACTIVE',
  created_on  TIMESTAMPTZ DEFAULT current_timestamp
);

COMMENT ON TABLE permissions
IS 'Table holds list of available permissions in the system';

-- =========================================================
-- ROLE PERMISSIONS
-- =========================================================
CREATE TABLE role_permissions (
  role_id       BIGINT NOT NULL REFERENCES roles ON UPDATE CASCADE ON DELETE CASCADE,
  permission_id BIGINT NOT NULL REFERENCES permissions ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

COMMENT ON TABLE role_permissions
IS 'Table maps the role with the permissions from the permissions table';

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password     CHAR(60) NOT NULL,  
  salt         CHAR(60) NOT NULL, 
  status       status_enum NOT NULL,
  reserve1     VARCHAR(1),
  reserve2     VARCHAR(1),
  reserve3     VARCHAR(1),
  reserve4     VARCHAR(1), 
  created_on   TIMESTAMPTZ DEFAULT current_timestamp,
  created_by   BIGINT NOT NULL,
  updated_on   TIMESTAMPTZ DEFAULT current_timestamp,
  updated_by   BIGINT NOT NULL
);

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE users
IS 'Table containing application users, eg. users which can login to system';

-- =========================================================
-- USER DETAILS
-- =========================================================
CREATE TABLE user_details (
  id                    BIGSERIAL PRIMARY KEY,
  user_id               BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  first_name            VARCHAR(70) NOT NULL,
  last_name             VARCHAR(70) NOT NULL,
  profile_picture_path  TEXT,
  date_of_birth         DATE,
  reserve1              VARCHAR(1),
  reserve2              VARCHAR(1),
  reserve3              VARCHAR(1),
  reserve4              VARCHAR(1),
  created_on            TIMESTAMPTZ DEFAULT current_timestamp,
  created_by            BIGINT NOT NULL,
  updated_on            TIMESTAMPTZ DEFAULT current_timestamp,
  updated_by            BIGINT NOT NULL
);

CREATE TRIGGER update_user_details_modtime
BEFORE UPDATE ON user_details
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_details
IS 'Table containing application users details such as first and last names';

-- =========================================================
-- USER CONSENTS
-- =========================================================
CREATE TABLE user_consents (
  id                         BIGSERIAL PRIMARY KEY,
  user_id                    BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  terms_accepted_at          TIMESTAMPTZ,
  privacy_policy_accepted_at TIMESTAMPTZ,
  email_verified_at           TIMESTAMPTZ,
  created_on                  TIMESTAMPTZ DEFAULT current_timestamp,
  created_by                  BIGINT NOT NULL,
  updated_on                  TIMESTAMPTZ DEFAULT current_timestamp,
  updated_by                  BIGINT NOT NULL
);

CREATE TRIGGER update_user_consents_modtime
BEFORE UPDATE ON user_consents
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_consents
IS 'Table recording timestamps when users provide their consents for various actions or agreements in the application';

-- =========================================================
-- USER LOGIN HISTORY
-- =========================================================
CREATE TABLE user_login_history (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  login_at    TIMESTAMPTZ,
  login_ip    VARCHAR(255) NOT NULL,
  login_type  VARCHAR(70) NOT NULL,
  two_fa_token VARCHAR(255) DEFAULT NULL,
  user_agent  VARCHAR(255) NOT NULL,
  status      VARCHAR(255) NOT NULL,
  metadata    JSONB,
  created_on  TIMESTAMPTZ DEFAULT current_timestamp
);

COMMENT ON TABLE user_login_history
IS 'Table holds user login history';

-- =========================================================
-- PASSWORD RESET TOKENS
-- =========================================================
CREATE TABLE password_reset_tokens (
  id               BIGSERIAL PRIMARY KEY,
  user_id          BIGINT REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  token            VARCHAR(255) NOT NULL,
  validity_seconds INT DEFAULT 3600 NOT NULL,
  request_ip       VARCHAR(255) NOT NULL,
  request_user_agent VARCHAR(255) NOT NULL,
  created_on       TIMESTAMPTZ DEFAULT current_timestamp
);

COMMENT ON TABLE password_reset_tokens
IS 'Table holds password reset tokens';

-- =========================================================
-- PASSWORD RESET HISTORY
-- =========================================================
CREATE TABLE password_reset_history (
  id                    BIGSERIAL PRIMARY KEY,
  user_id               BIGINT REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  actioned_by_id        BIGINT REFERENCES users ON UPDATE CASCADE ON DELETE RESTRICT,
  action_by_type        VARCHAR(70) NOT NULL,
  token                 VARCHAR(255),
  action_user_user_agent VARCHAR(255) NOT NULL,
  action_user_ip        VARCHAR(255) NOT NULL,
  metadata              JSONB,
  created_on            TIMESTAMPTZ DEFAULT current_timestamp,
  created_by            BIGINT NOT NULL
);

COMMENT ON TABLE password_reset_history
IS 'Table holds password reset history';

-- =========================================================
-- VERIFY EMAIL TOKEN
-- =========================================================
CREATE TABLE verify_email_tokens (
  id               BIGSERIAL PRIMARY KEY,
  user_id          BIGINT REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  token            VARCHAR(255) NOT NULL,
  validity_seconds INT DEFAULT 3600 NOT NULL,
  request_ip       VARCHAR(255) NOT NULL,
  request_user_agent VARCHAR(255) NOT NULL,
  created_on       TIMESTAMPTZ DEFAULT current_timestamp
);

COMMENT ON TABLE verify_email_tokens
IS 'Table holds verify email tokens';


-- =========================================================
-- USER ROLES
-- =========================================================
CREATE TABLE user_roles (
  user_id BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  role_id BIGINT NOT NULL REFERENCES roles ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

COMMENT ON TABLE user_roles
IS 'Table maps the user with their role from the role table';

-- =========================================================
-- USER PERMISSIONS
-- =========================================================
CREATE TABLE user_permissions (
  user_id       BIGINT NOT NULL REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
  permission_id BIGINT NOT NULL REFERENCES permissions ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (user_id, permission_id)
);

COMMENT ON TABLE user_permissions
IS 'Table maps the user with the permissions from the permissions table';
