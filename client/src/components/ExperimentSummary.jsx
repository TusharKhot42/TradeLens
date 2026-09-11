import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Edit3, RotateCcw, ShieldAlert, FileText, ArrowLeft } from 'lucide-react';

export default function ExperimentSummary({
  experiment,
  onEdit,
  onReset,
}) {
  const [copied, setCopied] = useState(false);

  const instrument = experiment?.instrument || 'NIFTY';
  const timeframe = experiment?.timeframe || 'Daily';
  const entryCondition = experiment?.entryCondition || `${instrument} falls >= 1%`;
  const holdingPeriod = experiment?.holdingPeriod || '3 days';
  const exitCondition = experiment?.exitCondition || `After ${holdingPeriod} trading days`;
  const filters = experiment?.filters || [];
  const researchQuestion = experiment?.researchQuestion || 'Does buying NIFTY after a 1% fall have an edge?';

  const filterText = filters && filters.length > 0 ? filters.join(', ') : 'None';

  const exportText = `----------------------------------------
YOUR EXPERIMENT
----------------------------------------

Market:
${instrument}

Timeframe:
${timeframe}

Entry:
${entryCondition}

Holding Period:
${holdingPeriod}

Exit:
${exitCondition}

Filters:
${filterText}

Research Question:
${researchQuestion}

----------------------------------------`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
      {/* Top Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              Section 5 • Final Experiment
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Experiment Ready
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight m-0">
            Final Experiment Specification
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Spec</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Edit Experiment</span>
          </button>
        </div>
      </div>

      {/* Clean Final Summary as per Section 9 */}
      <div className="bg-[#090D14] border border-slate-800 rounded-lg p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3">
        <div className="text-slate-500 font-bold border-b border-slate-850 pb-2">
          ----------------------------------------<br />
          YOUR EXPERIMENT<br />
          ----------------------------------------
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Market:</span>
          <span className="sm:col-span-2 text-white font-semibold">{instrument}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Timeframe:</span>
          <span className="sm:col-span-2 text-white">{timeframe}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Entry:</span>
          <span className="sm:col-span-2 text-emerald-300 font-semibold">{entryCondition}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Holding Period:</span>
          <span className="sm:col-span-2 text-sky-300 font-semibold">{holdingPeriod}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Exit:</span>
          <span className="sm:col-span-2 text-amber-300 font-semibold">{exitCondition}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1">
          <span className="text-slate-400">Filters:</span>
          <span className="sm:col-span-2 text-slate-300">{filterText}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-1 border-t border-slate-850 pt-2">
          <span className="text-slate-400">Research Question:</span>
          <span className="sm:col-span-2 text-slate-200 italic font-sans">{researchQuestion}</span>
        </div>

        <div className="text-slate-500 font-bold border-t border-slate-850 pt-2">
          ----------------------------------------
        </div>
      </div>

      {/* Crucial Section 9 Disclaimer */}
      <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-200/90 font-mono">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 block">Research Scope Disclaimer:</strong>
          TradeLens is designed to transform unstructured trading questions into structured research experiments. It does NOT claim that this strategy is profitable, nor does it provide financial or trading advice.
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start New Question</span>
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-200 hover:text-white px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Edit Parameters</span>
        </button>
      </div>
    </div>
  );
}
