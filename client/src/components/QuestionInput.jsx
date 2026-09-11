import React from 'react';
import { CornerDownLeft, Sparkles, Terminal, ArrowRight, RotateCcw } from 'lucide-react';

const SAMPLE_QUESTIONS = [
  "Does buying NIFTY after a 1% fall have an edge?",
  "Does buying NIFTY after a sharp fall work?",
  "Does buying NIFTY after a 2% fall work better during high-volatility periods?",
  "Does buying Bank NIFTY after a 3% fall and holding for 5 days work?",
  "Does buying NIFTY after a 1% fall work over a 3-day holding period?",
];

export default function QuestionInput({
  question,
  setQuestion,
  onAnalyze,
  isLoading,
  onReset,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    onAnalyze(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-[#0E1420] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
            Section 1 • Ask
          </span>
          <h2 className="text-sm sm:text-base font-semibold text-slate-100 m-0">
            What would you like to investigate?
          </h2>
        </div>

        {question && (
          <button
            type="button"
            onClick={() => setQuestion('')}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 mb-3.5">
        Enter your trading hypothesis in plain English. The parser identifies candidate instruments, entry thresholds, and highlights missing variables for clarification.
      </p>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="relative">
          <textarea
            id="research-question-input"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Does buying NIFTY after a 1% fall have an edge?"
            disabled={isLoading}
            className="w-full bg-[#090D14] border border-slate-700/90 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/40 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all resize-none font-mono outline-hidden shadow-inner"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
              <span>Enter</span> <CornerDownLeft className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Submit Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AI Parser: Strict extraction • No default assumptions</span>
          </div>

          <button
            id="analyze-question-btn"
            type="submit"
            disabled={!question.trim() || isLoading}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              !question.trim() || isLoading
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-950 font-bold active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Parsing Hypothesis...</span>
              </>
            ) : (
              <>
                <span>Analyze Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset Test Questions */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-slate-400">
            Sample evaluation hypotheses:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Click to test</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((sample, idx) => {
            const isSelected = question === sample;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setQuestion(sample)}
                className={`text-left text-xs px-2.5 py-1.5 rounded-md border transition-all cursor-pointer font-mono ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/60 text-emerald-300'
                    : 'bg-[#090D14] border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                &ldquo;{sample}&rdquo;
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
