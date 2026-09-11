/**
 * TradeLens Experiment Data Model
 * Formal schema definition, factory functions, and serialization utilities
 * adhering to Section 3 of the assignment specification.
 */

/**
 * Creates a structured experiment object.
 * Guarantees schema consistency across the entire application lifecycle.
 *
 * @param {Object} params - Raw parameters extracted from NLP or provided by user
 * @returns {Object} Structured Experiment Model
 */
export function createExperiment(params = {}) {
  const now = new Date().toISOString();
  const instrument = (params.instrument || 'NIFTY').trim().toUpperCase();
  const timeframe = params.timeframe || 'Daily';
  const entryCondition = params.entryCondition || `${instrument} falls >= 1%`;
  const exitCondition = params.exitCondition !== undefined ? params.exitCondition : null;
  const holdingPeriod = params.holdingPeriod !== undefined ? params.holdingPeriod : null;
  const filters = Array.isArray(params.filters) ? params.filters : [];
  const researchQuestion = (params.researchQuestion || '').trim();
  const isAmbiguous = Boolean(params.isAmbiguous);

  // Compute missing information deterministically
  const missingInformation = [];
  if (!holdingPeriod) missingInformation.push('holdingPeriod');
  if (!exitCondition) missingInformation.push('exitCondition');
  if (isAmbiguous || (params.missingInformation && params.missingInformation.includes('sharpFallThreshold'))) {
    if (!missingInformation.includes('sharpFallThreshold')) {
      missingInformation.push('sharpFallThreshold');
    }
  }

  // Derive lifecycle status
  let status = 'draft';
  if (missingInformation.length === 0) {
    status = 'defined';
  } else if (params.status) {
    status = params.status;
  } else {
    status = 'analyzed';
  }

  return {
    id: params.id || `exp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    instrument,
    timeframe,
    entryCondition,
    exitCondition,
    holdingPeriod,
    filters,
    researchQuestion,
    missingInformation,
    isAmbiguous,
    status,
    createdAt: params.createdAt || now,
    updatedAt: now,
  };
}

/**
 * Checks whether an experiment has all mandatory parameters defined.
 * @param {Object} experiment
 * @returns {boolean}
 */
export function isExperimentComplete(experiment) {
  if (!experiment) return false;
  return (
    Boolean(experiment.instrument) &&
    Boolean(experiment.entryCondition) &&
    Boolean(experiment.holdingPeriod) &&
    Boolean(experiment.exitCondition) &&
    (!experiment.missingInformation || experiment.missingInformation.length === 0)
  );
}

/**
 * Generates clean ASCII specification text for export and clipboard copying.
 * @param {Object} experiment
 * @returns {string}
 */
export function formatExperimentSpec(experiment) {
  if (!experiment) return '';

  const filterText =
    experiment.filters && experiment.filters.length > 0
      ? experiment.filters.join(', ')
      : 'None';

  return `----------------------------------------
YOUR EXPERIMENT
----------------------------------------

Market:
${experiment.instrument || 'NIFTY'}

Timeframe:
${experiment.timeframe || 'Daily'}

Entry:
${experiment.entryCondition || 'NIFTY falls >= 1%'}

Holding Period:
${experiment.holdingPeriod || '3 days'}

Exit:
${experiment.exitCondition || 'After 3 trading days'}

Filters:
${filterText}

Research Question:
${experiment.researchQuestion || ''}

----------------------------------------`;
}
