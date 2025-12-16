import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.color && (
            <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-[0.7rem] font-semibold text-gray-800 shadow-sm">
              {product.color}
            </div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-gray-800 font-medium group-hover:text-[#FF6B6B] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{product.category}</p>
          <p className="text-[#FF6B6B] font-bold mt-2">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;