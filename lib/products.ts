import { Product, ProductsResponse, ProductCategory, ProductFilters } from '@/types/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

class ProductsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/products`;
  }

  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${this.baseUrl}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async getCategories(): Promise<ProductCategory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Search products
  async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...filters, search: query });
  }

  // Get products by category
  async getProductsByCategory(category: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<ProductsResponse> {
    return this.getProducts({ ...filters, category });
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ limit });
      return response.products.filter(product => product.isFeatured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw new Error('Failed to fetch featured products');
    }
  }

  // Get new products
  async getNewProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ isNew: true, limit, sortBy: 'created_at', sortOrder: 'desc' });
      return response.products;
    } catch (error) {
      console.error('Error fetching new products:', error);
      throw new Error('Failed to fetch new products');
    }
  }

  // Get sale products
  async getSaleProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ isSale: true, limit });
      return response.products;
    } catch (error) {
      console.error('Error fetching sale products:', error);
      throw new Error('Failed to fetch sale products');
    }
  }
}

export const productsService = new ProductsService();
export default productsService;
