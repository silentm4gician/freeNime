import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-primary/30 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
              FreeNime
            </h3>
            <p className="text-gray-400 text-sm">
              Mira tus series favoritas en español gratis.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rapidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  Buscar
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/genres"
                  className="text-gray-400 hover:text-purple-400 text-sm"
                >
                  Genres
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://ko-fi.com/silentM4gician"
                  className="text-gray-400 hover:text-primary text-sm"
                  target="_blank"
                >
                  Ayudar al proyecto
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/silentm4gician/FreeNime/tree/main#todo"
                  className="text-gray-400 hover:text-primary text-sm"
                  target="_blank"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=leandroGonzalezMat@gmail.com"
                  className="text-gray-400 hover:text-primary text-sm"
                  target="_blank"
                >
                  Mail
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Ninguno de los enlaces de streaming se alojan en este sitio.
                Todo el contenido se proporciona por terceros no afiliados.
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-gray-400 hover:text-primary text-sm"
                >
                  MIT Liscense
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FreeNime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
