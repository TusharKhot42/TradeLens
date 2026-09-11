import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ExperimentCard({
  experiment,
  onProceedToClarify,
  onSkipToDefine,
  onEditQuestion,
}) {
  if (!experiment) return null;

  const {
    instrument,
    timeframe,
    entryCondition,
    exitCondition,
    holdingPeriod,
    filters = [],
    researchQuestion,
    missingInformation = [],
  } = experiment;

  const hasMissing = missingInformation && missingInformation.length > 0;

  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
      {/* Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded">
              Section 2 • Understand
            </span>
            <span className="text-xs text-slate-400 font-mono">
              AI Decomposition Engine
            </span>
          </div>
          <h3 className="text-base font-semibold text-white m-0">
            Parsed Experiment Structure
          </h3>
        </div>

        {hasMissing ? (
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/70 border border-amber-800/60 px-3 py-1.5 rounded-lg font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{missingInformation.length} variable(s) undefined</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1.5 rounded-lg font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Core parameters specified</span>
          </div>
        )}
      </div>

      {/* Original Research Question */}
      <div className="bg-[#090D14] border border-slate-800 rounded-lg p-3 text-xs sm:text-sm">
        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block mb-1">
          Source Research Question
        </span>
        <p className="text-slate-200 font-mono m-0">
          &ldquo;{researchQuestion}&rdquo;
        </p>
      </div>

      {/* Parameters Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Market / Instrument */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Market / Instrument
          </span>
          <div className="text-sm font-mono font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {instrument || <span className="text-amber-400">Missing</span>}
          </div>
        </div>

        {/* Timeframe */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Timeframe
          </span>
          <div className="text-sm font-mono font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            {timeframe || <span className="text-amber-400">Daily (Implied)</span>}
          </div>
        </div>

        {/* Entry Condition */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5 md:col-span-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Entry Condition
          </span>
          <div className="text-sm font-mono text-emerald-300 font-medium">
            {entryCondition || <span className="text-amber-400">Missing</span>}
          </div>
        </div>

        {/* Exit Condition */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Exit Condition
          </span>
          <div className="text-xs font-mono">
            {exitCondition ? (
              <span className="text-slate-200">{exitCondition}</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                <HelpCircle className="w-3 h-3" />
                Missing (Needs clarification)
              </span>
            )}
          </div>
        </div>

        {/* Holding Period */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Holding Period
          </span>
          <div className="text-xs font-mono">
            {holdingPeriod ? (
              <span className="text-slate-200">{holdingPeriod}</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                <Clock className="w-3 h-3" />
                Missing (Needs clarification)
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#090D14] border border-slate-800/90 rounded-lg p-3.5 md:col-span-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Filters / Context
          </span>
          <div className="text-xs font-mono">
            {filters && filters.length > 0 ? (
              <span className="text-sky-300">{filters.join(', ')}</span>
            ) : (
              <span className="text-slate-500 italic">None specified</span>
            )}
          </div>
        </div>
      </div>

      {/* Human In The Loop Notice */}
      {hasMissing && (
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-200/90">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block">Strict Requirement: Human Clarification Needed</strong>
            <span>
              The AI identified missing parameters ({missingInformation.join(', ')}). In adherence to sound research principles, TradeLens will not guess parameters. Please define them next.
            </span>
          </div>
        </div>
      )}

      {/* Navigation Buttons Row - Always offers direct Clarify Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onEditQuestion}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Research Question</span>
        </button>

        <div className="flex items-center gap-2">
          {!hasMissing && onSkipToDefine && (
            <button
              type="button"
              onClick={onSkipToDefine}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer font-mono border border-slate-800"
            >
              <span>Skip to Define</span>
            </button>
          )}

          <button
            id="proceed-to-clarify-btn"
            type="button"
            onClick={onProceedToClarify}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm font-mono active:scale-[0.99]"
          >
            <span>Proceed to Clarify Parameters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
