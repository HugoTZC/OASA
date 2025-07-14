import { Phone, Mail, Clock, User, MessageCircle, Headphones } from "lucide-react"

const representatives = [
  {
    name: "Carlos Mendoza",
    position: "Gerente de Atención al Cliente",
    phone: "(656) 123-4567 ext. 101",
    email: "carlos.mendoza@tiendaoasa.com",
    specialties: ["Consultas generales", "Quejas y sugerencias", "Escalación de casos"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Vie 8:00-18:00",
  },
  {
    name: "Ana García",
    position: "Especialista en Créditos",
    phone: "(656) 123-4567 ext. 102",
    email: "ana.garcia@tiendaoasa.com",
    specialties: ["Solicitudes de crédito", "Términos de pago", "Financiamiento"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Vie 9:00-17:00",
  },
  {
    name: "Roberto Silva",
    position: "Soporte Técnico",
    phone: "(656) 123-4567 ext. 103",
    email: "roberto.silva@tiendaoasa.com",
    specialties: ["Asesoría técnica", "Instalaciones", "Mantenimiento"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Vie 7:00-19:00",
  },
  {
    name: "María López",
    position: "Ventas Corporativas",
    phone: "(656) 123-4567 ext. 104",
    email: "maria.lopez@tiendaoasa.com",
    specialties: ["Ventas mayoreo", "Cotizaciones", "Proyectos especiales"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Vie 8:00-18:00",
  },
  {
    name: "Fernando Ruiz",
    position: "Servicio Post-Venta",
    phone: "(656) 123-4567 ext. 105",
    email: "fernando.ruiz@tiendaoasa.com",
    specialties: ["Garantías", "Devoluciones", "Seguimiento de pedidos"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Sáb 8:00-16:00",
  },
  {
    name: "Patricia Vega",
    position: "Atención a Sucursales",
    phone: "(656) 123-4567 ext. 106",
    email: "patricia.vega@tiendaoasa.com",
    specialties: ["Coordinación sucursales", "Inventarios", "Logística"],
    image: "/placeholder.svg?height=200&width=200",
    available: "Lun-Vie 8:00-17:00",
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: "Línea Principal",
    info: "656-123-4567",
    description: "Llamada gratuita desde cualquier parte de México",
    available: "24/7",
  },
  {
    icon: Phone,
    title: "Oficina Tijuana",
    info: "(656) 123-4567",
    description: "Atención directa desde nuestra oficina principal",
    available: "Lun-Vie 8:00-18:00",
  },
  {
    icon: Mail,
    title: "Correo General",
    info: "info@tiendaoasa.com",
    description: "Para consultas generales y información",
    available: "Respuesta en 24 hrs",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    info: "+52 686 516 4283",
    description: "Chat directo para consultas rápidas",
    available: "Lun-Vie 8:00-18:00",
  },
]

const departments = [
  { name: "Ventas", phone: "ext. 201-205", email: "ventas@tiendaoasa.com" },
  { name: "Soporte Técnico", phone: "ext. 301-303", email: "soporte@tiendaoasa.com" },
  { name: "Créditos", phone: "ext. 401-402", email: "creditos@tiendaoasa.com" },
  { name: "Facturación", phone: "ext. 501-502", email: "facturacion@tiendaoasa.com" },
  { name: "Logística", phone: "ext. 601-603", email: "logistica@tiendaoasa.com" },
  { name: "Recursos Humanos", phone: "ext. 701", email: "rh@tiendaoasa.com" },
]

export default function AtencionPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Atención a Clientes</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Estamos aquí para ayudarte. Nuestro equipo de especialistas está disponible para resolver tus dudas,
              procesar tus pedidos y brindarte el mejor servicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                Llamar Ahora
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors">
                Enviar WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Formas de Contacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el método que más te convenga para comunicarte con nosotros
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-green-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{method.title}</h3>
                  <p className="text-2xl font-bold text-green-800 mb-2">{method.info}</p>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <span className="text-sm text-blue-800 font-medium">{method.available}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Representatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestros Representantes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce a nuestro equipo de especialistas, cada uno experto en su área
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {representatives.map((rep, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{rep.name}</h3>
                  <p className="text-blue-800 font-medium">{rep.position}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-700">{rep.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-700 text-sm">{rep.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-orange-600 mr-3" />
                    <span className="text-gray-700 text-sm">{rep.available}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Especialidades:</h4>
                  <ul className="space-y-1">
                    {rep.specialties.map((specialty, specIndex) => (
                      <li key={specIndex} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-800 rounded-full mr-2"></span>
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm">
                    Llamar
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Departamentos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contacta directamente al departamento que necesites
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{dept.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-700">(656) 123-4567 {dept.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-700 text-sm">{dept.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Headphones className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Soporte de Emergencia</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Para situaciones urgentes relacionadas con gases industriales o equipos críticos, contamos con soporte 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Llamada de Emergencia
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-red-800 transition-colors">
              WhatsApp Urgente
            </button>
          </div>
          <div className="text-2xl font-bold">
            <Phone className="w-8 h-8 inline mr-2" />
            656-123-4567
          </div>
          <p className="text-red-200 mt-2">Disponible 24 horas, 7 días a la semana</p>
        </div>
      </section>
    </main>
  )
}
