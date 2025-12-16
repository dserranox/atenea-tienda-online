import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5493564517250?text=Hola!%20Quisiera%20consultar%20por%20un%20producto"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-shadow border-2 border-white">
        {/* LOGO WHATSAPP OFICIAL - vector exacto */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.01 3C9.38 3 4 8.37 4 15c0 2.3.62 4.46 1.8 6.39L4 29l7.77-1.77A12.8 12.8 0 0 0 16.01 27c6.63 0 12-5.37 12-12s-5.37-12-12-12zM16 25a10 10 0 0 1-5.1-1.4l-.37-.21-4.46 1.02 1.18-4.35-.24-.39A9.96 9.96 0 1 1 16 25zm5.3-7.1c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.64.15-.19.3-.73.97-.9 1.17-.17.2-.33.22-.62.07-.29-.15-1.22-.45-2.33-1.43-.86-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.14-.14.3-.37.44-.56.15-.19.2-.33.3-.55.1-.22.05-.4-.02-.56-.07-.15-.62-1.49-.85-2.04-.22-.55-.44-.47-.64-.48l-.55-.01c-.19 0-.5.07-.76.35-.26.27-1 1-1 2.43 0 1.43 1.03 2.82 1.17 3.01.15.19 2.03 3.1 4.9 4.34.68.29 1.21.46 1.62.59.68.21 1.3.18 1.8.11.55-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.21-.57-.36z"/>
        </svg>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;