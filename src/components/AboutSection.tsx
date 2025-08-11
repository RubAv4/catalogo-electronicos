import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-[80rem] px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h2 className="text-2xl font-bold">Sobre mí</h2>
        <p className="text-gray-600 mt-2">
          Hola, soy Ruberth. En este espacio encontraras componentes electrónicos para
          proyectos DIY y educativos.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Contacto</h3>
            <ul className="space-y-1">
              <li>📧 </li>
              <li>📞 +51 978 394 103</li>
              <li>📍 Chimbote, Perú</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Redes</h3>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ru.aval/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group rounded-full w-10 h-10 grid place-items-center text-white
                 bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500
                 shadow hover:shadow-md transition"
                title="@tu_usuario"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/rub.aval/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group rounded-full w-10 h-10 grid place-items-center text-white
                 bg-[#1877F2] shadow hover:shadow-md transition"
                title="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ruberth-j-avalos-gamez-05aa7a360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group rounded-full w-10 h-10 grid place-items-center text-white
                 bg-[#0A66C2] shadow hover:shadow-md transition"
                title="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/51978394103" /* cambia por tu número con código de país */
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group rounded-full w-10 h-10 grid place-items-center text-white
                 bg-[#25D366] shadow hover:shadow-md transition"
                title="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
