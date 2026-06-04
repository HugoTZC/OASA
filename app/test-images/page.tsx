"use client"

import { ProductImage } from '@/components/dynamic-image'
import { useProducts } from '@/hooks/use-products'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ImagesTestPage() {
  const { products } = useProducts({ limit: 4 })

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">OASA Images API Test</h1>
        <p className="text-gray-600 mb-6">
          Testing the Picsum Photos integration for dynamic image generation
        </p>
      </div>

      {/* Product Images Test */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images from Backend</CardTitle>
          <CardDescription>
            Images served via /api/images/proxy to bypass CORS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="space-y-2">
                <ProductImage
                  src={product.imagepath ? `http://localhost:5000${product.imagepath}` : '/placeholder.svg'}
                  width={300}
                  height={300}
                  alt={product.name}
                  className="rounded-lg border w-full"
                />
                <Badge variant="secondary" className="text-xs">
                  {product.name}
                </Badge>
                <p className="text-xs text-gray-500 font-mono">{product.imagepath}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}