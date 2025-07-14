import { useShopping } from '@/contexts/shopping-context'

export function useShoppingFeatures() {
  const { settings, loading } = useShopping()

  return {
    // Main feature flags
    isShoppingEnabled: settings.enableShopping,
    isPricingEnabled: settings.enablePricing,
    isAddToCartEnabled: settings.enableAddToCart,
    isCheckoutEnabled: settings.enableCheckout,
    
    // Shopping mode
    shoppingMode: settings.shoppingMode,
    isFullEcommerce: settings.shoppingMode === 'full',
    isCatalogMode: settings.shoppingMode === 'catalog',
    isInfoMode: settings.shoppingMode === 'disabled',
    
    // Computed features
    shouldShowCart: settings.enableShopping && settings.shoppingMode === 'full',
    shouldShowPrices: settings.enablePricing && settings.shoppingMode !== 'disabled',
    shouldShowAddToCart: settings.enableAddToCart && settings.enableShopping && settings.shoppingMode === 'full',
    shouldShowCheckout: settings.enableCheckout && settings.enableShopping && settings.shoppingMode === 'full',
    
    // Loading state
    loading,
    
    // Helper methods
    canPurchase: () => {
      return settings.enableShopping && 
             settings.enableAddToCart && 
             settings.enableCheckout && 
             settings.shoppingMode === 'full'
    },
    
    getShoppingModeText: () => {
      switch (settings.shoppingMode) {
        case 'full':
          return 'Full E-commerce'
        case 'catalog':
          return 'Product Catalog'
        case 'disabled':
          return 'Information Only'
        default:
          return 'Unknown'
      }
    }
  }
}
