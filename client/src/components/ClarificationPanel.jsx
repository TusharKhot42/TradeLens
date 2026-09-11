import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export default function ClarificationPanel({
  experiment,
  onApplyClarifications,
  onBack,
}) {
  const targetInstrument = experiment?.instrument || 'NIFTY';

  const isAmbiguousFall =
    experiment?.missingInformation?.includes('sharpFallThreshold') ||
    experiment?.isAmbiguous ||
    experiment?.researchQuestion?.toLowerCase().includes('sharp');

  const isHoldingPeriodMissing =
    experiment?.missingInformation?.includes('holdingPeriod') ||
    !experiment?.holdingPeriod;

  const isExitConditionMissing =
    experiment?.missingInformation?.includes('exitCondition') ||
    !experiment?.exitCondition;

  const hasMissing = isAmbiguousFall || isHoldingPeriodMissing || isExitConditionMissing;

  // Local state for clarification selections
  const [fallThreshold, setFallThreshold] = useState('2%');
  const [customFall, setCustomFall] = useState('');
  const [isCustomFall, setIsCustomFall] = useState(false);

  const [holdingPeriod, setHoldingPeriod] = useState(
    experiment?.holdingPeriod || '3 days'
  );
  const [customHolding, setCustomHolding] = useState('');
  const [isCustomHolding, setIsCustomHolding] = useState(false);

  const [exitCondition, setExitCondition] = useState(
    experiment?.exitCondition || 'After holding period expires'
  );

  // Allow user to manually open edit controls even if nothing was missing
  const [manualEdit, setManualEdit] = useState(false);

  const handleConfirm = () => {
    const finalFall = isCustomFall ? `${customFall || '2'}%` : fallThreshold;
    const finalHolding = isCustomHolding ? `${customHolding || '3'} days` : holdingPeriod;
    const finalExit =
      exitCondition === 'After holding period expires'
        ? `After ${finalHolding} trading days`
        : exitCondition;

    onApplyClarifications({
      fallThreshold: finalFall,
      holdingPeriod: finalHolding,
      exitCondition: finalExit,
      entryCondition: isAmbiguousFall
        ? `${targetInstrument} falls >= ${finalFall}`
        : experiment?.entryCondition || `${targetInstrument} falls >= ${finalFall}`,
    });
  };

  // Case 1: All parameters were explicitly provided in the question
  if (!hasMissing && !manualEdit) {
    return (
      <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-7 shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                Section 3 • Clarify
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Validation Status
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white m-0">
              No Parameters Require Clarification
            </h3>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Fully Specified</span>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-[#090D14] border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-100 font-mono mb-1">
                Zero Ambiguity Detected
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                Your research question contained all necessary variables (<strong className="text-white">Market</strong>, <strong className="text-white">Entry Condition</strong>, <strong className="text-white">Holding Period</strong>, and <strong className="text-white">Exit Rule</strong>). TradeLens did not have to make any assumptions or ask clarification questions.
              </p>
            </div>
          </div>

          {/* Table of Confirmed Values */}
          <div className="mt-3 pt-3 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
              <span className="text-slate-400 text-[10px] block uppercase">Market:</span>
              <span className="text-white font-semibold">{targetInstrument}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
              <span className="text-slate-400 text-[10px] block uppercase">Entry Trigger:</span>
              <span className="text-emerald-300 font-semibold">{experiment?.entryCondition}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
              <span className="text-slate-400 text-[10px] block uppercase">Holding Horizon:</span>
              <span className="text-sky-300 font-semibold">{experiment?.holdingPeriod}</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded">
              <span className="text-slate-400 text-[10px] block uppercase">Exit Condition:</span>
              <span className="text-amber-300 font-semibold">{experiment?.exitCondition}</span>
            </div>
          </div>
        </div>

        {/* Optional Override Trigger */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Everything is ready to define.</span>
          <button
            type="button"
            onClick={() => setManualEdit(true)}
            className="text-slate-400 hover:text-sky-300 underline inline-flex items-center gap-1 cursor-pointer font-mono text-[11px]"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Manually adjust parameters anyway</span>
          </button>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to AI Interpretation</span>
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer font-mono active:scale-[0.99]"
          >
            <span>Proceed to Defined Experiment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Case 2: Ambiguous or missing parameters need clarification
  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
      {/* Header */}
      <div className="pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
            Section 3 • Clarify
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Parameter Resolution for [{targetInstrument}]
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white m-0">
          Before we define the experiment, please clarify missing variables.
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Select precise parameter values below. The experiment specification will strictly reflect your selections.
        </p>
      </div>

      <div className="space-y-4">
        {/* Ambiguous Sharp Fall Resolution (Only shown if ambiguous or manual edit) */}
        {(isAmbiguousFall || manualEdit) && (
          <div className="bg-[#090D14] border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <label className="text-xs font-semibold text-slate-200 font-mono">
                1. What percentage decline should count as a &quot;sharp fall&quot; for {targetInstrument}?
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Trading rules require deterministic thresholds rather than subjective terms like &quot;sharp&quot;.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {['1%', '2%', '3%'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setFallThreshold(opt);
                    setIsCustomFall(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    !isCustomFall && fallThreshold === opt
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsCustomFall(true)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  isCustomFall
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                Custom %
              </button>

              {isCustomFall && (
                <div className="flex items-center gap-1 ml-1">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={customFall}
                    onChange={(e) => setCustomFall(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-20 bg-slate-900 border border-amber-500/70 rounded px-2 py-1 text-xs text-white font-mono outline-hidden"
                  />
                  <span className="text-xs text-slate-400 font-mono">%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Holding Duration Resolution (Only shown if missing or manual edit) */}
        {(isHoldingPeriodMissing || manualEdit) && (
          <div className="bg-[#090D14] border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <label className="text-xs font-semibold text-slate-200 font-mono">
                2. How long should the position in {targetInstrument} be held?
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Fixed holding horizon used to measure post-entry cumulative returns:
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {['1 day', '3 days', '5 days', '10 days'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setHoldingPeriod(opt);
                    setIsCustomHolding(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    !isCustomHolding && holdingPeriod === opt
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setIsCustomHolding(true)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  isCustomHolding
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                Custom Days
              </button>

              {isCustomHolding && (
                <div className="flex items-center gap-1 ml-1">
                  <input
                    type="number"
                    min="1"
                    value={customHolding}
                    onChange={(e) => setCustomHolding(e.target.value)}
                    placeholder="e.g. 7"
                    className="w-16 bg-slate-900 border border-sky-500/70 rounded px-2 py-1 text-xs text-white font-mono outline-hidden"
                  />
                  <span className="text-xs text-slate-400 font-mono">days</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Exit Rule Resolution (Only shown if missing or manual edit) */}
        {(isExitConditionMissing || manualEdit) && (
          <div className="bg-[#090D14] border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <label className="text-xs font-semibold text-slate-200 font-mono">
                3. Select trade exit mechanism:
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Choose the rule that concludes the backtest trade instance:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'After holding period expires',
                  title: 'Time-Based Exit',
                  desc: 'Close trade at market close when holding days elapse',
                },
                {
                  id: 'Target +2% or Stop -1%',
                  title: 'Bracket / Stop Exit',
                  desc: 'Exit trade upon hitting profit target (+2%) or stop loss (-1%)',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setExitCondition(opt.id)}
                  className={`text-left p-3 rounded-lg border transition-all cursor-pointer font-mono ${
                    exitCondition === opt.id
                      ? 'bg-slate-800/90 border-emerald-500/80 ring-1 ring-emerald-500/40 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">
                      {opt.title}
                    </span>
                    {exitCondition === opt.id && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 m-0">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to AI Interpretation</span>
        </button>

        <button
          id="confirm-clarifications-btn"
          type="button"
          onClick={handleConfirm}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer active:scale-[0.99] font-mono"
        >
          <span>Confirm & Define Experiment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
