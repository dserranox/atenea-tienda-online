import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colors = ['Coral', 'Blanco', 'Arena', 'Aqua'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Única'];

  useEffect(() => {
    fetchProducts();
  }, [category, subcategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*').gt('price', 0);

      if (subcategory) {
        query = query.eq('subcategory', subcategory);
      } else {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const filteredProducts = products.filter((product) => {
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.color);
    const sizeMatch =
      selectedSizes.length === 0 ||
      (product.size && product.size.split(',').some((s) => selectedSizes.includes(s.trim())));
    return colorMatch && sizeMatch;
  });

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
              />
              <Label
                htmlFor={`color-${color}`}
                className="text-sm text-gray-700 font-normal cursor-pointer"
              >
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Talle</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => toggleSize(size)}
              />
              <Label
                htmlFor={`size-${size}`}
                className="text-sm text-gray-700 font-normal cursor-pointer"
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {(selectedColors.length > 0 || selectedSizes.length > 0) && (
        <Button
          variant="outline"
          onClick={() => {
            setSelectedColors([]);
            setSelectedSizes([]);
          }}
          className="w-full"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{subcategory || category} - Atenea Swimwear</title>
        <meta
          name="description"
          content={`Explora nuestra colección de ${subcategory || category}. Encuentra el traje de baño perfecto para ti.`}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {subcategory || category}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              variant="outline"
              className="w-full"
            >
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-4 p-4 border rounded-lg bg-white"
              >
                <FilterSection />
              </motion.div>
            )}
          </div>

          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h2>
              <FilterSection />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg aspect-[3/4]"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No se encontraron productos con estos filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;