import { SiteLayout } from "@/components/site-layout"

export default function SucursalesPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sucursales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Centro</h3>
          <p className="text-gray-600 mb-2">Av. Principal #123</p>
          <p className="text-gray-600 mb-2">Col. Centro, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 1234-5678</p>
          <p className="text-gray-600">Lun-Vie: 8:00-18:00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Norte</h3>
          <p className="text-gray-600 mb-2">Av. Norte #456</p>
          <p className="text-gray-600 mb-2">Col. Industrial, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 2345-6789</p>
          <p className="text-gray-600">Lun-Vie: 8:00-18:00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Sur</h3>
          <p className="text-gray-600 mb-2">Av. Sur #789</p>
          <p className="text-gray-600 mb-2">Col. Comercial, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 3456-7890</p>
          <p className="text-gray-600">Lun-Vie: 8:00-18:00</p>
        </div>
      </div>
      </div>
    </SiteLayout>
  )
}
