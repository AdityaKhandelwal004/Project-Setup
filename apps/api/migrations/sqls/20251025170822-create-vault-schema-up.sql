-- =========================================================
-- System vault folders and categories
-- =========================================================

CREATE TABLE IF NOT EXISTS system_vault_folders (
    id          BIGSERIAL PRIMARY KEY,
    parent_id   BIGINT REFERENCES system_vault_folders ON UPDATE CASCADE ON DELETE RESTRICT,
    name        VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',
    reserve1    VARCHAR(1),
    reserve2    VARCHAR(1),
    reserve3    VARCHAR(1),
    reserve4    VARCHAR(1),
    created_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by  BIGINT NOT NULL,
    updated_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by  BIGINT NOT NULL
);

CREATE TRIGGER update_system_vault_folders_modtime
    BEFORE UPDATE ON system_vault_folders
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE system_vault_folders
    IS 'Table holds list of system vault folders';

-- -----------------------------------------------------------------------------
INSERT INTO system_vault_folders (name, description, created_by, updated_by)
VALUES 
    ('Expense', 'All expense-related items', 1, 1),
    ('Insurance', 'All insurance-related items', 1, 1) 
ON CONFLICT (name) DO NOTHING;
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS system_vault_categories (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',
    reserve1    VARCHAR(1),
    reserve2    VARCHAR(1),
    reserve3    VARCHAR(1),
    reserve4    VARCHAR(1),
    created_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by  BIGINT NOT NULL,
    updated_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by  BIGINT NOT NULL
);

CREATE TRIGGER update_system_vault_categories_modtime
    BEFORE UPDATE ON system_vault_categories
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE system_vault_categories
    IS 'Table holds list of system vault categories';


-- -----------------------------------------------------------------------------
INSERT INTO system_vault_categories (name, description, created_by, updated_by)
VALUES
    ('Insurance', 'All insurance-related items', 1, 1),
    ('Tax', 'All tax-related items', 1, 1),
    ('Wills', 'All will-related items', 1, 1)
ON CONFLICT (name) DO NOTHING;
-- -----------------------------------------------------------------------------
-- =========================================================
-- Add Permissions
-- =========================================================
INSERT INTO permissions (name, description, status)
VALUES 
    ('VAULT_CATEGORY_MANAGEMENT', 'Permission to create, read, update, and delete vault categories', 'ACTIVE'),
    ('VAULT_FOLDER_MANAGEMENT', 'Permission to create, read, update, and delete vault folders', 'ACTIVE'),
    ('VAULT_TAGS_MANAGEMENT', 'Permission to create, read, update, and delete vault tags', 'ACTIVE'),
    ('VAULT_DOCUMENTS_MANAGEMENT', 'Permission to create, read, update, and delete vault documents', 'ACTIVE'),
    ('VAULT_AUDIT_LOG_MANAGEMENT', 'Permission to view vault audit logs', 'ACTIVE')
ON CONFLICT (name) DO NOTHING;


INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON TRUE  
WHERE r.type IN ('SUPER_ADMIN', 'OBIE_USER')
  AND p.name IN (
    'VAULT_CATEGORY_MANAGEMENT',
    'VAULT_FOLDER_MANAGEMENT',
    'VAULT_TAGS_MANAGEMENT',
    'VAULT_DOCUMENTS_MANAGEMENT',
    'VAULT_AUDIT_LOG_MANAGEMENT'
)
ON CONFLICT DO NOTHING;


-- =========================================================
-- User vault categories
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_categories (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',
    created_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by  BIGINT NOT NULL,
    updated_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by  BIGINT NOT NULL
);

ALTER TABLE user_vault_categories
ADD CONSTRAINT uq_user_vault_categories_user_id_name
UNIQUE (user_id, name);

CREATE TRIGGER update_user_vault_categories_modtime
    BEFORE UPDATE ON user_vault_categories
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_vault_categories
    IS 'Table holds list of user-specific vault categories created by each user.';

-- =========================================================
-- User vault tags
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_tags (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name       VARCHAR(255) NOT NULL,
    status     status_enum NOT NULL DEFAULT 'ACTIVE',
    created_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by BIGINT NOT NULL,
    updated_on TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by BIGINT NOT NULL
);

ALTER TABLE user_vault_tags
ADD CONSTRAINT uq_user_vault_tags_user_id_name
UNIQUE (user_id, name);

CREATE TRIGGER update_user_vault_tags_modtime
    BEFORE UPDATE ON user_vault_tags
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_vault_tags
    IS 'Table holds user-specific tags used for organizing vault entries.';
-- =========================================================
-- User vault folders
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_folders (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    parent_id   BIGINT REFERENCES user_vault_folders(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',
    created_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by  BIGINT NOT NULL,
    updated_on  TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by  BIGINT NOT NULL
);

CREATE TRIGGER update_user_vault_folders_modtime
    BEFORE UPDATE ON user_vault_folders
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_vault_folders
    IS 'Table holds user-specific vault folders, allowing hierarchical organization. Parent_id refers to another folder for nested structure.';

-- =========================================================
-- User vault documents
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_documents (
    id                   BIGSERIAL PRIMARY KEY,
    user_id              BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_vault_folder_id BIGINT REFERENCES user_vault_folders(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    name                 VARCHAR(255) NOT NULL,
    description          TEXT,
    mime_type            VARCHAR(255) NOT NULL,
    size_bytes           BIGINT NOT NULL,
    storage_path         TEXT NOT NULL,
    storage_provider     VARCHAR(255) NOT NULL,
    encryption_alg       VARCHAR(255),
    encryption_key_id    TEXT,
    encryption_metadata  JSONB,
    status               status_enum NOT NULL DEFAULT 'ACTIVE',
    created_on           TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    created_by           BIGINT NOT NULL,
    updated_on           TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
    updated_by           BIGINT NOT NULL
);

CREATE TRIGGER update_user_vault_documents_modtime
    BEFORE UPDATE ON user_vault_documents
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_vault_documents
    IS 'Table holds documents uploaded by users, organized optionally into vault folders. Supports metadata for encryption, storage, and provider details.';
-- =========================================================
-- User vault audit logs
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_audit_logs (
    id                     BIGSERIAL PRIMARY KEY,
    user_id                BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_vault_document_id BIGINT NOT NULL REFERENCES user_vault_documents(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    action                 VARCHAR(255) NOT NULL,
    action_details         JSONB,
    created_on             TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

COMMENT ON TABLE user_vault_audit_logs
    IS 'Table logs all user document-related actions (upload, update, delete, share, etc.) for auditing and activity tracking.';

-- =========================================================
-- User vault document categories (many-to-many mapping)
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_document_categories (
    user_vault_category_id BIGINT NOT NULL REFERENCES user_vault_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_vault_document_id BIGINT NOT NULL REFERENCES user_vault_documents(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY (user_vault_category_id, user_vault_document_id)
);

COMMENT ON TABLE user_vault_document_categories
    IS 'Mapping table to associate vault documents with one or more categories for each user.';

-- =========================================================
-- User vault document tags (many-to-many mapping)
-- =========================================================

CREATE TABLE IF NOT EXISTS user_vault_document_tags (
    user_vault_tag_id      BIGINT NOT NULL REFERENCES user_vault_tags(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_vault_document_id BIGINT NOT NULL REFERENCES user_vault_documents(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY (user_vault_tag_id, user_vault_document_id)
);

COMMENT ON TABLE user_vault_document_tags
    IS 'Mapping table to associate vault documents with one or more tags for each user.';
