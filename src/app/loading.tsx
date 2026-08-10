import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121624] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  );
}
