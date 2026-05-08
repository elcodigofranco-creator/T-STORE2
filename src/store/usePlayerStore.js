import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/supabase';
import { useAuthStore } from './useAuthStore';

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      playerClass: null,
      rank: 'Bronce',
      cristales: 0,
      avatar: null,
      skoolName: '',
      templarioName: '',

      setPlayerData: (data) => set(data),

      addXP: async (amount) => {
        const current = get();
        let newXP = current.xp + amount;
        let newLevel = current.level;
        let newXPToNext = current.xpToNextLevel;

        while (newXP >= newXPToNext) {
          newXP -= newXPToNext;
          newLevel++;
          newXPToNext = Math.floor(newXPToNext * 1.5);
        }

        set({ xp: newXP, level: newLevel, xpToNextLevel: newXPToNext });

        // Sync to Supabase
        const user = useAuthStore.getState().user;
        if (user) {
          await supabase
            .from('profiles')
            .update({ level: newLevel, xp: newXP, rank: get().rank })
            .eq('id', user.id);
        }

        return { leveledUp: newLevel > current.level, newLevel };
      },

      addCristales: async (amount) => {
        const newAmount = get().cristales + amount;
        set({ cristales: newAmount });

        const user = useAuthStore.getState().user;
        if (user) {
          await supabase
            .from('profiles')
            .update({ cristales: newAmount })
            .eq('id', user.id);
        }
      },

      reset: () => set({
        level: 1, xp: 0, xpToNextLevel: 100,
        playerClass: null, rank: 'Bronce',
        cristales: 0, avatar: null,
        skoolName: '', templarioName: '',
      }),
    }),
    { name: 'tstore-player' }
  )
);
