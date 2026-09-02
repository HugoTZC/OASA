"use client"

import { Phone, Mail, Clock, MessageCircle, Headphones, Send } from "lucide-react"
import { SiteLayout } from "@/components/site-layout"
import Altcha from "@/components/altcha"
import { useEffect, useState } from "react"
import { formatPhoneNumber, mexicanWhatsAppUrl, readContactNumber } from "@/lib/contact"

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
    info: "LAND_LINE",
    description: "Llamada gratuita desde cualquier parte de México",
    available: "24/7",
  },
  // {
  //   icon: Phone,
  //   title: "Oficina Tijuana",
  //   info: "LAND_LINE",
  //   description: "Atención directa desde nuestra oficina principal",
  //   available: "Lun-Vie 8:00-18:00",
  // },
  {
    icon: Mail,
    title: "Correo General",
    info: "info@oasamexico.com",
    description: "Para consultas generales y información",
    available: "Respuesta en 24 hrs",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business",
    info: "WA_LINE",
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [contactNumbers, setContactNumbers] = useState({ landLine: "", waLine: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    setContactNumbers({
      landLine: readContactNumber("landLine"),
      waLine: readContactNumber("waLine"),
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <SiteLayout>
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Contactanos</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Estamos aquí para ayudarte. Nuestro equipo de especialistas está disponible para resolver tus dudas,
                procesar tus pedidos y brindarte el mejor servicio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Botón "Llamar Ahora" oculto temporalmente a solicitud del cliente.
                <a 
                  href="tel:656-123-4567"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block text-center"
                >
                  Llamar Ahora
                </a>
                */}                <a 
                  href={mexicanWhatsAppUrl(contactNumbers.waLine, "Hola Tiendaoasa, tengo una consulta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block text-center"
                >
                  Enviar WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">Envíanos un Mensaje</h2>
                <p className="text-xl text-gray-600">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="(656) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Selecciona un assunto</option>
                      <option value="consulta">Consulta general</option>
                      <option value="pedido">Información de pedido</option>
                      <option value="credito">Créditos y financing</option>
                      <option value="garantia">Garantías y devoluciones</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="queja">Quejas y sugerencias</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {/* ALTCHA Captcha }
                <div className="mb-6 flex justify-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <Altcha />
                  </div>
                </div>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                    ¡Gracias por tu mensaje! Te contactaremos pronto.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section> */}

        {/* Contact Methods */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Formas de Contacto</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elige el método que más te convenga para comunicarte con nosotros
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div key={index} className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-green-800" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{method.title}</h3>
                    <p className="text-2xl font-bold text-green-800 mb-2">{method.info === "LAND_LINE" ? formatPhoneNumber(contactNumbers.landLine) : method.info === "WA_LINE" ? formatPhoneNumber(contactNumbers.waLine) : method.info}</p>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Representatives */}
        {/* <section className="py-16 bg-white">
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
                    {/* Placeholder de foto oculto temporalmente; puede restaurarse si el cliente lo solicita.
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

                  {/* <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                    <a 
                      href={`tel:${rep.phone.replace(/[^0-9]/g, '')}`}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm text-center"
                    >
                      Llamar
                    </a>
                    <a 
                      href={`mailto:${rep.email}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm text-center"
                    >
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Departments */}
        {/* <section className="py-16 bg-gray-50">
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
        </section> */}

        {/* Emergency Contact */}
        {/* <section className="py-16 bg-red-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <Headphones className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Soporte de Emergencia</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Para situaciones urgentes relacionadas con gases industriales o equipos críticos, contamos con soporte 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="tel:656-123-4567"
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors inline-block"
              >
                Llamada de Emergencia
              </a>
              <a 
                href="https://wa.me/526865164283?text=URGENTE"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-red-800 transition-colors inline-block"
              >
                WhatsApp Urgente
              </a>
            </div>
            <div className="text-2xl font-bold">
              <Phone className="w-8 h-8 inline mr-2" />
              656-123-4567
            </div>
            <p className="text-red-200 mt-2">Disponible 24 horas, 7 días a la semana</p>
          </div>
        </section> */}
      </main>
    </SiteLayout>
  )
}
