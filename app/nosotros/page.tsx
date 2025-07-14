import Image from "next/image"
import { Users, Award, Clock, Globe, Target, Heart, Zap, Shield } from "lucide-react"
import { SiteLayout } from "@/components/site-layout"

const stats = [
  { number: "70+", label: "Años de Experiencia", icon: Clock },
  { number: "50,000+", label: "Clientes Satisfechos", icon: Users },
  { number: "15", label: "Sucursales", icon: Globe },
  { number: "10,000+", label: "Productos", icon: Award },
]

const values = [
  {
    icon: Target,
    title: "Excelencia",
    description: "Nos comprometemos a ofrecer productos y servicios de la más alta calidad.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Estamos dedicados al éxito y crecimiento de nuestros clientes.",
  },
  {
    icon: Zap,
    title: "Innovación",
    description: "Adoptamos las últimas tecnologías para mejorar continuamente.",
  },
  {
    icon: Shield,
    title: "Confianza",
    description: "Construimos relaciones duraderas basadas en la transparencia.",
  },
]

const timeline = [
  {
    year: "1954",
    title: "Fundación",
    description: "OASA inicia operaciones como una pequeña empresa familiar especializada en gases industriales.",
  },
  {
    year: "1980",
    title: "Expansión",
    description: "Ampliamos nuestro catálogo incluyendo autopartes y herramientas especializadas.",
  },
  {
    year: "2000",
    title: "Modernización",
    description: "Implementamos sistemas digitales y abrimos nuestras primeras sucursales regionales.",
  },
  {
    year: "2020",
    title: "Transformación Digital",
    description: "Lanzamos nuestra plataforma e-commerce y servicios de entrega a domicilio.",
  },
]

const team = [
  {
    name: "Carlos Mendoza",
    position: "Director General",
    image: "/placeholder.svg?height=300&width=300",
    description: "Con más de 25 años de experiencia en la industria.",
  },
  {
    name: "Ana García",
    position: "Directora de Operaciones",
    image: "/placeholder.svg?height=300&width=300",
    description: "Especialista en logística y cadena de suministro.",
  },
  {
    name: "Roberto Silva",
    position: "Director Técnico",
    image: "/placeholder.svg?height=300&width=300",
    description: "Ingeniero con expertise en gases industriales.",
  },
]

export default function NosotrosPage() {
  return (
    <SiteLayout>
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Nosotros Somos OASA</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Durante más deXX años, hemos sido la tienda de los expertos, brindando soluciones integrales en gases
                industriales y herramientas especializadas para impulsar el crecimiento de nuestros
                clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                  Conoce Nuestros Productos
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors">
                  Contáctanos
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

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">Nosotros</h1>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Nuestra Historia</h2>
                  <p className="text-gray-700 mb-4">
                    Con más deXX años de experiencia en el mercado, OASA se ha consolidado como la empresa líder en la
                    distribución de gases industriales, autopartes, herramientas y equipos de soldadura en México.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Fundada en 1950, hemos crecido de ser una pequeña empresa familiar a convertirnos en la referencia
                    nacional para profesionales y empresas que buscan calidad y confiabilidad.
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Datos Importantes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Más deXX años de experiencia</li>
                    <li>• Presencia en todo México</li>
                    <li>• Más de 50,000 productos</li>
                    <li>• Certificaciones internacionales</li>
                    <li>• Servicio técnico especializado</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Nuestros Valores</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Calidad</h3>
                    <p className="text-gray-700">
                      Ofrecemos productos de la más alta calidad, respaldados por las mejores marcas internacionales.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Confianza</h3>
                    <p className="text-gray-700">
                      Construimos relaciones duraderas basadas en la confianza y el servicio excepcional.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Innovación</h3>
                    <p className="text-gray-700">
                      Constantemente buscamos nuevas tecnologías y soluciones para nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Nuestra Misión</h2>
                <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-gray-700 text-lg">
                    Ser el socio estratégico de nuestros clientes, proporcionando soluciones integrales en gases
                    industriales, autopartes, herramientas y equipos de soldadura, con el más alto nivel de calidad y
                    servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-gray-900">Nuestra Misión</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Ser el socio estratégico de nuestros clientes, proporcionando productos de calidad superior, servicios
                  especializados y soluciones innovadoras que impulsen su productividad y éxito en los sectores
                  industrial y automotriz.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Nuestra Visión</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Consolidarnos como la empresa líder en México en la distribución de gases industriales, autopartes y
                  herramientas especializadas, reconocida por nuestra excelencia en servicio y compromiso con la
                  innovación.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="OASA Mission"
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestros Valores</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los principios que guían cada decisión y acción en OASA
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-blue-800" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestra Historia</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Más de siete décadas construyendo confianza y excelencia
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <div className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold">{item.year}</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-800 rounded-full mt-2 mr-8"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Nuestro Equipo</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Profesionales comprometidos con la excelencia y el servicio
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                    <p className="text-blue-800 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">¿Listo para Trabajar con Nosotros?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a miles de clientes que confían en OASA para sus necesidades industriales y automotrices. Descubre
              por qué somos la tienda de los expertos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                Ver Catálogo
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors">
                Solicitar Cotización
              </button>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
