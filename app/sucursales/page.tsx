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
        <div className="grid grid-cols-1 gap-8">
          {branches.map((branch) => (
            <div key={branch.city} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{branch.city}</h3>
              <p className="text-gray-600 mb-2">{branch.address}</p>
              <p className="text-gray-600 mb-2">Tel: {branch.phone}</p>
              <p className="text-gray-600 mb-2">{branch.email}</p>
              {branch.hours.map((hours) => <p key={hours} className="text-gray-600 mb-2">{hours}</p>)}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapsQuery)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 underline hover:text-blue-700">
                Ver en Google Maps
              </a>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}

