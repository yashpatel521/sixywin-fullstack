'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LiveWinnerItem } from '@/types/game';

interface GameState {
  balance: number;
  soundEnabled: boolean;
  activeBet: number;
  recentWins: LiveWinnerItem[];
  setBalance: (newBalance: number) => void;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
  toggleSound: () => void;
  setActiveBet: (amount: number) => void;
  addWinNotification: (win: LiveWinnerItem) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      balance: 10000, // Default starting chips balance
      soundEnabled: true,
      activeBet: 50,
      recentWins: [
        {
          id: 'win-1',
          username: 'ViperX',
          gameTitle: 'Cyber Wheel',
          amount: 2450,
          multiplier: '24.5x',
          timeAgo: 'Just now',
          avatar: '⚡',
        },
        {
          id: 'win-2',
          username: 'NeonQueen',
          gameTitle: 'Neon Slot 777',
          amount: 5000,
          multiplier: '100x',
          timeAgo: '2m ago',
          avatar: '👑',
        },
        {
          id: 'win-3',
          username: 'HighRoller88',
          gameTitle: 'High-Low Cards',
          amount: 1200,
          multiplier: '12x',
          timeAgo: '5m ago',
          avatar: '🔥',
        },
      ],
      setBalance: (newBalance) => set({ balance: newBalance }),
      addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
      deductBalance: (amount) => {
        const current = get().balance;
        if (current >= amount) {
          set({ balance: current - amount });
          return true;
        }
        return false;
      },
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setActiveBet: (amount) => set({ activeBet: amount }),
      addWinNotification: (win) =>
        set((state) => ({
          recentWins: [win, ...state.recentWins.slice(0, 9)],
        })),
    }),
    {
      name: 'sixywin-game-store',
    }
  )
);
