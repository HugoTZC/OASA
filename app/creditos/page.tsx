import { CheckCircle, Clock, Shield, Users, Calculator, FileText, Phone, Mail } from "lucide-react"

const creditBenefits = [
  {
    icon: Clock,
    title: "Aprobación Rápida",
    description: "Respuesta en menos de 24 horas hábiles",
  },
  {
    icon: Shield,
    title: "Proceso Seguro",
    description: "Información protegida con los más altos estándares",
  },
  {
    icon: Users,
    title: "Asesoría Personalizada",
    description: "Ejecutivo dedicado para tu cuenta",
  },
  {
    icon: Calculator,
    title: "Términos Flexibles",
    description: "Plazos y condiciones adaptadas a tu negocio",
  },
]

const creditPlans = [
  {
    name: "Crédito Básico",
    limit: "$50,000",
    term: "30 días",
    features: ["Sin intereses", "Aprobación inmediata", "Ideal para compras pequeñas"],
    recommended: false,
  },
  {
    name: "Crédito Empresarial",
    limit: "$200,000",
    term: "60 días",
    features: ["Tasa preferencial", "Línea renovable", "Descuentos por volumen", "Asesor dedicado"],
    recommended: true,
  },
  {
    name: "Crédito Industrial",
    limit: "$500,000+",
    term: "90 días",
    features: ["Tasa corporativa", "Términos personalizados", "Financiamiento de proyectos", "Soporte técnico"],
    recommended: false,
  },
]

const requirements = [
  "Identificación oficial vigente",
  "Comprobante de domicilio (no mayor a 3 meses)",
  "RFC con homoclave",
  "Estados financieros (últimos 2 años)",
  "Referencias comerciales (mínimo 3)",
  "Comprobante de ingresos",
]

export default function CreditosPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Soluciones de Crédito</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Impulsa tu negocio con nuestras opciones de financiamiento flexibles. Más deXX años respaldando el
              crecimiento de empresas mexicanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                Solicitar Crédito
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors">
                Calcular Cuota
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">¿Por Qué Elegir Nuestro Crédito?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos las mejores condiciones del mercado con un servicio personalizado
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creditBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-green-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credit Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Planes de Crédito</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a las necesidades de tu empresa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {creditPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.recommended ? "ring-4 ring-green-500 transform scale-105" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="bg-green-500 text-white text-center py-2 font-bold">Más Popular</div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-green-800">{plan.limit}</span>
                    <span className="text-gray-600 ml-2">límite de crédito</span>
                  </div>
                  <div className="mb-6">
                    <span className="text-lg font-semibold text-gray-700">Plazo: {plan.term}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${
                      plan.recommended
                        ? "bg-green-800 text-white hover:bg-green-900"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Solicitar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Requisitos</h2>
              <p className="text-xl text-gray-600">Documentos necesarios para tu solicitud de crédito</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                  <FileText className="w-6 h-6 text-green-800 mr-4" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Impulsar tu Negocio?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de especialistas está listo para ayudarte a encontrar la mejor solución de crédito para tu
            empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
              Solicitar Crédito
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-800 transition-colors">
              Hablar con un Asesor
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-lg">
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-2" />
              <span>656-123-4567</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 mr-2" />
              <span>creditos@tiendaoasa.com</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
