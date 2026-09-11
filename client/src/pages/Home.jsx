import React from 'react';
import Header from '../components/Header';
import QuestionInput from '../components/QuestionInput';
import ExperimentCard from '../components/ExperimentCard';
import ClarificationPanel from '../components/ClarificationPanel';
import DefineExperiment from '../components/DefineExperiment';
import ExperimentSummary from '../components/ExperimentSummary';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import { useExperiment } from '../context/ExperimentContext';
import { Edit3, History, RotateCcw } from 'lucide-react';

export default function Home() {
  // Centralized state from ExperimentContext
  const {
    currentStep,
    question,
    setQuestion,
    experiment,
    isLoading,
    errorMessage,
    dismissError,
    analyze,
    applyClarifications,
    reset,
    goToStep,
    history,
  } = useExperiment();

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation & 5-Step Stepper */}
      <Header currentStep={currentStep} onStepClick={goToStep} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Navigation Quick-Bar for Evaluators */}
        <div className="bg-[#0E1420] border border-slate-800 rounded-lg px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400 font-mono text-[11px]">
              Active Stage: <strong className="text-white uppercase">{currentStep}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 font-mono text-[11px]">
            <span className="text-slate-500 px-1 text-[10px]">Jump to:</span>
            {[
              { id: 'ask', label: '1. Ask' },
              { id: 'understand', label: '2. Understand' },
              { id: 'clarify', label: '3. Clarify' },
              { id: 'define', label: '4. Define' },
              { id: 'final', label: '5. Final' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStep(s.id)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap ${
                  currentStep === s.id
                    ? 'bg-slate-800 text-emerald-300 font-semibold border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Persistent Hypothesis Context Header (when on steps 2 to 5) */}
        {currentStep !== 'ask' && (
          <div className="bg-[#0E1420] border border-slate-800 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider shrink-0">
                Active Hypothesis:
              </span>
              <span className="text-slate-200 font-mono truncate">
                &ldquo;{question || experiment?.researchQuestion}&rdquo;
              </span>
            </div>
            <button
              type="button"
              onClick={() => goToStep('ask')}
              className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-mono shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Question</span>
            </button>
          </div>
        )}

        {/* Error Message Banner */}
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            onDismiss={dismissError}
            onRetry={() => analyze(question)}
          />
        )}

        {/* Dynamic View rendering strictly following the user flow */}
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {/* STEP 1: ASK */}
            {currentStep === 'ask' && (
              <QuestionInput
                question={question}
                setQuestion={setQuestion}
                onAnalyze={analyze}
                isLoading={isLoading}
                onReset={reset}
              />
            )}

            {/* STEP 2: UNDERSTAND */}
            {currentStep === 'understand' && (
              <ExperimentCard
                experiment={experiment}
                onProceedToClarify={() => goToStep('clarify')}
                onSkipToDefine={() => goToStep('define')}
                onEditQuestion={() => goToStep('ask')}
              />
            )}

            {/* STEP 3: CLARIFY */}
            {currentStep === 'clarify' && (
              <ClarificationPanel
                experiment={experiment}
                onApplyClarifications={applyClarifications}
                onBack={() => goToStep('understand')}
              />
            )}

            {/* STEP 4: DEFINE */}
            {currentStep === 'define' && (
              <DefineExperiment
                experiment={experiment}
                onEdit={() => goToStep('clarify')}
                onEditQuestion={() => goToStep('ask')}
                onProceedToFinal={() => goToStep('final')}
              />
            )}

            {/* STEP 5: FINAL EXPERIMENT */}
            {currentStep === 'final' && (
              <ExperimentSummary
                experiment={experiment}
                onEdit={() => goToStep('define')}
                onReset={reset}
              />
            )}
          </>
        )}

        {/* Session History Drawer / Bar (if past experiments exist) */}
        {history && history.length > 1 && (
          <div className="mt-8 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Recent Hypotheses in Session ({history.length}):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((histExp) => (
                <button
                  key={histExp.id}
                  type="button"
                  onClick={() => {
                    setQuestion(histExp.researchQuestion);
                    analyze(histExp.researchQuestion);
                  }}
                  className="text-left text-xs bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 px-2.5 py-1 rounded font-mono transition-colors cursor-pointer truncate max-w-xs"
                  title={histExp.researchQuestion}
                >
                  &ldquo;{histExp.researchQuestion}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B1019] py-5 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TradeLens • Centralized State Architecture</span>
          <span className="text-slate-400">Phase 2: Data Model & State Management</span>
        </div>
      </footer>
    </div>
  );
}
