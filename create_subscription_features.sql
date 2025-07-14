-- Create subscription features management tables

-- Feature definitions table - defines all available features
CREATE TABLE IF NOT EXISTS dbo.features (
    id BIGSERIAL PRIMARY KEY,
    feature_key VARCHAR(100) UNIQUE NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'general',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Subscription plans table - different subscription tiers
CREATE TABLE IF NOT EXISTS dbo.subscription_plans (
    id BIGSERIAL PRIMARY KEY,
    plan_key VARCHAR(100) UNIQUE NOT NULL,
    plan_name VARCHAR(255) NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Plan features mapping - which features are included in each plan
CREATE TABLE IF NOT EXISTS dbo.plan_features (
    id BIGSERIAL PRIMARY KEY,
    plan_id BIGINT NOT NULL,
    feature_id BIGINT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    feature_limit INTEGER, -- For features that have usage limits
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plan_id) REFERENCES dbo.subscription_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES dbo.features(id) ON DELETE CASCADE,
    UNIQUE(plan_id, feature_id)
);

-- Client subscriptions - track which plan each client has
CREATE TABLE IF NOT EXISTS dbo.client_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    client_id VARCHAR(100) UNIQUE NOT NULL, -- Could be domain, user ID, etc.
    plan_id BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled', 'expired')),
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (plan_id) REFERENCES dbo.subscription_plans(id)
);

-- Client feature overrides - allows custom feature access per client
CREATE TABLE IF NOT EXISTS dbo.client_feature_access (
    id BIGSERIAL PRIMARY KEY,
    client_id VARCHAR(100) NOT NULL,
    feature_id BIGINT NOT NULL,
    is_enabled BOOLEAN NOT NULL,
    feature_limit INTEGER,
    override_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (feature_id) REFERENCES dbo.features(id) ON DELETE CASCADE,
    UNIQUE(client_id, feature_id)
);

-- Insert default features
INSERT INTO dbo.features (feature_key, feature_name, description, category) VALUES 
    ('shopping_cart', 'Shopping Cart', 'Enable shopping cart functionality', 'ecommerce'),
    ('product_pricing', 'Product Pricing', 'Display product prices', 'ecommerce'),
    ('add_to_cart', 'Add to Cart', 'Allow products to be added to cart', 'ecommerce'),
    ('checkout_process', 'Checkout Process', 'Enable checkout and payment processing', 'ecommerce'),
    ('user_accounts', 'User Accounts', 'Enable user registration and login', 'users'),
    ('admin_panel', 'Admin Panel', 'Access to administration interface', 'admin'),
    ('analytics', 'Analytics', 'Advanced analytics and reporting', 'analytics'),
    ('multi_language', 'Multi Language', 'Multiple language support', 'content'),
    ('custom_branding', 'Custom Branding', 'Custom colors, logos, and themes', 'branding'),
    ('email_marketing', 'Email Marketing', 'Email campaigns and newsletters', 'marketing'),
    ('seo_tools', 'SEO Tools', 'Search engine optimization tools', 'marketing'),
    ('inventory_management', 'Inventory Management', 'Stock tracking and management', 'inventory'),
    ('order_management', 'Order Management', 'Order processing and tracking', 'orders'),
    ('payment_gateways', 'Payment Gateways', 'Multiple payment methods', 'payments'),
    ('shipping_integration', 'Shipping Integration', 'Shipping providers integration', 'shipping')
ON CONFLICT (feature_key) DO NOTHING;

-- Insert default subscription plans
INSERT INTO dbo.subscription_plans (plan_key, plan_name, description, price_monthly, price_yearly) VALUES 
    ('basic', 'Basic Plan', 'Essential features for small businesses', 29.99, 299.99),
    ('professional', 'Professional Plan', 'Advanced features for growing businesses', 79.99, 799.99),
    ('enterprise', 'Enterprise Plan', 'Full featured plan for large businesses', 199.99, 1999.99),
    ('custom', 'Custom Plan', 'Tailored features for specific needs', NULL, NULL)
ON CONFLICT (plan_key) DO NOTHING;

-- Get plan and feature IDs for mapping
DO $$
DECLARE
    basic_plan_id BIGINT;
    professional_plan_id BIGINT;
    enterprise_plan_id BIGINT;
    feature_rec RECORD;
BEGIN
    -- Get plan IDs
    SELECT id INTO basic_plan_id FROM dbo.subscription_plans WHERE plan_key = 'basic';
    SELECT id INTO professional_plan_id FROM dbo.subscription_plans WHERE plan_key = 'professional';
    SELECT id INTO enterprise_plan_id FROM dbo.subscription_plans WHERE plan_key = 'enterprise';

    -- Basic Plan Features (limited e-commerce)
    INSERT INTO dbo.plan_features (plan_id, feature_id, is_enabled) 
    SELECT basic_plan_id, id, true
    FROM dbo.features 
    WHERE feature_key IN ('product_pricing', 'user_accounts', 'custom_branding')
    ON CONFLICT (plan_id, feature_id) DO NOTHING;

    -- Professional Plan Features (full e-commerce)
    INSERT INTO dbo.plan_features (plan_id, feature_id, is_enabled) 
    SELECT professional_plan_id, id, true
    FROM dbo.features 
    WHERE feature_key IN (
        'shopping_cart', 'product_pricing', 'add_to_cart', 'checkout_process',
        'user_accounts', 'admin_panel', 'custom_branding', 'email_marketing',
        'inventory_management', 'order_management', 'payment_gateways'
    )
    ON CONFLICT (plan_id, feature_id) DO NOTHING;

    -- Enterprise Plan Features (everything)
    INSERT INTO dbo.plan_features (plan_id, feature_id, is_enabled) 
    SELECT enterprise_plan_id, id, true
    FROM dbo.features 
    ON CONFLICT (plan_id, feature_id) DO NOTHING;
END $$;

-- Insert a default client subscription (for the current OASA installation)
INSERT INTO dbo.client_subscriptions (client_id, plan_id, status) 
SELECT 'oasa-default', id, 'active'
FROM dbo.subscription_plans 
WHERE plan_key = 'professional'
ON CONFLICT (client_id) DO UPDATE SET
    plan_id = EXCLUDED.plan_id,
    updated_at = NOW();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_client_id ON dbo.client_subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_status ON dbo.client_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_plan_features_plan_id ON dbo.plan_features(plan_id);
CREATE INDEX IF NOT EXISTS idx_client_feature_access_client_id ON dbo.client_feature_access(client_id);
CREATE INDEX IF NOT EXISTS idx_features_category ON dbo.features(category);
CREATE INDEX IF NOT EXISTS idx_features_is_active ON dbo.features(is_active);
