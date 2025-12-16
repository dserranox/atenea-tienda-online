import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchImages();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id)
        .order('priority', { ascending: true });

      if (error) throw error;
      
      setImages(data || []);
      if (data && data.length > 0 && !selectedImage) {
        setSelectedImage(data[0].image_url);
      } else if (data && data.length > 0) {
        // Keep current selected if it still exists, else first
        const exists = data.find(img => img.image_url === selectedImage);
        if (!exists) setSelectedImage(data[0].image_url);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 animate-pulse rounded-lg aspect-square"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-6 w-1/4 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-24 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
        <Link to="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hola! Quisiera consultar por ${product.name}`;
  const whatsappLink = `https://wa.me/5493564517250?text=${encodeURIComponent(whatsappMessage)}`;
  const displayImage = selectedImage || product.image_url;

  return (
    <>
      <Helmet>
        <title>{product.name} - Atenea Swimwear</title>
        <meta name="description" content={product.description || `Compra ${product.name} en Atenea Swimwear`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#FF6B6B] transition-colors">
            Inicio
          </Link>
          <ChevronRight size={16} />
          <Link
            to={`/categoria/${product.category}`}
            className="hover:text-[#FF6B6B] transition-colors"
          >
            {product.category}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight size={16} />
              <Link
                to={`/categoria/${product.category}/${product.subcategory}`}
                className="hover:text-[#FF6B6B] transition-colors"
              >
                {product.subcategory}
              </Link>
            </>
          )}
          <ChevronRight size={16} />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative rounded-lg overflow-hidden shadow-lg aspect-[3/4] bg-gray-100"
            >
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === img.image_url 
                        ? 'border-[#FF6B6B] ring-2 ring-[#FF6B6B]/20' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img.image_url} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-[#FF6B6B]">
                ${product.price.toLocaleString('es-AR')}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.color && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">Color</h2>
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-full">
                  {product.color}
                </div>
              </div>
            )}

            {product.size && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">Talles disponibles</h2>
                <div className="flex flex-wrap gap-2">
                  {product.size.split(',').map((size, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {size.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6">
              <Button
                asChild
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} className="mr-2" />
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>

            <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
              <p>✓ Envío gratis en compras superiores a $100.000</p>
              <p>✓ Materiales de alta calidad con protección UV</p>
              <p>✓ Consulta por cambios y devoluciones</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;