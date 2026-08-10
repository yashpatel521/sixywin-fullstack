import React from 'react';

export default function HomePage() {
  return (
    <div className="py-12 text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
        <span>Pre-Login Header Active</span>
      </div>
      <h1 className="text-3xl font-black text-white">SIXYWIN CASINO</h1>
      <p className="text-slate-400 text-xs max-w-sm mx-auto">
        Pre-login Header created with logo, search, category pills, sound FX toggle, and LOGIN / REGISTER buttons.
      </p>
    </div>
  );
}
