import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-black min-h-[70vh] flex flex-col items-center justify-center text-center py-12 space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
        <span>Full Black Background Active</span>
      </div>
      <h1 className="text-3xl font-black text-white">SIXYWIN CASINO</h1>
      <p className="text-slate-400 text-xs max-w-sm mx-auto">
        Solid pure black background (#000000) applied across application layout, navbar, and page body.
      </p>
    </div>
  );
}
