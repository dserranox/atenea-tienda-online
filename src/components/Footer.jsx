import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-[#F5E6D3] border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div>
            <img src="https://horizons-cdn.hostinger.com/cd1d2537-0bee-42c3-8d99-878b92e29966/chatgpt-image-6-dic-2025-19_19_49-1bAeN.png" alt="Logo de Atenea Bikinis" className="w-[130px] h-[67px] mx-auto object-contain" />
            <p className="text-gray-600 mt-4 text-sm">
              Trajes de baño de alta calidad para mujeres que aman el verano.
            </p>
          </div>

          {/* Contact */}
          <div>
            <span className="font-semibold text-gray-800 block mb-4">Contacto</span>
            <div className="space-y-3">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                <MapPin size={16} />
                <span>San Francisco, Córdoba, Argentina</span>
              </a>
              <a href="https://wa.me/5493564517250" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                <Phone size={16} />
                <span>+54 9 3564 51-7250</span>
              </a>
              <a href="https://instagram.com/atenea_bikiinis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                <Instagram size={16} />
                <span>@atenea_bikiinis</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="font-semibold text-gray-800 block mb-4">Navegación</span>
            <nav className="space-y-2">
              <Link to="/categoria/Colección 2026" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Colección 2026
              </Link>
              <Link to="/categoria/Nuevos ingresos" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Nuevos ingresos
              </Link>
              <Link to="/categoria/Accesorios" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Accesorios
              </Link>
              <Link to="/categoria/Sandalias" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Sandalias
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <span className="font-semibold text-gray-800 block mb-4">Información</span>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Sobre nosotros
              </Link>
              <Link to="/" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Envíos
              </Link>
              <Link to="/" className="block text-gray-600 hover:text-[#FF6B6B] transition-colors text-sm">
                Cambios y devoluciones
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Atenea Bikinis. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;