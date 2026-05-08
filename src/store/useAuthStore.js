import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/supabase';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAdmin: false,

      setSession: (session) => set({ session, user: session?.user ?? null }),

      loadProfile: async () => {
        const user = get().user;
        if (!user) return;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (!error && data) {
          set({ profile: data, isAdmin: data.role === 'admin' });
        }
      },

      updateProfile: async (updates) => {
        const user = get().user;
        if (!user) return;
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();
        if (!error && data) {
          set({ profile: data });
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null, session: null, isAdmin: false });
      },
    }),
    { name: 'tstore-auth', partialize: (s) => ({ session: s.session }) }
  )
);
