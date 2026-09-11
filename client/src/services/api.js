/**
 * TradeLens API Service
 * Advanced natural language trading hypothesis parser.
 * Dynamically extracts instruments, percentages, durations, filters, and ambiguity flags.
 * Returns structured models created via createExperiment().
 */

import { createExperiment } from '../models/experiment';
import { validateQuestion } from '../utils/validation';

// Baseline fallback experiment model
export const MOCK_EXPERIMENT = createExperiment({
  instrument: 'NIFTY',
  timeframe: 'Daily',
  entryCondition: 'NIFTY falls >= 1%',
  exitCondition: null,
  holdingPeriod: null,
  filters: [],
  researchQuestion: 'Does buying NIFTY after a 1% fall have an edge?',
  isAmbiguous: false,
});

/**
 * Natural language parser for trading research questions.
 * Extracts parameters strictly from text without making silent assumptions.
 * @param {string} rawQuestion - The user's input hypothesis
 * @returns {Promise<{success: boolean, experiment: object}>}
 */
export async function analyzeQuestion(rawQuestion) {
  // Simulate processing latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 450));

  const validation = validateQuestion(rawQuestion);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const q = rawQuestion.trim();
  const lower = q.toLowerCase();

  // 1. EXTRACT INSTRUMENT
  let instrument = 'NIFTY'; // Default fallback
  if (lower.includes('bank nifty') || lower.includes('banknifty')) {
    instrument = 'BANKNIFTY';
  } else if (lower.includes('fin nifty') || lower.includes('finnifty')) {
    instrument = 'FINNIFTY';
  } else if (lower.includes('midcap')) {
    instrument = 'NIFTY MIDCAP 50';
  } else if (lower.includes('reliance')) {
    instrument = 'RELIANCE';
  } else if (lower.includes('tcs')) {
    instrument = 'TCS';
  } else if (lower.includes('hdfc')) {
    instrument = 'HDFCBANK';
  } else if (lower.includes('infy') || lower.includes('infosys')) {
    instrument = 'INFY';
  } else if (lower.includes('gold')) {
    instrument = 'GOLD';
  } else if (lower.includes('crude')) {
    instrument = 'CRUDEOIL';
  } else if (lower.includes('bitcoin') || lower.includes('btc')) {
    instrument = 'BTCUSD';
  } else if (lower.includes('apple') || lower.includes('aapl')) {
    instrument = 'AAPL';
  } else if (lower.includes('tesla') || lower.includes('tsla')) {
    instrument = 'TSLA';
  } else {
    // Try to match uppercase ticker or word after "buying / trading"
    const buyMatch = q.match(/(?:buying|trading|shorting|long on|in)\s+([A-Z0-9]{3,10})/i);
    if (buyMatch && buyMatch[1] && !['after', 'when', 'the', 'during'].includes(buyMatch[1].toLowerCase())) {
      instrument = buyMatch[1].toUpperCase();
    }
  }

  // 2. EXTRACT TIMEFRAME
  let timeframe = 'Daily';
  if (lower.includes('15-min') || lower.includes('15 min') || lower.includes('15m')) {
    timeframe = '15-Minute';
  } else if (lower.includes('hourly') || lower.includes('1 hour') || lower.includes('1h') || lower.includes('60 min')) {
    timeframe = 'Hourly';
  } else if (lower.includes('weekly') || lower.includes('1 week')) {
    timeframe = 'Weekly';
  } else if (lower.includes('intraday')) {
    timeframe = 'Intraday';
  }

  // 3. EXTRACT ENTRY TRIGGER & PERCENTAGE
  let entryCondition = null;
  let isAmbiguous = false;
  const missingInformation = [];

  // Check for ambiguous words: sharp, big, massive, deep, severe without percentage
  const hasAmbiguousWord =
    lower.includes('sharp fall') ||
    lower.includes('sharp drop') ||
    lower.includes('sharp decline') ||
    lower.includes('big fall') ||
    lower.includes('big drop') ||
    lower.includes('massive drop') ||
    lower.includes('massive fall') ||
    lower.includes('huge dip') ||
    lower.includes('deep pullback') ||
    lower.includes('crash');

  // Regex to extract explicit percentage (e.g. 1%, 2%, 3.5%, 0.5%)
  const percentMatch = q.match(/(\d+(?:\.\d+)?)\s*%\s*(?:fall|drop|decline|dip|pullback|down|crash|correction|loss)?/i);

  if (percentMatch && percentMatch[1]) {
    const pct = percentMatch[1];
    entryCondition = `${instrument} falls >= ${pct}%`;
  } else if (hasAmbiguousWord) {
    entryCondition = `${instrument} falls by [Unspecified sharp fall threshold]`;
    isAmbiguous = true;
    missingInformation.push('sharpFallThreshold');
  } else {
    // Missing entry threshold
    entryCondition = `${instrument} falls by [Unspecified threshold]`;
    missingInformation.push('entryThreshold');
  }

  // 4. EXTRACT HOLDING PERIOD
  let holdingPeriod = null;
  let exitCondition = null;

  // Check for duration patterns: "holding for 5 days", "3-day holding period", "over 3 days", "for 10 days"
  const durationMatch =
    q.match(/(?:holding|hold|held|over|for)\s+(?:for\s+)?(?:a\s+)?(\d+)[-\s]*(?:trading\s+)?(day|days|week|weeks|hour|hours)/i) ||
    q.match(/(\d+)[-\s]*(?:trading\s+)?(day|days|week|weeks)\s+(?:holding|horizon|period)/i);

  if (durationMatch) {
    const count = durationMatch[1];
    const unit = durationMatch[2].toLowerCase().startsWith('week') ? 'weeks' : 'days';
    holdingPeriod = `${count} ${unit}`;
    exitCondition = `After ${count} trading ${unit}`;
  } else {
    if (lower.includes('stop loss') || lower.includes('target')) {
      exitCondition = 'Target / Stop Loss condition';
    } else {
      missingInformation.push('holdingPeriod');
      missingInformation.push('exitCondition');
    }
  }

  // 5. EXTRACT FILTERS & REGIMES
  const filters = [];
  if (lower.includes('volatility') || lower.includes('vix')) {
    filters.push('High Volatility Periods (India VIX > 18)');
  }
  if (lower.includes('uptrend') || lower.includes('bull market') || lower.includes('above 200')) {
    filters.push('Uptrend Filter (Price > 200-day EMA)');
  }
  if (lower.includes('downtrend') || lower.includes('bear market')) {
    filters.push('Downtrend Filter (Price < 200-day EMA)');
  }
  if (lower.includes('oversold') || lower.includes('rsi')) {
    filters.push('Oversold Filter (RSI(14) < 30)');
  }
  if (lower.includes('monday') || lower.includes('mondays')) {
    filters.push('Session Filter: Monday trades only');
  }
  if (lower.includes('expiry') || lower.includes('thursday')) {
    filters.push('Expiry Day Filter: Thursday sessions');
  }

  const experiment = createExperiment({
    instrument,
    timeframe,
    entryCondition,
    exitCondition,
    holdingPeriod,
    filters,
    researchQuestion: q,
    missingInformation,
    isAmbiguous,
  });

  return {
    success: true,
    experiment,
  };
}
