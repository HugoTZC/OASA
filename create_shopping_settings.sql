-- Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS dbo.site_settings (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    type VARCHAR(50) DEFAULT 'string',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Insert shopping-related settings
INSERT INTO dbo.site_settings (setting_key, setting_value, description, setting_type, is_public) VALUES 
    ('enable_shopping', 'true', 'Enable shopping cart functionality', 'boolean', true),
    ('enable_pricing', 'true', 'Show product prices', 'boolean', true),
    ('enable_add_to_cart', 'true', 'Show add to cart buttons', 'boolean', true),
    ('enable_checkout', 'true', 'Enable checkout process', 'boolean', true),
    ('shopping_mode', 'full', 'Shopping mode: full, catalog, or disabled', 'string', true)
ON CONFLICT (setting_key) DO UPDATE SET 
    setting_value = EXCLUDED.setting_value,
    updated_at = NOW();
