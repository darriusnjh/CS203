-- Insert initial forum categories
INSERT INTO forum_categories (id, name, description, color, icon, sort_order, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'General Discussion', 'General questions and discussions about tariffs and trade', '#3B82F6', 'message-circle', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440002', 'Tariff Calculations', 'Help with tariff calculations and HTS codes', '#10B981', 'calculator', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440003', 'Policy Updates', 'Discussion about new trade policies and regulations', '#F59E0B', 'file-text', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('550e8400-e29b-41d4-a716-446655440004', 'Industry Specific', 'Industry-specific tariff discussions', '#8B5CF6', 'briefcase', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert a sample user for testing
INSERT INTO users (id, username, email, password_hash, is_active, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'demo_user', 'demo@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);