import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { createExperiment, formatExperimentSpec } from '../models/experiment';
import { analyzeQuestion, MOCK_EXPERIMENT } from '../services/api';

const SESSION_STORAGE_KEY = 'tradelens_experiment_state_v1';

// Initial default state
const initialState = {
  currentStep: 'ask',
  question: 'Does buying NIFTY after a 1% fall have an edge?',
  experiment: MOCK_EXPERIMENT,
  isLoading: false,
  errorMessage: null,
  history: [], // Array of past experiment specs in session
};

// State Reducer
function experimentReducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTION':
      return {
        ...state,
        question: action.payload,
      };

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
        errorMessage: null,
      };

    case 'ANALYZE_START':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case 'ANALYZE_SUCCESS': {
      const newExperiment = action.payload;
      // Add to session history if not already present
      const updatedHistory = [
        newExperiment,
        ...state.history.filter((h) => h.id !== newExperiment.id),
      ].slice(0, 10);

      return {
        ...state,
        isLoading: false,
        experiment: newExperiment,
        history: updatedHistory,
        currentStep: 'understand',
        errorMessage: null,
      };
    }

    case 'ANALYZE_ERROR':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    case 'APPLY_CLARIFICATIONS': {
      if (!state.experiment) return state;

      const updated = createExperiment({
        ...state.experiment,
        ...action.payload,
        missingInformation: [],
        status: 'defined',
      });

      return {
        ...state,
        experiment: updated,
        currentStep: 'define',
      };
    }

    case 'UPDATE_PARAMETER': {
      if (!state.experiment) return state;

      const updated = createExperiment({
        ...state.experiment,
        [action.payload.field]: action.payload.value,
      });

      return {
        ...state,
        experiment: updated,
      };
    }

    case 'DISMISS_ERROR':
      return {
        ...state,
        errorMessage: null,
      };

    case 'RESET':
      return {
        ...state,
        currentStep: 'ask',
        question: '',
        experiment: createExperiment({
          researchQuestion: '',
        }),
        errorMessage: null,
      };

    case 'RESTORE_SAVED_STATE':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Context creation
const ExperimentContext = createContext(null);

export function ExperimentProvider({ children }) {
  const [state, dispatch] = useReducer(experimentReducer, initialState, (init) => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.experiment) {
          return {
            ...init,
            ...parsed,
            experiment: createExperiment(parsed.experiment),
          };
        }
      }
    } catch (e) {
      console.warn('Unable to load TradeLens state from sessionStorage', e);
    }
    return init;
  });

  // Sync to sessionStorage whenever state changes
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          currentStep: state.currentStep,
          question: state.question,
          experiment: state.experiment,
          history: state.history,
        })
      );
    } catch (e) {
      console.warn('Unable to persist TradeLens state to sessionStorage', e);
    }
  }, [state.currentStep, state.question, state.experiment, state.history]);

  // Action Dispatchers
  const setQuestion = (q) => {
    dispatch({ type: 'SET_QUESTION', payload: q });
  };

  const goToStep = (step) => {
    // Ensure experiment is defined if jumping straight to define or final
    if ((step === 'define' || step === 'final') && state.experiment && !state.experiment.holdingPeriod) {
      dispatch({
        type: 'APPLY_CLARIFICATIONS',
        payload: {
          holdingPeriod: '3 days',
          exitCondition: 'After 3 trading days',
        },
      });
    }
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const analyze = async (targetQuestion) => {
    const q = targetQuestion || state.question;
    dispatch({ type: 'ANALYZE_START' });

    try {
      const res = await analyzeQuestion(q);
      dispatch({ type: 'ANALYZE_SUCCESS', payload: res.experiment });
    } catch (err) {
      dispatch({
        type: 'ANALYZE_ERROR',
        payload: err.message || 'Failed to analyze trading research question.',
      });
    }
  };

  const applyClarifications = (clarifications) => {
    dispatch({ type: 'APPLY_CLARIFICATIONS', payload: clarifications });
  };

  const updateParameter = (field, value) => {
    dispatch({ type: 'UPDATE_PARAMETER', payload: { field, value } });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const dismissError = () => {
    dispatch({ type: 'DISMISS_ERROR' });
  };

  const exportSpec = () => {
    return formatExperimentSpec(state.experiment);
  };

  const value = {
    ...state,
    setQuestion,
    goToStep,
    analyze,
    applyClarifications,
    updateParameter,
    reset,
    dismissError,
    exportSpec,
  };

  return (
    <ExperimentContext.Provider value={value}>
      {children}
    </ExperimentContext.Provider>
  );
}

// Custom Hook to consume Experiment Context
export function useExperiment() {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an <ExperimentProvider>');
  }
  return context;
}
