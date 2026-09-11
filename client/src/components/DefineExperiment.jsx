import React from 'react';
import { ArrowRight, ArrowLeft, Edit3, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function DefineExperiment({
  experiment,
  onEdit,
  onEditQuestion,
  onProceedToFinal,
}) {
  const instrument = experiment?.instrument || 'NIFTY';
  const timeframe = experiment?.timeframe || 'Daily';
  const entryCondition = experiment?.entryCondition || `${instrument} falls >= 1%`;
  const holdingPeriod = experiment?.holdingPeriod || '3 days';
  const exitCondition = experiment?.exitCondition || `After ${holdingPeriod} trading days`;
  const filters = experiment?.filters || [];
  const researchQuestion = experiment?.researchQuestion || 'Does buying NIFTY after a 1% fall have an edge?';

  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              Section 4 • Define
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Hypothesis Model
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white m-0">
            Your Structured Experiment
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>All Parameters Confirmed</span>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Review your experiment parameters below. You can go back to adjust variables or proceed to generate the final export specification.
      </p>

      {/* Research Question Banner */}
      <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5">
        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block mb-1">
          Research Question
        </span>
        <p className="text-sm font-mono text-slate-200 m-0">
          &ldquo;{researchQuestion}&rdquo;
        </p>
      </div>

      {/* Structured Parameter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Market */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Market</span>
          <span className="text-sm font-mono font-semibold text-white mt-1">{instrument}</span>
        </div>

        {/* Timeframe */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Timeframe</span>
          <span className="text-sm font-mono font-semibold text-white mt-1">{timeframe}</span>
        </div>

        {/* Entry Condition */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 sm:col-span-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Entry Condition</span>
          <span className="text-sm font-mono font-semibold text-emerald-300 block mt-1">{entryCondition}</span>
        </div>

        {/* Holding Period */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Holding Period</span>
          <span className="text-sm font-mono font-semibold text-sky-300 mt-1">{holdingPeriod}</span>
        </div>

        {/* Exit Condition */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Exit Condition</span>
          <span className="text-sm font-mono font-semibold text-amber-300 mt-1">{exitCondition}</span>
        </div>

        {/* Filters */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3.5 sm:col-span-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Filters</span>
          <span className="text-xs font-mono text-slate-300 block mt-1">
            {filters && filters.length > 0 ? filters.join(', ') : 'None'}
          </span>
        </div>
      </div>

      {/* Synthesis Badge */}
      <div className="bg-[#090D14] border border-slate-800/80 rounded-lg p-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Synthesized via AI decomposition and validated by human user clarification.</span>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>Back to Clarify</span>
          </button>

          {onEditQuestion && (
            <button
              type="button"
              onClick={onEditQuestion}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-900 border border-transparent transition-colors cursor-pointer font-mono"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Question</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onProceedToFinal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer active:scale-[0.99] font-mono"
        >
          <span>Generate Final Experiment Spec</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
