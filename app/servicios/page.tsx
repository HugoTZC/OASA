import Image from "next/image"
import { Wrench, Settings, Truck, Users, Award, Clock, CheckCircle, Phone } from "lucide-react"

const services = [
  {
    icon: Settings,
    title: "Instalación de Gases",
    description: "Diseño, instalación y puesta en marcha de sistemas de gases industriales",
    features: ["Diseño personalizado", "Instalación certificada", "Pruebas de seguridad", "Documentación completa"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo",
    description: "Programas de mantenimiento para equipos industriales y sistemas de gases",
    features: ["Inspecciones periódicas", "Calibración de equipos", "Reportes detallados", "Soporte 24/7"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: Users,
    title: "Capacitación Técnica",
    description: "Entrenamiento especializado para el manejo seguro de equipos y gases",
    features: ["Cursos certificados", "Instructores expertos", "Material didáctico", "Certificación oficial"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: Truck,
    title: "Servicio a Domicilio",
    description: "Entrega, instalación y servicio técnico en tu ubicación",
    features: ["Entrega programada", "Instalación in-situ", "Servicio de emergencia", "Cobertura nacional"],
    image: "/placeholder.svg?height=300&width=400",
  },
]

const industries = [
  { name: "Automotriz", icon: "🚗", description: "Soldadura y gases para talleres automotrices" },
  { name: "Construcción", icon: "🏗️", description: "Herramientas y equipos para construcción" },
  { name: "Manufactura", icon: "🏭", description: "Soluciones integrales para procesos industriales" },
  { name: "Alimentaria", icon: "🍽️", description: "Gases y equipos para industria alimentaria" },
  { name: "Médica", icon: "🏥", description: "Gases medicinales y equipos especializados" },
  { name: "Metalúrgica", icon: "⚙️", description: "Soldadura y corte para industria metalúrgica" },
]

const stats = [
  { number: "5,000+", label: "Servicios Realizados", icon: Award },
  { number: "24/7", label: "Soporte Técnico", icon: Clock },
  { number: "15", label: "Estados Cubiertos", icon: Truck },
  { number: "50+", label: "Técnicos Certificados", icon: Users },
]

export default function ServiciosPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Servicios Industriales</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Soluciones técnicas especializadas para optimizar tus procesos industriales. Más deXX años de experiencia
              al servicio de la industria mexicana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                Solicitar Cotización
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors">
                Ver Casos de Éxito
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Servicios técnicos especializados para maximizar la eficiencia de tu operación
            </p>
          </div>
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  <div className="flex-1">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-blue-800" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors">
                      Más Información
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={400}
                        height={300}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Industrias que Atendemos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experiencia especializada en múltiples sectores industriales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{industry.name}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Necesitas una Solución Personalizada?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de ingenieros está listo para desarrollar la solución perfecta para tu empresa. Contáctanos
            para una consulta gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Solicitar Consulta
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors">
              Llamar Ahora
            </button>
          </div>
          <div className="flex items-center justify-center text-lg">
            <Phone className="w-6 h-6 mr-2" />
            <span>656-123-4567</span>
          </div>
        </div>
      </section>
    </main>
  )
}
