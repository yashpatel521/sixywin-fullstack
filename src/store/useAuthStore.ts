import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  id: string;
  username: string;
  email: string;
  sixyCoinsBalance: string;
  vipLevel: string;
}

interface AuthStore {
  user: UserState | null;
  isLoggedIn: boolean;
  setUser: (user: UserState | null) => void;
  updateBalance: (newBalance: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      updateBalance: (newBalance) =>
        set((state) => ({
          user: state.user ? { ...state.user, sixyCoinsBalance: newBalance } : null,
        })),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'sixywin_auth_session',
    }
  )
);
