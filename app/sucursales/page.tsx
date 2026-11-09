import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"
import { SiteLayout } from "@/components/site-layout"

const branches = [
  {
    city: "Ciudad Juárez, Chih",
    address: "Oscar Flores 2695, Col. División del Norte",
    phone: "(656) 610 6104",
    email: "ventasjuarez@oasamexico.com",
    hours: ["Lun-Vie 8:00 - 5:00", "Sáb 8:00 - 1:00"],
    mapsQuery: "OASA Oscar Flores 2695 Ciudad Juárez Chihuahua",
  },
  {
    city: "Torreón, Coah",
    address: "Diagonal Reforma 2414, Col. Centro",
    phone: "(871) 713 1872",
    email: "ventas@oasamexico.com",
    hours: ["Lun-Vie 8:00 - 5:00", "Sáb 8:00 - 1:00"],
    mapsQuery: "OASA Diagonal Reforma 2414 Torreón Coahuila",
  },
  {
    city: "Ciudad Juárez, Chih (Satélite)",
    address: "Janos 1989, Col. Satélite I",
    phone: "(656) 687 7415",
    email: "juarez@oasamexico.com",
    hours: ["Lun-Vie 8:00 - 5:00", "Sáb 8:00 - 1:00"],
    mapsQuery: "OASA Satélite Janos 1989 Ciudad Juárez Chihuahua",
  },
  {
    city: "Monterrey, NL",
    address: "América del Norte 114, Las Américas",
    phone: "(81) 1761 5689",
    email: "ventasmty@oasamexico.com",
    hours: ["Lun-Vie 7:45 - 4:45", "Sáb 7:45 - 12:45"],
    mapsQuery: "OASA Nuevo León América del Norte 114 Guadalupe Nuevo León",
  },
  {
    city: "Chihuahua, Chih",
    address: "Genaro Vázquez 394, Francisco Villa",
    phone: "(614) 264 6885",
    email: "ventaschi@oasamexico.com",
    hours: ["Lun-Vie 8:00 - 5:00", "Sáb 8:00 - 1:00"],
    mapsQuery: "OASA Genaro Vázquez 394 Chihuahua Chihuahua",
  },
  {
    city: "Durango, Dgo",
    address: "Carrola Antuna 1540, Col. Ladrillera",
    phone: "(618) 810 1590",
    email: "ventasdgo@oasamexico.com",
    hours: ["Lun-Vie 8:00 - 5:00", "Sáb 8:00 - 1:00"],
    mapsQuery: "OASA Carrola Antuna 1540 Durango Durango",
  },
]

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export default function SucursalesPage() {
  return (
    <SiteLayout>
      <main className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 py-12 text-white md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Nuestras Sucursales</h1>
            <p className="mx-auto max-w-3xl text-lg text-blue-100 md:text-xl">
              Encuentra la sucursal OASA más cercana y recibe atención especializada.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <article key={branch.city} className="flex h-full flex-col rounded-xl border-2 border-cyan-500 bg-white p-5 shadow-md transition-shadow hover:shadow-xl">
                <h2 className="mb-3 text-2xl font-bold text-red-600">{branch.city}</h2>

                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                    <span>{branch.address}</span>
                  </div>
                  <a href={`tel:${branch.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 hover:text-blue-800">
                    <Phone className="h-5 w-5 shrink-0 text-blue-800" />
                    <span>{branch.phone}</span>
                  </a>
                  <a href={`mailto:${branch.email}`} className="flex items-center gap-3 break-all text-blue-700 underline hover:text-blue-900">
                    <Mail className="h-5 w-5 shrink-0" />
                    <span>{branch.email}</span>
                  </a>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                    <div>
                      {branch.hours.map((hours) => <p key={hours}>{hours}</p>)}
                    </div>
                  </div>
                </div>

                <a
                  href={mapsUrl(branch.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 font-bold text-gray-900 transition-colors hover:bg-yellow-300"
                >
                  Ver en Google Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

