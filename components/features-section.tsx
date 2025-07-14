import { Shield, Phone, Truck, DollarSign } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Pago seguro",
    description: "Las transacciones podrán ser efectuadas por medio de Openpay, Mercado pago o PayPal.",
  },
  {
    icon: Phone,
    title: "(656) 123-4567",
    description: "Atención a Clientes",
  },
  {
    icon: Truck,
    title: "Envíos a domicilio",
    description: "A la puerta de tu negocio",
  },
  {
    icon: DollarSign,
    title: "El Precio más bajo",
    description: "Garantizado por escrito",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-6 sm:py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-3 p-3 sm:p-0"
              >
                <div className="flex-shrink-0">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
