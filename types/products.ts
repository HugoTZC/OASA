export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number | null;
  sku?: string;
  brand?: string;
  model?: string;
  weight?: number | null;
  dimensions?: any;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  metadata?: any;
  images: ProductImage[];
  inStock: boolean;
  image: string; // Primary image URL for backwards compatibility
  reviews: number; // Alias for reviewCount
  isSale: boolean; // Alias for isOnSale
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number | null;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  category?: string;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}
