import { supabase } from './supabase';

export const missionsService = {
  getActiveMissions: async () => {
    const { data, error } = await supabase
      .from('missions')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data;
  },

  getUserMissions: async (userId) => {
    const { data, error } = await supabase
      .from('user_missions')
      .select('*, missions(*)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  claimReward: async (userMissionId) => {
    const { data, error } = await supabase
      .from('user_missions')
      .update({ reward_claimed: true, completed_at: new Date().toISOString() })
      .eq('id', userMissionId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
