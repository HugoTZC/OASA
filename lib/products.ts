import { Product, ProductsResponse, ProductCategory, ProductFilters } from '@/types/products';

const API_BASE_URL = '/api/backend';

class ProductsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/products`;
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
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const container = data?.data ?? data;
      const rawCategories = Array.isArray(container)
        ? container
        : Array.isArray(container?.categories)
          ? container.categories
          : Array.isArray(container?.data)
            ? container.data
            : Array.isArray(data?.categories)
              ? data.categories
              : [];

      const categories = await Promise.all(rawCategories.map(async (rawCategory: any, index: number) => {
        const item = rawCategory?.category ?? rawCategory;
        const code = typeof item === 'string'
          ? item
          : item?.code || item?.cat_code || item?.category_code || item?.categoryCode || item?.slug || '';
        if (!code) return null;

        const initialName = typeof item === 'object'
          ? item.name || item.category_name || item.cat_name || item.description
          : undefined;

        let category: any = item;
        if (!initialName) {
          const detailResponse = await fetch(`${API_BASE_URL}/categories/${encodeURIComponent(code)}`, {
            cache: 'no-store',
          });
          if (detailResponse.ok) {
            const detail = await detailResponse.json();
            category = detail?.category ?? detail?.data?.category ?? detail?.data ?? detail;
          }
        }

        return {
          id: category?.id ?? index,
          code,
          name: initialName || category?.name || category?.category_name || category?.cat_name || category?.description || code,
          slug: category?.slug || code.toLowerCase().replace(/\s+/g, '-'),
          description: category?.description,
          parentId: category?.parentId ?? category?.parent_id ?? null,
          imageUrl: category?.imageUrl || category?.image_url,
          isActive: category?.isActive ?? category?.is_active ?? true,
          sortOrder: category?.sortOrder ?? category?.sort_order ?? index,
          createdAt: category?.createdAt || category?.created_at || '',
          updatedAt: category?.updatedAt || category?.updated_at || '',
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
