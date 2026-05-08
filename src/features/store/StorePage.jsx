import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { storeService } from '../../services/store.service';
import { useCartStore } from '../../store/useCartStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useUIStore } from '../../store/useUIStore';
import { RARITY_COLORS, PRODUCT_CATEGORIES } from '../../config/constants';

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const addItem = useCartStore((s) => s.addItem);
  const cristales = usePlayerStore((s) => s.cristales);
  const pushToast = useUIStore((s) => s.pushToast);

  const { data: products, loading } = useSupabaseQuery(
    () => storeService.getProducts(),
    []
  );

  const filtered = products?.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedRarity !== 'all' && p.rarity !== selectedRarity) return false;
    return true;
  }) || [];

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="font-cinzel text-2xl font-black text-gold-gradient mb-6">
        🛒 Tienda del Templo
      </h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-cinzel text-[10px] tracking-[2px] uppercase
            transition-all ${selectedCategory === 'all'
              ? 'bg-gold/10 text-gold-light border border-gold/20'
              : 'text-purple-muted border border-transparent hover:border-purple/20'
            }`}
        >
          Todo
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-cinzel text-[10px] tracking-[2px] uppercase
              transition-all ${selectedCategory === cat
                ? 'bg-gold/10 text-gold-light border border-gold/20'
                : 'text-purple-muted border border-transparent hover:border-purple/20'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-purple-muted">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const rarity = RARITY_COLORS[product.rarity] || RARITY_COLORS.common;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br from-dark-400/90 to-dark-800/90 
                  border ${rarity.border}/20 rounded-xl overflow-hidden
                  hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300`}
              >
                {/* Image Placeholder */}
                <div className="h-36 bg-dark-500/50 flex items-center justify-center text-4xl">
                  {product.asset_url ? (
                    <img src={product.asset_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    '🎁'
                  )}
                </div>
                <div className="p-3">
                  <span className={`text-[9px] font-cinzel tracking-[1px] uppercase ${rarity.text}`}>
                    {rarity.label}
                  </span>
                  <h3 className="font-cinzel text-sm text-gold-light mt-1 mb-2 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs text-purple-light">
                      💜 {product.price_cristales || product.price_coins}
                    </span>
                    <button
                      onClick={() => addItem(product)}
                      className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-md 
                        font-cinzel text-[9px] tracking-[1px] text-gold-light uppercase
                        hover:bg-gold/20 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-purple-muted">
          No hay productos disponibles en esta categoría.
        </div>
      )}
    </div>
  );
}
