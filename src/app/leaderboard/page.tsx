'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Medal, Crown, Zap, ShieldCheck } from 'lucide-react';

const TOP_PLAYERS = [
  { rank: 1, username: 'NeonKing99', totalWins: '185,400', bestMultiplier: '100x', avatar: '👑', badge: 'GOLD' },
  { rank: 2, username: 'CyberViper', totalWins: '124,500', bestMultiplier: '50x', avatar: '⚡', badge: 'SILVER' },
  { rank: 3, username: 'LuckyCharm', totalWins: '98,200', bestMultiplier: '25x', avatar: '🍀', badge: 'BRONZE' },
  { rank: 4, username: 'HighRoller88', totalWins: '65,000', bestMultiplier: '24.5x', avatar: '🔥', badge: 'TOP 5' },
  { rank: 5, username: 'FortuneSeeker', totalWins: '42,100', bestMultiplier: '20x', avatar: '💎', badge: 'TOP 5' },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Hall of Fame</span>
        </div>
        <h1 className="text-4xl font-black text-white">Top High Rollers & Winners</h1>
        <p className="text-slate-400 text-sm">Provably fair global leaderboards updated live</p>
      </div>

      <GlassCard glowColor="amber" className="p-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Player Rank</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Payout</span>
        </div>

        <div className="space-y-4">
          {TOP_PLAYERS.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-amber-400 text-lg">
                  {player.rank === 1 ? <Crown className="w-6 h-6 text-amber-400 animate-pulse" /> : `#${player.rank}`}
                </div>
                <span className="text-2xl">{player.avatar}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-base">{player.username}</p>
                    <Badge variant="jackpot">{player.badge}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Zap className="w-3 h-3 text-cyan-400" /> Best Hit: {player.bestMultiplier}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-amber-300">{player.totalWins}</span>
                <span className="text-xs font-bold text-slate-400 block">CHIPS</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
