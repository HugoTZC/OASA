import { Clock, Mail, Phone } from "lucide-react"
import { SiteLayout } from "@/components/site-layout"

const branches = [
  { city: "Ciudad Juárez, Chih", address: "Oscar Flores 2695, Col. División del Norte", phone: "(656) 610 6104", email: "ventasjuarez@oasamexico.com", hours: ["Lun-Vie: 8:00-17:00", "Sáb: 8:00-13:00"], mapsQuery: "Oscar Flores 2695 División del Norte Ciudad Juárez Chihuahua" },
  { city: "Torreón, Coah", address: "Diagonal Reforma 2414, Col. Centro", phone: "(871) 713 1872", email: "ventas@oasamexico.com", hours: ["Lun-Vie: 8:00-17:00", "Sáb: 8:00-13:00"], mapsQuery: "Diagonal Reforma 2414 Centro Torreón Coahuila" },
  { city: "Ciudad Juárez, Chih (Satélite)", address: "Janos 1989, Col. Satélite I", phone: "(656) 687 7415", email: "juarez@oasamexico.com", hours: ["Lun-Vie: 8:00-17:00", "Sáb: 8:00-13:00"], mapsQuery: "Janos 1989 Satélite Ciudad Juárez Chihuahua" },
  { city: "Monterrey, NL", address: "América del Norte 114, Las Américas", phone: "(81) 1761 5689", email: "ventasmty@oasamexico.com", hours: ["Lun-Vie: 7:45-16:45", "Sáb: 7:45-12:45"], mapsQuery: "América del Norte 114 Las Américas Nuevo León" },
  { city: "Chihuahua, Chih", address: "Genaro Vázquez 394, Francisco Villa", phone: "(614) 264 6885", email: "ventaschi@oasamexico.com", hours: ["Lun-Vie: 8:00-17:00", "Sáb: 8:00-13:00"], mapsQuery: "Genaro Vázquez 394 Francisco Villa Chihuahua" },
  { city: "Durango, Dgo", address: "Carrola Antuna 1540, Col. Ladrillera", phone: "(618) 810 1590", email: "ventasdgo@oasamexico.com", hours: ["Lun-Vie: 8:00-17:00", "Sáb: 8:00-13:00"], mapsQuery: "Carrola Antuna 1540 Ladrillera Durango" },
]

export default function SucursalesPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Sucursales</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <div key={branch.city} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{branch.city}</h3>
                <p className="text-blue-800 font-medium">{branch.address}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-green-600 mr-3" />
                  <span className="text-gray-700">{branch.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-gray-700 text-sm break-all">{branch.email}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-orange-600 mr-3" />
                  <span className="text-gray-700 text-sm">{branch.hours.join(" | ")}</span>
                </div>
              </div>

              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(branch.mapsQuery)}&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${branch.city}`}
              />
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}

