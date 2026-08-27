import { Product, ProductsResponse, ProductCategory, ProductFilters } from '@/types/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5000';

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
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const rawCategories = Array.isArray(data) ? data : data.categories || [];
      const categories = await Promise.all(rawCategories.map(async (rawCategory: any, index: number) => {
        const code = typeof rawCategory === 'string'
          ? rawCategory
          : rawCategory.code || rawCategory.cat_code || rawCategory.category_code || rawCategory.categoryCode || rawCategory.slug || '';
        if (!code) return null;
        if (typeof rawCategory === 'object' && rawCategory.name) return { ...rawCategory, code } as ProductCategory;

        const detailResponse = await fetch(`${API_BASE_URL}/api/categories/${encodeURIComponent(code)}`, {
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        const detail = detailResponse.ok ? await detailResponse.json() : {};
        const category = detail.category || detail.data || detail;
        return {
          id: category.id ?? index,
          code,
          name: category.name || category.category_name || code,
          slug: category.slug || code.toLowerCase().replace(/\s+/g, '-'),
          description: category.description,
          parentId: category.parentId ?? category.parent_id ?? null,
          imageUrl: category.imageUrl || category.image_url,
          isActive: category.isActive ?? category.is_active ?? true,
          sortOrder: category.sortOrder ?? category.sort_order ?? index,
          createdAt: category.createdAt || category.created_at || '',
          updatedAt: category.updatedAt || category.updated_at || '',
        } as ProductCategory;
      }));
      return categories.filter((category): category is ProductCategory => category !== null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
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
      return response.products.filter(product => product.hierarchy === 1);
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
