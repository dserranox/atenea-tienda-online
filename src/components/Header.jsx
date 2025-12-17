import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuItems = [{
    label: 'Colección 2026',
    submenu: [{
      label: 'Bikinis',
      link: '/categoria/Colección 2026/Bikinis'
    }, {
      label: 'Enteras',
      link: '/categoria/Colección 2026/Enteras'
    }, {
      label: 'Partes de arriba',
      link: '/categoria/Colección 2026/Partes de arriba'
    }, {
      label: 'Partes de abajo',
      link: '/categoria/Colección 2026/Partes de abajo'
    }]
  }, {
    label: 'Complementos',
    submenu: [{
      label: 'Pañuelos',
      link: '/categoria/Complementos/Panuelos'
    }, {
      label: 'Lonas',
      link: '/categoria/Complementos/Lonas'
    }, {
      label: 'Toallas',
      link: '/categoria/Complementos/Toallas'
    }, {
      label: 'Neceser',
      link: '/categoria/Complementos/Neceser'
    }]
  }, {
    label: 'Calzado',
    submenu: [{
      label: 'Ojotas',
      link: '/categoria/Calzado/Ojotas'
    }]
  }];
  return <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Promotional Banner */}
      <div className="bg-[#F5E6D3] text-gray-800 py-2 px-4 text-center text-sm font-medium">
        ENVÍOS GRATIS A PARTIR DE $100.000
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-1 lg:flex-initial text-center">
            <img src="https://horizons-cdn.hostinger.com/cd1d2537-0bee-42c3-8d99-878b92e29966/chatgpt-image-6-dic-2025-19_23_25-kLhMZ.png" alt="Logo de Atenea Bikinis" className="w-[130px] h-[67px] mx-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            {menuItems.map((item, index) => <div key={index} className="relative group" onMouseEnter={() => setActiveSubmenu(item.submenu ? index : null)} onMouseLeave={() => setActiveSubmenu(null)}>
                {item.link ? <Link to={item.link} className="text-gray-700 hover:text-[#FF6B6B] transition-colors font-medium flex items-center gap-1">
                    {item.label}
                  </Link> : <button className="text-gray-700 hover:text-[#FF6B6B] transition-colors font-medium flex items-center gap-1">
                    {item.label}
                    {item.submenu && <ChevronDown size={16} />}
                  </button>}

                {/* Desktop Submenu */}
                {item.submenu && activeSubmenu === index && <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white shadow-lg rounded-lg py-2 min-w-[200px]">
                      {item.submenu.map((subitem, subindex) => <Link key={subindex} to={subitem.link} className="block px-4 py-2 text-gray-700 hover:bg-[#F5E6D3] hover:text-[#FF6B6B] transition-colors">
                          {subitem.label}
                        </Link>)}
                    </div>
                  </div>}
              </div>)}
          </nav>

          {/* Spacer for mobile */}
          <div className="lg:hidden w-10"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden border-t border-gray-200 overflow-hidden">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {menuItems.map((item, index) => <div key={index}>
                  {item.link ? <Link to={item.link} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-[#FF6B6B] transition-colors font-medium">
                      {item.label}
                    </Link> : <>
                      <button onClick={() => setActiveSubmenu(activeSubmenu === index ? null : index)} className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-[#FF6B6B] transition-colors font-medium">
                        {item.label}
                        <ChevronDown size={16} className={`transform transition-transform ${activeSubmenu === index ? 'rotate-180' : ''}`} />
                      </button>
                      {activeSubmenu === index && item.submenu && <div className="pl-4 space-y-2 mt-2">
                          {item.submenu.map((subitem, subindex) => <Link key={subindex} to={subitem.link} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-[#FF6B6B] transition-colors">
                              {subitem.label}
                            </Link>)}
                        </div>}
                    </>}
                </div>)}
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
export default Header;