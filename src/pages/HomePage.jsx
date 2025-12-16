import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/customSupabaseClient';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('destacado', true) 
        .limit(8);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Atenea Bikinis - Trajes de Baño Femeninos</title>
        <meta
          name="description"
          content="Descubre la nueva colección 2026 de trajes de baño Atenea. Bikinis, mallas enteras y accesorios de alta calidad."
        />
      </Helmet>

      {/* Hero Carousel */}
      <ProductCarousel />

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Explora nuestras categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/categoria/Colección 2026"
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-100"
            >
              <img
                src="https://iwguxyfertnxkvnqwzrz.supabase.co/storage/v1/object/public/Atenea-photos/destacados/conjunto.jpeg?w=800"
                alt="Colección 2026"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-2xl font-bold">Colección 2026</h3>
                  <p className="text-white/90 mt-2">Descubre lo último</p>
                </div>
              </div>
            </Link>

            <Link
              to="/categoria/Complementos"
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-100"
            >
              <img
                src="https://iwguxyfertnxkvnqwzrz.supabase.co/storage/v1/object/public/Atenea-photos/destacados/toallas.jpeg?w=800"
                alt="Complementos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-2xl font-bold">Complementos</h3>
                  <p className="text-white/90 mt-2">Complementa tu look</p>
                </div>
              </div>
            </Link>

            <Link
              to="/categoria/Calzado"
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-100"
            >
              <img
                src="https://iwguxyfertnxkvnqwzrz.supabase.co/storage/v1/object/public/Atenea-photos/destacados/ojotasprint.jpeg?w=800"
                alt="Calzado"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-2xl font-bold">Calzado</h3>
                  <p className="text-white/90 mt-2">El complemento para tus pies</p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#F5E6D3] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Productos destacados
            </h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-[3/4]"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Bienvenida a Atenea
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Descubre nuestra colección de trajes de baño diseñados especialmente para mujeres que
            buscan estilo, comodidad y calidad. Cada pieza está confeccionada con materiales
            premium y diseños únicos que resaltan tu belleza natural.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;