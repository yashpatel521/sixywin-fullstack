'use client';

import React, { useState } from 'react';
import { Trophy, Crown, Medal, Flame, Sparkles } from 'lucide-react';

export interface LeaderboardUser {
  rank: number;
  username: string;
  winnings: string;
  vipTier: string;
  game: string;
  badge: string;
}

export const LeaderboardWidget: React.FC = () => {
  const [filter, setFilter] = useState<'DAILY' | 'ALL_TIME'>('DAILY');

  const dailyLeaders: LeaderboardUser[] = [
    { rank: 1, username: '@crypto_whale', winnings: '1,450,000 SC', vipTier: 'PLATINUM VIP', game: '6/49 Lottery', badge: '🥇' },
    { rank: 2, username: '@gold_viper', winnings: '890,200 SC', vipTier: 'GOLD VIP', game: 'Cyber Fortune', badge: '🥈' },
    { rank: 3, username: '@highroller_7', winnings: '620,000 SC', vipTier: 'SILVER VIP', game: 'Double Trouble', badge: '🥉' },
    { rank: 4, username: '@lucky_champ', winnings: '450,100 SC', vipTier: 'BRONZE VIP', game: '6/49 Lottery', badge: '4' },
    { rank: 5, username: '@spin_master', winnings: '310,500 SC', vipTier: 'BRONZE VIP', game: 'Minesweeper', badge: '5' },
  ];

  const allTimeLeaders: LeaderboardUser[] = [
    { rank: 1, username: '@satoshi_king', winnings: '12,500,000 SC', vipTier: 'DIAMOND VIP', game: '6/49 Jackpot', badge: '🥇' },
    { rank: 2, username: '@crypto_whale', winnings: '8,420,000 SC', vipTier: 'PLATINUM VIP', game: '6/49 Lottery', badge: '🥈' },
    { rank: 3, username: '@gold_phoenix', winnings: '5,100,000 SC', vipTier: 'PLATINUM VIP', game: 'Cyber Fortune', badge: '🥉' },
    { rank: 4, username: '@gold_viper', winnings: '3,890,000 SC', vipTier: 'GOLD VIP', game: 'Double Trouble', badge: '4' },
    { rank: 5, username: '@apex_gambler', winnings: '2,950,000 SC', vipTier: 'GOLD VIP', game: '6/49 Lottery', badge: '5' },
  ];

  const leaders = filter === 'DAILY' ? dailyLeaders : allTimeLeaders;

  return (
    <div className="w-full rounded-3xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-5 sm:p-6 shadow-[0_20px_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl space-y-4">
      {/* Header & Filter Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#9c663b]/30 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#e6ca65] animate-pulse" />
          <div>
            <span className="text-[10px] font-mono text-[#e6ca65] font-extrabold uppercase tracking-widest block">
              ARENA HIGH-ROLLERS
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#faf6f0]">
              Live Leaderboard Rankings
            </h3>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40">
          <button
            onClick={() => setFilter('DAILY')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              filter === 'DAILY'
                ? 'bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black'
                : 'text-[#b5a391] hover:text-[#faf6f0]'
            }`}
          >
            DAILY TOP
          </button>
          <button
            onClick={() => setFilter('ALL_TIME')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              filter === 'ALL_TIME'
                ? 'bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black'
                : 'text-[#b5a391] hover:text-[#faf6f0]'
            }`}
          >
            ALL-TIME
          </button>
        </div>
      </div>

      {/* Leaderboard Ranks List */}
      <div className="space-y-2">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              leader.rank === 1
                ? 'bg-gradient-to-r from-[#281d14] via-[#18120e] to-[#0c0a09] border-[#e6ca65] shadow-lg shadow-[#e6ca65]/10 scale-[1.01]'
                : leader.rank === 2
                ? 'bg-[#18120e]/80 border-[#e6ca65]/60'
                : leader.rank === 3
                ? 'bg-[#18120e]/60 border-[#e6ca65]/40'
                : 'bg-[#0c0a09]/80 border-[#9c663b]/30'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-black font-mono shadow-sm ${
                  leader.rank === 1
                    ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border border-[#faf6f0]'
                    : leader.rank === 2
                    ? 'bg-[#c0c0c0] text-[#0c0a09] font-bold'
                    : leader.rank === 3
                    ? 'bg-[#cd7f32] text-[#faf6f0] font-bold'
                    : 'bg-[#18120e] text-[#b5a391] border border-[#9c663b]/30 text-xs'
                }`}
              >
                {leader.badge}
              </div>

              {/* Username & VIP Tier */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-[#faf6f0]">
                    {leader.username}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#e6ca65] px-1.5 py-0.5 rounded bg-[#e6ca65]/10 border border-[#e6ca65]/30">
                    {leader.vipTier}
                  </span>
                </div>
                <span className="text-[10px] text-[#b5a391] block">
                  Game: <strong className="text-[#faf6f0] font-bold">{leader.game}</strong>
                </span>
              </div>
            </div>

            {/* Total Winnings Readout */}
            <div className="text-right">
              <span className="text-xs sm:text-sm font-mono font-black text-[#e6ca65] block">
                {leader.winnings}
              </span>
              <span className="text-[9px] font-mono text-[#b5a391] uppercase">TOTAL WON</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
