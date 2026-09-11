import React from 'react';
import { Terminal } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-8 sm:p-10 text-center shadow-md space-y-3">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400">
        <Terminal className="w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-md mx-auto space-y-1">
        <h3 className="text-sm sm:text-base font-semibold text-white font-mono">
          Understanding your research question...
        </h3>
        <p className="text-xs text-slate-400">
          Decomposing hypothesis into instrument, entry rules, and identifying parameters requiring clarification.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Strict parsing in progress</span>
      </div>
    </div>
  );
}
