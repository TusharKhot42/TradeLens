import React from 'react';
import { AlertCircle, X, RotateCcw } from 'lucide-react';

export default function ErrorMessage({ message, onDismiss, onRetry }) {
  if (!message) return null;

  return (
    <div className="bg-rose-950/30 border border-rose-800/60 rounded-lg p-3.5 flex items-start justify-between gap-3 text-xs sm:text-sm text-rose-200">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold font-mono text-rose-300 block mb-0.5">
            Parser Notice
          </span>
          <span className="text-rose-200/90 leading-relaxed font-mono text-xs">
            {message}
          </span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1.5 flex items-center gap-1 text-xs text-rose-300 hover:text-white underline cursor-pointer font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-rose-400 hover:text-rose-200 p-1 rounded transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
