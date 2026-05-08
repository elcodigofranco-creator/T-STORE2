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

      loginWithCode: async (code) => {
        set({ isLoading: true });
        try {
          // Sign in via Supabase Auth
          const { data, error } = await supabase.auth.signInWithPassword({
            email: `${code}@t-store.local`,
            password: code,
          });
          if (error) throw error;
          get().setSession(data.session);
          await get().loadProfile();
        } catch (err) {
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async ({ email, password, profile }) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: profile },
          });
          if (error) throw error;
          return data;
        } finally {
          set({ isLoading: false });
        }
      },

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
