import React from 'react';
import { Terminal, ShieldCheck, HelpCircle, Sparkles, Layers, Sliders, CheckCircle2, ChevronRight } from 'lucide-react';

export const STEPS = [
  { id: 'ask', label: '1. Ask', desc: 'Input Hypothesis', icon: HelpCircle },
  { id: 'understand', label: '2. Understand', desc: 'AI Extraction', icon: Sparkles },
  { id: 'clarify', label: '3. Clarify', desc: 'Resolve Ambiguity', icon: Layers },
  { id: 'define', label: '4. Define', desc: 'Review Model', icon: Sliders },
  { id: 'final', label: '5. Final Experiment', desc: 'Structured Spec', icon: CheckCircle2 },
];

export default function Header({ currentStep = 'ask', onStepClick }) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <header className="border-b border-slate-800/80 bg-[#0B1019]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        {/* Top Branding Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Minimalist Terminal Emblem */}
            <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-inner">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  TradeLens
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Research Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                AI Trading Research Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-300">Human-in-the-Loop</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Zero Silent Assumptions</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-2 text-xs text-slate-400">
          Transform unstructured trading questions into rigorously defined, backtest-ready research experiments.
        </div>

        {/* 5-Step Workflow Stepper Navigation */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/60">
          <nav aria-label="Research workflow steps" className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = idx < currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => onStepClick(step.id)}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer text-left whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-800/90 border border-slate-600 text-white shadow-xs font-semibold'
                        : isCompleted
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/40 border border-transparent'
                    }`}
                    title={`Click to navigate to ${step.label}`}
                  >
                    <div className={`p-1 rounded-md ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : isCompleted 
                        ? 'bg-slate-800 text-emerald-400' 
                        : 'bg-slate-900 text-slate-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="leading-none">{step.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5 group-hover:text-slate-300 hidden md:block">
                        {step.desc}
                      </div>
                    </div>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
