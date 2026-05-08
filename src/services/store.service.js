import { supabase } from './supabase';

export const storeService = {
  getProducts: async (filters = {}) => {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.rarity) {
      query = query.eq('rarity', filters.rarity);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  getProduct: async (slug) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  },

  purchase: async (userId, items, total) => {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        items: JSON.stringify(items),
        total_cristales: total,
        status: 'completed',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
