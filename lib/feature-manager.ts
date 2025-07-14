import { Pool } from 'pg'

const pool = new Pool({
  user: 'hugotzc',
  host: 'localhost',
  database: 'OASA',
  password: 'dbaaccess',
  port: 5432,
})

export interface FeatureAccess {
  [featureKey: string]: {
    enabled: boolean
    limit?: number
  }
}

export class FeatureManager {
  private static instance: FeatureManager
  private clientId: string

  constructor(clientId: string = 'oasa-default') {
    this.clientId = clientId
  }

  static getInstance(clientId?: string): FeatureManager {
    if (!FeatureManager.instance) {
      FeatureManager.instance = new FeatureManager(clientId)
    }
    return FeatureManager.instance
  }

  /**
   * Get all feature access for the client
   */
  async getFeatureAccess(): Promise<FeatureAccess> {
    const client = await pool.connect()
    
    try {
      // Get features from subscription plan
      const planFeaturesQuery = `
        SELECT 
          f.feature_key,
          COALESCE(pf.is_enabled, false) as is_enabled,
          pf.feature_limit
        FROM dbo.features f
        LEFT JOIN dbo.plan_features pf ON f.id = pf.feature_id
        LEFT JOIN dbo.subscription_plans sp ON pf.plan_id = sp.id
        LEFT JOIN dbo.client_subscriptions cs ON sp.id = cs.plan_id
        WHERE cs.client_id = $1 AND cs.status = 'active' AND f.is_active = true
      `
      
      // Get feature overrides for this client
      const overrideQuery = `
        SELECT 
          f.feature_key,
          cfa.is_enabled,
          cfa.feature_limit
        FROM dbo.client_feature_access cfa
        JOIN dbo.features f ON cfa.feature_id = f.id
        WHERE cfa.client_id = $1
      `
      
      const [planResult, overrideResult] = await Promise.all([
        client.query(planFeaturesQuery, [this.clientId]),
        client.query(overrideQuery, [this.clientId])
      ])
      
      const features: FeatureAccess = {}
      
      // Add plan features
      planResult.rows.forEach((row: any) => {
        features[row.feature_key] = {
          enabled: row.is_enabled,
          limit: row.feature_limit
        }
      })
      
      // Apply overrides
      overrideResult.rows.forEach((row: any) => {
        features[row.feature_key] = {
          enabled: row.is_enabled,
          limit: row.feature_limit
        }
      })
      
      return features
    } finally {
      client.release()
    }
  }

  /**
   * Check if a specific feature is enabled
   */
  async isFeatureEnabled(featureKey: string): Promise<boolean> {
    const features = await this.getFeatureAccess()
    return features[featureKey]?.enabled || false
  }

  /**
   * Get shopping-related features for backward compatibility
   */
  async getShoppingFeatures() {
    const features = await this.getFeatureAccess()
    
    return {
      enableShopping: features['shopping_cart']?.enabled || false,
      enablePricing: features['product_pricing']?.enabled || false,
      enableAddToCart: features['add_to_cart']?.enabled || false,
      enableCheckout: features['checkout_process']?.enabled || false,
      shoppingMode: this.getShoppingMode(features)
    }
  }

  /**
   * Determine shopping mode based on enabled features
   */
  private getShoppingMode(features: FeatureAccess): 'full' | 'catalog' | 'disabled' {
    const hasCart = features['shopping_cart']?.enabled || false
    const hasPricing = features['product_pricing']?.enabled || false
    const hasCheckout = features['checkout_process']?.enabled || false
    
    if (hasCart && hasPricing && hasCheckout) {
      return 'full'
    } else if (hasPricing) {
      return 'catalog'
    } else {
      return 'disabled'
    }
  }

  /**
   * Update feature access for a client (admin function)
   */
  async updateClientFeatureAccess(featureKey: string, enabled: boolean, limit?: number): Promise<boolean> {
    const client = await pool.connect()
    
    try {
      // Get feature ID
      const featureResult = await client.query(
        'SELECT id FROM dbo.features WHERE feature_key = $1',
        [featureKey]
      )
      
      if (featureResult.rows.length === 0) {
        return false
      }
      
      const featureId = featureResult.rows[0].id
      
      // Upsert client feature access
      await client.query(`
        INSERT INTO dbo.client_feature_access (client_id, feature_id, is_enabled, feature_limit)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (client_id, feature_id) 
        DO UPDATE SET 
          is_enabled = EXCLUDED.is_enabled,
          feature_limit = EXCLUDED.feature_limit,
          updated_at = NOW()
      `, [this.clientId, featureId, enabled, limit])
      
      return true
    } finally {
      client.release()
    }
  }

  /**
   * Change client subscription plan
   */
  async changeSubscriptionPlan(planKey: string): Promise<boolean> {
    const client = await pool.connect()
    
    try {
      // Get plan ID
      const planResult = await client.query(
        'SELECT id FROM dbo.subscription_plans WHERE plan_key = $1 AND is_active = true',
        [planKey]
      )
      
      if (planResult.rows.length === 0) {
        return false
      }
      
      const planId = planResult.rows[0].id
      
      // Update client subscription
      await client.query(`
        UPDATE dbo.client_subscriptions 
        SET plan_id = $1, updated_at = NOW()
        WHERE client_id = $2
      `, [planId, this.clientId])
      
      return true
    } finally {
      client.release()
    }
  }
}
