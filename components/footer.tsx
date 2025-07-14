import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* OASA Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 sm:mb-4">OASA</h3>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4">
              Con más de XX años de experiencia brindándote lo mejor en:
            </p>
            <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
              <li>• Gases industriales</li>
              {/* <li>• Autopartes</li> */}
              <li>• Herramientas</li>
              <li>• Equipos de soldadura</li>
            </ul>
          </div>

          {/* MENÚ Column */}
          <div>
            <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 sm:mb-4">MENÚ</h3>
            <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-yellow-400 block">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-yellow-400 block">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-yellow-400 block">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-yellow-400 block">
                  Información de Envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-yellow-400 block">
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* PROMOCIONES Column */}
          <div>
            <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 sm:mb-4">PROMOCIONES</h3>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4">
              Suscríbete a nuestro boletín y recibe promociones y precios especiales.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="#" className="hover:text-yellow-400">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 sm:mb-4">CONTACTO</h3>
            <div className="text-xs sm:text-sm space-y-1 sm:space-y-2">
              <p>📞 800-123-4567</p>
              <p>📞 (656) 123-4567</p>
              <p>✉️ info@oasamexico.com</p>
              <p>📍 Juarez, Chihuahua</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm">
          <p>&copy; 2025 OASA - La tienda de los expertos. Todos los derechos reservados.</p>
          {/* Temporary Admin Access Link */}
          <div className="mt-2">
            {/* <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 underline">
              🔧 Admin Panel
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
