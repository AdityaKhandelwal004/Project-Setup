ALTER TABLE user_badges
ADD CONSTRAINT unique_user_badge UNIQUE (user_id, system_badge_id);
