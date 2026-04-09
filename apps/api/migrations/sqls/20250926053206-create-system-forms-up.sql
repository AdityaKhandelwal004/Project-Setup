-- =========================================================
-- SYSTEM FORMS
-- =========================================================
CREATE TABLE system_forms (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(255) UNIQUE NOT NULL,
    meta_data    JSONB,
    status      status_enum NOT NULL DEFAULT 'ACTIVE',
    reserve1    VARCHAR(1),  -- reserved for future use
    reserve2    VARCHAR(1),  -- reserved for future use
    reserve3    VARCHAR(1),  -- reserved for future use
    reserve4    VARCHAR(1),  -- reserved for future use
    created_on  TIMESTAMPTZ DEFAULT current_timestamp,
    created_by  BIGINT NOT NULL,
    updated_on  TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by  BIGINT NOT NULL
);

-- Trigger to automatically update updated_on column
CREATE TRIGGER update_system_forms_modtime
BEFORE UPDATE ON system_forms
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE system_forms
IS 'Table containing predefined system forms';


-- =========================================================
-- SYSTEM FORM STEPS
-- =========================================================
CREATE TABLE system_form_steps (
    id                      BIGSERIAL PRIMARY KEY,
    code                    VARCHAR(255) UNIQUE NOT NULL,
    system_form_id          BIGINT NOT NULL REFERENCES system_forms(id) ON UPDATE CASCADE ON DELETE CASCADE,
    name                    VARCHAR(255) NOT NULL,
    step_sequence_number    BIGINT NOT NULL,
    presentation_meta_data  JSONB,
    configuration_meta_data JSONB,
    status                  status_enum NOT NULL DEFAULT 'ACTIVE',
    reserve1                VARCHAR(1),
    reserve2                VARCHAR(1),
    reserve3                VARCHAR(1),
    reserve4                VARCHAR(1),
    created_on              TIMESTAMPTZ DEFAULT current_timestamp,
    created_by              BIGINT NOT NULL,
    updated_on              TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by              BIGINT NOT NULL,
    UNIQUE(system_form_id, step_sequence_number)
);

CREATE TRIGGER update_system_form_steps_modtime
BEFORE UPDATE ON system_form_steps
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE system_form_steps
IS 'Table containing steps for each system form';


-- =========================================================
-- SYSTEM FORM QUESTIONS
-- =========================================================
CREATE TABLE system_form_questions (
    id                        BIGSERIAL PRIMARY KEY,
    code                      VARCHAR(255) UNIQUE NOT NULL,
    system_form_step_id       BIGINT NOT NULL REFERENCES system_form_steps(id) ON UPDATE CASCADE ON DELETE CASCADE,
    question_sequence_number BIGINT NOT NULL,
    presentation_meta_data    JSONB,
    configuration_meta_data   JSONB,
    status                    status_enum NOT NULL DEFAULT 'ACTIVE',
    reserve1                  VARCHAR(1),
    reserve2                  VARCHAR(1),
    reserve3                  VARCHAR(1),
    reserve4                  VARCHAR(1),
    created_on                TIMESTAMPTZ DEFAULT current_timestamp,
    created_by                BIGINT NOT NULL,
    updated_on                TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by                BIGINT NOT NULL
);

CREATE TRIGGER update_system_form_questions_modtime
BEFORE UPDATE ON system_form_questions
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE system_form_questions
IS 'Table containing questions for each system form step';


-- =========================================================
-- USER FORMS
-- =========================================================
CREATE TABLE user_forms (
    id              BIGSERIAL PRIMARY KEY,
    system_form_id  BIGINT NOT NULL REFERENCES system_forms(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    code            VARCHAR(255) NOT NULL,
    status          VARCHAR(255) NOT NULL DEFAULT 'NOT_STARTED',
    reserve1        VARCHAR(1),
    reserve2        VARCHAR(1),
    reserve3        VARCHAR(1),
    reserve4        VARCHAR(1),
    created_on      TIMESTAMPTZ DEFAULT current_timestamp,
    created_by      BIGINT NOT NULL,
    updated_on      TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by      BIGINT NOT NULL
);

CREATE TRIGGER update_user_forms_modtime
BEFORE UPDATE ON user_forms
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_forms
IS 'Table containing forms associated with users';


-- =========================================================
-- USER FORM STEPS
-- =========================================================
CREATE TABLE user_form_steps (
    id                      BIGSERIAL PRIMARY KEY,
    user_form_id            BIGINT NOT NULL REFERENCES user_forms(id) ON UPDATE CASCADE ON DELETE CASCADE,
    code                    VARCHAR(255) NOT NULL,
    name                    VARCHAR(255) NOT NULL,
    step_sequence_number    BIGINT NOT NULL,
    presentation_meta_data  JSONB,
    configuration_meta_data JSONB,
    status                  VARCHAR(255) NOT NULL DEFAULT 'PENDING',   -- "PENDING", "COMPLETED"
    reserve1                VARCHAR(1),
    reserve2                VARCHAR(1),
    reserve3                VARCHAR(1),
    reserve4                VARCHAR(1),
    created_on              TIMESTAMPTZ DEFAULT current_timestamp,
    created_by              BIGINT NOT NULL,
    updated_on              TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by              BIGINT NOT NULL
);

CREATE TRIGGER update_user_form_steps_modtime
BEFORE UPDATE ON user_form_steps
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_form_steps
IS 'Table containing user-specific steps of forms';


-- =========================================================
-- USER FORM QUESTIONS
-- =========================================================
CREATE TABLE user_form_questions (
    id                        BIGSERIAL PRIMARY KEY,
    user_form_step_id         BIGINT NOT NULL REFERENCES user_form_steps(id) ON UPDATE CASCADE ON DELETE CASCADE,
    code                      VARCHAR(255) NOT NULL,
    question_sequence_number  BIGINT NOT NULL,
    presentation_meta_data    JSONB,
    configuration_meta_data   JSONB,
    response                  JSONB,
    status                    VARCHAR(255) NOT NULL DEFAULT 'NOT_ANSWERED',  -- "NOT_ANSWERED", "ANSWERED"
    reserve1                  VARCHAR(1),
    reserve2                  VARCHAR(1),
    reserve3                  VARCHAR(1),
    reserve4                  VARCHAR(1),
    created_on                TIMESTAMPTZ DEFAULT current_timestamp,
    created_by                BIGINT NOT NULL,
    updated_on                TIMESTAMPTZ DEFAULT current_timestamp,
    updated_by                BIGINT NOT NULL
);

CREATE TRIGGER update_user_form_questions_modtime
BEFORE UPDATE ON user_form_questions
FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_column();

COMMENT ON TABLE user_form_questions
IS 'Table containing user-specific questions for each form step';
