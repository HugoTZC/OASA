import { SiteLayout } from "@/components/site-layout"

export default function SucursalesPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sucursales</h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Centro</h3>
          <p className="text-gray-600 mb-2">Av. Principal #123</p>
          <p className="text-gray-600 mb-2">Col. Centro, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 1234-5678</p>
          <p className="text-gray-600 mb-4">Lun-Vie: 8:00-18:00</p>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.076653828372!2d-106.37828562548388!3d31.686472338918712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d1745555555%3A0xf155e233532b99c0!2sOasa%20Satelite!5e0!3m2!1ses-419!2smx!4v1774458130160!5m2!1ses-419!2smx" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sucursal Centro"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Norte</h3>
          <p className="text-gray-600 mb-2">Av. Norte #456</p>
          <p className="text-gray-600 mb-2">Col. Industrial, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 2345-6789</p>
          <p className="text-gray-600 mb-4">Lun-Vie: 8:00-18:00</p>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.076653828372!2d-106.37828562548388!3d31.686472338918712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d1745555555%3A0xf155e233532b99c0!2sOasa%20Satelite!5e0!3m2!1ses-419!2smx!4v1774458130160!5m2!1ses-419!2smx" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sucursal Norte"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Sucursal Sur</h3>
          <p className="text-gray-600 mb-2">Av. Sur #789</p>
          <p className="text-gray-600 mb-2">Col. Comercial, Ciudad</p>
          <p className="text-gray-600 mb-2">Tel: (55) 3456-7890</p>
          <p className="text-gray-600 mb-4">Lun-Vie: 8:00-18:00</p>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3395.076653828372!2d-106.37828562548388!3d31.686472338918712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d1745555555%3A0xf155e233532b99c0!2sOasa%20Satelite!5e0!3m2!1ses-419!2smx!4v1774458130160!5m2!1ses-419!2smx" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sucursal Sur"
          />
        </div>
      </div>
      </div>
    </SiteLayout>
  )
}
