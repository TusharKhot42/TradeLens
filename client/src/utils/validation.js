/**
 * TradeLens Validation Utilities
 * Centralized business logic validation for user inputs and experiment parameters.
 */

/**
 * Validates a trading research question.
 * @param {string} question
 * @returns {{isValid: boolean, error: string | null}}
 */
export function validateQuestion(question) {
  if (!question || typeof question !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a research question to analyze.',
    };
  }

  const trimmed = question.trim();

  if (trimmed.length < 5) {
    return {
      isValid: false,
      error: 'Question is too short. Please describe your trading hypothesis in more detail.',
    };
  }

  if (trimmed.length > 500) {
    return {
      isValid: false,
      error: 'Question exceeds the maximum length of 500 characters. Please be more concise.',
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates a custom decline percentage threshold.
 * @param {string | number} val
 * @returns {{isValid: boolean, value: number, error: string | null}}
 */
export function validateCustomPercentage(val) {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) {
    return {
      isValid: false,
      value: 0,
      error: 'Please enter a valid positive percentage (e.g. 2.5).',
    };
  }
  if (num > 50) {
    return {
      isValid: false,
      value: num,
      error: 'Percentage decline exceeds 50%, which is unusually large for single-day equity moves.',
    };
  }
  return { isValid: true, value: num, error: null };
}

/**
 * Validates custom holding duration in days.
 * @param {string | number} val
 * @returns {{isValid: boolean, value: number, error: string | null}}
 */
export function validateCustomHoldingDays(val) {
  const num = parseInt(val, 10);
  if (isNaN(num) || num < 1) {
    return {
      isValid: false,
      value: 0,
      error: 'Holding duration must be at least 1 day.',
    };
  }
  if (num > 365) {
    return {
      isValid: false,
      value: num,
      error: 'Holding duration cannot exceed 365 days for this research scope.',
    };
  }
  return { isValid: true, value: num, error: null };
}
