import { supabase } from './supabase';

export const adminService = {
  // ── Users ──
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  depositCristales: async (userId, amount, reason) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('cristales')
      .eq('id', userId)
      .single();

    const newAmount = (profile?.cristales || 0) + amount;

    const { data, error } = await supabase
      .from('profiles')
      .update({ cristales: newAmount })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  revokeAccess: async (userId) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('id', userId);
    if (error) throw error;
  },

  // ── Missions ──
  createMission: async (missionData) => {
    const { data, error } = await supabase
      .from('missions')
      .insert(missionData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  updateMission: async (id, updates) => {
    const { data, error } = await supabase
      .from('missions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  toggleMission: async (id, isActive) => {
    const { data, error } = await supabase
      .from('missions')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteMission: async (id) => {
    const { error } = await supabase
      .from('missions')
      .update({ is_active: false })
      .eq('id', id);
    if (error) throw error;
  },

  // ── Products ──
  createProduct: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  updateProduct: async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  toggleProduct: async (id, isActive) => {
    const { data, error } = await supabase
      .from('products')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // ── Stats ──
  getDashboardStats: async () => {
    const [users, cristales, orders, missions] = await Promise.all([
      supabase.from('profiles').select('id').eq('is_active', true),
      supabase.from('profiles').select('cristales'),
      supabase.from('orders').select('id'),
      supabase.from('missions').select('id').eq('is_active', true),
    ]);

    return {
      totalUsers: users.data?.length || 0,
      totalCristales: cristales.data?.reduce((sum, u) => sum + (u.cristales || 0), 0) || 0,
      totalOrders: orders.data?.length || 0,
      totalMissions: missions.data?.length || 0,
    };
  },

  // ── Access Codes ──
  generateCodes: async (count) => {
    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      const { data } = await supabase
        .from('access_codes')
        .insert({ code, is_used: false })
        .select()
        .single();
      if (data) codes.push(data);
    }
    return codes;
  },

  getUnusedCodes: async () => {
    const { data, error } = await supabase
      .from('access_codes')
      .select('*')
      .eq('is_used', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // ── Assets ──
  uploadAsset: async (file, category) => {
    const fileName = `${category}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('t-store-assets')
      .upload(fileName, file);
    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('t-store-assets')
      .getPublicUrl(fileName);

    const { data: manifest } = await supabase
      .from('asset_manifest')
      .insert({ key: file.name.split('.')[0], category, url: urlData.publicUrl })
      .select()
      .single();

    return manifest;
  },

  getAssets: async () => {
    const { data, error } = await supabase
      .from('asset_manifest')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;
    return data;
  },
};
