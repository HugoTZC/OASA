"use client"

import { useState } from 'react'
import { DynamicImage, ProductImage, CategoryImage, HeroImage, RandomImage } from '@/components/dynamic-image'
import { useProductImages, useHeroImages, useRandomImages } from '@/hooks/use-images'
import { imagesService } from '@/lib/images'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, ExternalLink } from 'lucide-react'

export default function ImagesTestPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  
  // Test hooks
  const { images: productImages, loading: productLoading } = useProductImages(1, { count: 3, size: '300' })
  const { images: heroImages, loading: heroLoading } = useHeroImages({ count: 3, size: '600x200' })
  const { images: randomImages, loading: randomLoading, refresh: refreshRandom } = useRandomImages({ count: 4, size: '250' })

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
    refreshRandom()
  }

  const testDirectAPI = async () => {
    console.log('Testing direct API calls...')
    
    // Test product images
    const productResult = await imagesService.getProductImages(5, { count: 2, size: '400' })
    console.log('Product images:', productResult)
    
    // Test category image
    const categoryResult = await imagesService.getCategoryImage('herramientas', '800x300')
    console.log('Category image:', categoryResult)
    
    // Test hero images
    const heroResult = await imagesService.getHeroImages({ count: 3 })
    console.log('Hero images:', heroResult)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">OASA Images API Test</h1>
        <p className="text-gray-600 mb-6">
          Testing the Picsum Photos integration for dynamic image generation
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleRefresh} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Images
          </Button>
          <Button onClick={testDirectAPI} variant="outline" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Test API Calls
          </Button>
        </div>
      </div>

      {/* Product Images Test */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Testing product image generation with consistent seeds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ProductImage
              productId={1}
              width={300}
              height={300}
              alt="Product 1"
              className="rounded-lg border"
            />
            <ProductImage
              productId={1}
              variant="alt"
              width={300}
              height={300}
              alt="Product 1 Alternative"
              className="rounded-lg border"
            />
            <ProductImage
              productId={2}
              width={300}
              height={300}
              alt="Product 2"
              className="rounded-lg border"
            />
          </div>
          
          {/* Using hook */}
          <div>
            <h4 className="font-semibold mb-2">Via Hook (Product ID: 1):</h4>
            {productLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {Array.isArray(productImages) && productImages.map((img, idx) => (
                  <div key={idx} className="space-y-2">
                    <img 
                      src={img.url} 
                      alt={img.alt}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <Badge variant="secondary" className="text-xs">
                      {img.size.width}x{img.size.height}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Images Test */}
      <Card>
        <CardHeader>
          <CardTitle>Category Images</CardTitle>
          <CardDescription>
            Testing category banner generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Herramientas Category:</h4>
              <CategoryImage
                category="herramientas"
                width={400}
                height={200}
                alt="Herramientas Category"
                className="rounded-lg border w-full"
              />
            </div>
            <div>
              {/* <h4 className="font-semibold mb-2">Autopartes Category:</h4>
              <CategoryImage
                category="autopartes"
                width={400}
                height={200}
                alt="Autopartes Category"
                className="rounded-lg border w-full"
              /> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Images Test */}
      <Card>
        <CardHeader>
          <CardTitle>Hero/Banner Images</CardTitle>
          <CardDescription>
            Testing hero carousel image generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <HeroImage
                seed="industrial"
                width={300}
                height={150}
                alt="Industrial Hero"
                className="rounded-lg border w-full"
              />
              <HeroImage
                seed="tools"
                width={300}
                height={150}
                alt="Tools Hero"
                className="rounded-lg border w-full"
              />
              <HeroImage
                seed="automotive"
                width={300}
                height={150}
                alt="Automotive Hero"
                className="rounded-lg border w-full"
              />
            </div>
            
            {/* Via Hook */}
            <div>
              <h4 className="font-semibold mb-2">Via Hook:</h4>
              {heroLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {Array.isArray(heroImages) && heroImages.map((img, idx) => (
                    <div key={idx} className="space-y-2">
                      <img 
                        src={img.url} 
                        alt={img.alt}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <Badge variant="outline" className="text-xs">
                        {img.title}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Random Images Test */}
      <Card>
        <CardHeader>
          <CardTitle>Random Images</CardTitle>
          <CardDescription>
            Testing random image generation (refresh to see changes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <RandomImage
                key={`random-1-${refreshKey}`}
                width={200}
                height={200}
                alt="Random 1"
                className="rounded-lg border w-full"
              />
              <RandomImage
                key={`random-2-${refreshKey}`}
                width={200}
                height={200}
                alt="Random 2"
                className="rounded-lg border w-full"
              />
              <RandomImage
                key={`random-3-${refreshKey}`}
                width={200}
                height={200}
                alt="Random 3"
                className="rounded-lg border w-full"
              />
              <RandomImage
                key={`random-4-${refreshKey}`}
                width={200}
                height={200}
                alt="Random 4"
                className="rounded-lg border w-full"
              />
            </div>
            
            {/* Via Hook */}
            <div>
              <h4 className="font-semibold mb-2">Via Hook:</h4>
              {randomLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Array.isArray(randomImages) && randomImages.map((img, idx) => (
                    <div key={`hook-${idx}-${refreshKey}`} className="space-y-2">
                      <img 
                        src={img.url} 
                        alt={img.alt}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Badge variant="secondary" className="text-xs">
                        {img.id}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effects Test */}
      <Card>
        <CardHeader>
          <CardTitle>Image Effects</CardTitle>
          <CardDescription>
            Testing grayscale and blur effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Normal</h4>
              <DynamicImage
                type="placeholder"
                seed="effects-test"
                width={150}
                height={150}
                alt="Normal"
                className="rounded-lg border w-full"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Grayscale</h4>
              <DynamicImage
                type="placeholder"
                seed="effects-test"
                grayscale={true}
                width={150}
                height={150}
                alt="Grayscale"
                className="rounded-lg border w-full"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Blur</h4>
              <DynamicImage
                type="placeholder"
                seed="effects-test"
                blur={3}
                width={150}
                height={150}
                alt="Blur"
                className="rounded-lg border w-full"
              />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Both</h4>
              <DynamicImage
                type="placeholder"
                seed="effects-test"
                grayscale={true}
                blur={2}
                width={150}
                height={150}
                alt="Grayscale + Blur"
                className="rounded-lg border w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints Info */}
      <Card>
        <CardHeader>
          <CardTitle>Available API Endpoints</CardTitle>
          <CardDescription>
            Test these endpoints directly in your browser or API client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/product/:id?size=400&count=3</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/category/:category?size=1200x400</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/hero?count=5&size=1920x600</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/placeholder?size=300&type=product</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/random?size=400&count=4</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/gallery/:type?page=1&limit=12</div>
            <div><Badge variant="outline" className="mr-2">GET</Badge> /api/images/info/:seed</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
