# TradeLens – AI Trading Research Assistant

> **Turn unstructured trading questions into structured, backtest-ready research experiments.**  
> *Demonstrating Human Product Thinking + AI Assistance.*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Overview & Product Thinking

**TradeLens** is an intelligent full-stack research prototype built for an internship evaluation assignment. 

Trading research requires rigorous, deterministic definitions. When a trader asks a question like:
> *"Does buying NIFTY after a sharp fall work?"*

Traditional AI systems make silent, hidden assumptions (e.g., arbitrarily deciding that a *"sharp fall"* means 2%). **TradeLens rejects silent assumptions:**
1. **AI Role**: Parses natural language, extracts candidate instruments, triggers, and flags ambiguous terms.
2. **Application Code Role**: Controls UI state machines, strict data models, missing-variable validation, and clarification workflows.
3. **Human Role**: Confirms and clarifies parameters (e.g., selecting whether a sharp fall is `1%`, `2%`, or `Custom %`, and defining the holding duration).

---

## 🔄 The 5-Stage Research Workflow

```
[ 1. ASK ] ──▶ [ 2. UNDERSTAND ] ──▶ [ 3. CLARIFY ] ──▶ [ 4. DEFINE ] ──▶ [ 5. FINAL EXPERIMENT ]
  Input          Decompose logic      Resolve missing      Review model       Exportable backtest
  hypothesis     via AI parser        parameters           specification      specification
```

1. **Ask**: Enter any natural-language trading hypothesis or select from curated sample benchmarks.
2. **Understand**: View the AI's structured parameter breakdown (Market, Timeframe, Entry, Exit, Holding Duration, Regime Filters).
3. **Clarify**: If parameters are missing or ambiguous (like *"sharp fall"*), targeted UI controls prompt the user to choose exact values. If all parameters were already provided, the system acknowledges full specification with zero redundant questions.
4. **Define**: Review the consolidated experiment model with full two-way editing controls.
5. **Final Experiment**: Publication-ready ASCII-bordered specification sheet with copy-to-clipboard functionality and an explicit research disclaimer.

---

## 📂 Project Architecture

```
TradeLens Project/
├── package.json               # Root convenience runner
├── .gitignore                 # Clean repository exclusions
├── README.md                  # Project documentation & architecture guide
└── client/                    # Frontend Client (React + Vite + Tailwind v4)
    ├── index.html             # Inter & JetBrains Mono typography, custom branding
    ├── package.json           # Dependencies (React 19, Tailwind CSS v4, Lucide icons)
    ├── vite.config.js         # Vite configuration with @tailwindcss/vite
    └── src/
        ├── models/
        │   └── experiment.js  # Formal Experiment Schema, factory & spec serializer
        ├── context/
        │   └── ExperimentContext.jsx # Centralized React Context + useReducer store
        ├── utils/
        │   └── validation.js  # Validation logic for inputs and parameters
        ├── services/
        │   └── api.js         # Modular natural language parser & API abstraction
        ├── components/
        │   ├── Header.jsx             # Institutional branding & 5-step workflow stepper
        │   ├── QuestionInput.jsx      # Research command bar with preset benchmark chips
        │   ├── ExperimentCard.jsx     # AI interpretation decomposition & alert badges
        │   ├── ClarificationPanel.jsx # Targeted clarification controls & validation
        │   ├── DefineExperiment.jsx   # Consolidated structured parameter model
        │   ├── ExperimentSummary.jsx  # Final ASCII export sheet & research disclaimer
        │   ├── LoadingState.jsx       # Real-time parsing indicator
        │   └── ErrorMessage.jsx       # Error banner with retry mechanism
        ├── pages/
        │   └── Home.jsx               # Declarative workflow coordinator
        ├── App.jsx                    # Root component with ExperimentProvider
        ├── index.css                  # Institutional dark financial terminal design system
        └── main.jsx                   # React entry point
```

---

## 📊 Experiment Data Model Schema

Every experiment is normalized into the following deterministic schema (`client/src/models/experiment.js`):

```json
{
  "id": "exp_1789145099257_8r2ned",
  "instrument": "NIFTY",
  "timeframe": "Daily",
  "entryCondition": "NIFTY falls >= 1%",
  "exitCondition": "After 3 trading days",
  "holdingPeriod": "3 days",
  "filters": [],
  "researchQuestion": "Does buying NIFTY after a 1% fall have an edge?",
  "missingInformation": [],
  "isAmbiguous": false,
  "status": "defined",
  "createdAt": "2026-09-11T16:44:59.257Z",
  "updatedAt": "2026-09-11T16:45:30.120Z"
}
```

---

## 🧪 Supported Evaluation Hypotheses

TradeLens includes out-of-the-box parsing for the assignment test cases:

1. `"Does buying NIFTY after a 1% fall have an edge?"`  
   *(Identifies missing holding period and exit conditions; prompts clarification).*
2. `"Does buying NIFTY after a sharp fall work?"`  
   *(Detects ambiguous "sharp fall"; prompts user for exact % decline threshold).*
3. `"Does buying NIFTY after a 2% fall work better during high-volatility periods?"`  
   *(Extracts 2% entry threshold and India VIX > 18 volatility filter).*
4. `"Does buying Bank NIFTY after a 3% fall and holding for 5 days work?"`  
   *(100% complete: recognizes 5-day horizon; skips redundant questions).*
5. `"Does buying NIFTY after a 1% fall work over a 3-day holding period?"`  
   *(100% complete: extracts 3-day holding period directly).*

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TusharKhot42/tradelens.git
   cd tradelens
   ```

2. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)** in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment (Vercel)

The frontend is ready for zero-config Vercel deployment:
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `client`.
4. Deploy! Vite and Tailwind CSS will automatically build and serve globally.

---

## ⚠️ Research Scope Disclaimer

TradeLens is designed to structure natural-language trading ideas into testable, reproducible hypotheses. It does **not** claim that any strategy is profitable, nor does it provide financial, investment, or trading advice.
