'use client';

import React from 'react';
import { ShieldCheck, Lock, Cpu, Database, CheckCircle2 } from 'lucide-react';

export const FairPlaySection: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>TRANSPARENT ENGINE</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Provably Fair Architecture</h2>
        <p className="text-slate-400 text-xs max-w-lg mx-auto">
          Built on Next.js 15 Server Actions and Drizzle ORM Supabase PostgreSQL database
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Cryptographic Server Seeds</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Every spin outcome is determined by a SHA-256 server seed generated before the bet is placed, guaranteeing zero manipulation.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Client Verifiable
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Next.js 15 Server Actions</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            No client-side math. All random number generators run isolated on server runtime handlers to eliminate browser tampering.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Isolated Runtime Logic
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Supabase PostgreSQL DB</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            All user wallet balances and spin transactions are instantly logged into Supabase tables managed via Drizzle ORM.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-purple-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> ACID Compliant Ledger
          </div>
        </div>
      </div>
    </section>
  );
};
