export type GameId = 'fortune-wheel' | 'slot-machine' | 'high-low';

export interface GameMeta {
  id: GameId;
  title: string;
  category: 'Slots' | 'Wheel' | 'Cards' | 'Live';
  description: string;
  rtp: string;
  minBet: number;
  maxMultiplier: string;
  bgGradient: string;
  iconName: string;
  popular?: boolean;
  hot?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  walletBalance: number;
  avatarUrl?: string;
  totalWins: number;
  gamesPlayed: number;
}

export interface SpinResult {
  success: boolean;
  gameId: GameId;
  betAmount: number;
  multiplier: number;
  payout: number;
  newBalance: number;
  details?: Record<string, unknown>;
  message: string;
}

export interface LiveWinnerItem {
  id: string;
  username: string;
  gameTitle: string;
  amount: number;
  multiplier: string;
  timeAgo: string;
  avatar: string;
}
