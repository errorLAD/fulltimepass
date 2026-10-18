import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating ring */}
        <div className="w-20 h-20 rounded-3xl bg-amber-400/20 animate-ping absolute" />
        
        {/* Core animated flame card */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/25 relative animate-bounce">
          <span className="text-3xl select-none">🔥</span>
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Loading Timepass... 🍿
        </h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Gathering the freshest punchlines, memes, and roast templates...
        </p>
      </div>

      {/* Subtle skeleton bar */}
      <div className="mt-6 w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-2/3 animate-pulse" />
      </div>
    </div>
  );
}
