# TradeLens – AI Trading Research Assistant

> **Turn unstructured trading questions into structured, backtest-ready research experiments.**  
> *Demonstrating Human Product Thinking + AI Assistance.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-brightgreen?style=flat&logo=github)](https://tusharkhot42.github.io/TradeLens/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**🔗 Live Application:** [https://tusharkhot42.github.io/TradeLens/](https://tusharkhot42.github.io/TradeLens/)

---

## 1. Architecture

TradeLens is built on a **decoupled, event-driven Single Page Application (SPA)** architecture designed around a deterministic 5-stage research pipeline:

```
[ 1. ASK ] ──▶ [ 2. UNDERSTAND ] ──▶ [ 3. CLARIFY ] ──▶ [ 4. DEFINE ] ──▶ [ 5. SPECIFICATION ]
  Input          Deconstruct Logic     Resolve Missing      Review & Edit      Exportable Backtest
  Hypothesis     via NLP Parser        Parameters           Normalized Model   Ready Blueprint
```

### Key Architectural Layers:
- **Presentation Layer (`client/src/components/`, `pages/`)**:
  - Declarative UI components styled with an institutional dark financial theme.
  - Interactive stepper tracking workflow progression across the 5 states.
  - Granular cards for parameter decomposition, ambiguity badges, interactive clarification controls, and exportable ASCII summary sheets.
- **State Management Layer (`client/src/context/ExperimentContext.jsx`)**:
  - Unidirectional state flow powered by React Context and `useReducer`.
  - Implements a strict finite state machine (`ASK` → `UNDERSTAND` → `CLARIFY` → `DEFINE` → `SUMMARY`).
  - Encapsulates all action dispatchers (`SET_EXPERIMENT`, `UPDATE_PARAMETER`, `RESOLVE_CLARIFICATION`, `RESET`).
- **Domain & Validation Layer (`client/src/models/`, `utils/validation.js`)**:
  - Normalized experiment factory (`createExperiment`) guaranteeing complete schema consistency.
  - Input validation enforcing minimum query length, market terms, and prevention of junk queries.
- **NLP & Parsing Engine (`client/src/services/api.js`)**:
  - Rule-based natural language parsing engine modeling structured entity extraction (instruments, thresholds, durations, regime filters like India VIX).
  - Explicit ambiguity detection isolating subjective terms (e.g., *"sharp fall"*) without guessing.

```
TradeLens Project/
├── client/
│   ├── src/
│   │   ├── components/      # UI components (Stepper, Cards, Forms, Sheets)
│   │   ├── context/         # Centralized State Machine (Context + useReducer)
│   │   ├── models/          # Deterministic Experiment Schema & Serializer
│   │   ├── services/        # Natural Language Parsing Engine
│   │   ├── utils/           # Input and Parameter Validation
│   │   ├── pages/Home.jsx   # Research Workflow Orchestrator
│   │   ├── App.jsx          # Root Context Provider
│   │   └── index.css        # Financial Terminal Design System
│   ├── index.html           # Typography & Meta Headers
│   └── vite.config.js       # Vite + Tailwind v4 build setup
├── .github/workflows/       # Automated CI/CD deployment to GitHub Pages
├── deploy.ps1               # One-command automated deployment script
└── package.json             # Root workspace runner
```

---

## 2. Technologies Used

| Technology | Role & Purpose |
| :--- | :--- |
| **React 19** | Modern declarative UI foundation leveraging latest concurrent rendering patterns. |
| **Vite 8.3** | Ultra-fast build tool, local dev server, and production Rollup bundler. |
| **Tailwind CSS v4** | Next-gen zero-config CSS engine with high-performance CSS-first styling. |
| **Lucide React** | Lightweight, clean financial iconography. |
| **Google Fonts (Inter & JetBrains Mono)** | Typography pairing for readability and terminal-grade parameter inspection. |
| **Oxlint** | High-performance linter for code health and clean syntax. |
| **GitHub Actions & GitHub Pages** | Automated continuous deployment pipeline triggered on every push to `main`. |

---

## 3. AI Tools Used

- **Antigravity / Gemini 3.8**:
  - **System Design & Pair Programming**: Used as an AI pair-programmer to plan state boundaries, refine component responsibilities, and structure the 5-stage UX workflow.
  - **Schema & Parser Modeling**: Assisted in synthesizing regex heuristics and parameter extraction rules to parse complex financial phrasing into deterministic experiment models.
  - **Edge-Case Simulation**: Used to formulate and stress-test test questions across incomplete, ambiguous, multi-filter, and fully-specified trading hypotheses.

---

## 4. Key Decisions

1. **Rejection of Silent AI Assumptions (Core Product Philosophy)**:
   - *Problem*: Traditional LLMs silently invent arbitrary values when given ambiguous prompts (e.g., arbitrarily assuming *"sharp fall"* = 2% or choosing a 5-day holding period without asking).
   - *Solution*: TradeLens explicitly flags ambiguous parameters as missing, displays visual warning badges, and opens dedicated human-in-the-loop clarification controls.
2. **Deterministic Schema Normalization**:
   - Every parsed hypothesis is transformed into a rigid, immutable data model schema with unique identifiers, explicit entry/exit conditions, holding durations, and filter arrays.
3. **Zero Redundant Questions (Smart Bypass)**:
   - If a user provides a complete hypothesis (e.g., *"Does buying Bank NIFTY after a 3% fall and holding for 5 days work?"*), the system recognizes 100% parameter completeness and skips asking redundant questions.
4. **Two-Way Editable Experiment Parameters**:
   - In Stage 4 (Define), users are not locked into the AI's initial extraction. Every single parameter (instrument, timeframe, percentages, exits, and filters) remains fully editable prior to finalizing the specification.
5. **Decoupled Client-Side Prototype**:
   - The application was intentionally designed as an autonomous client-side architecture to provide instant response times, zero cold starts, offline resilience, and immediate zero-cost hosting deployment.

---

## 5. What I Would Improve With More Time

1. **Direct Integration with Live Backtesting Engines**:
   - Connect the generated specification sheet directly to a Python backtesting worker (`vectorbt` / `backtrader` / `FastAPI`) connected to live market feeds (Zerodha Kite API, Yahoo Finance) to execute instant historical backtests and display equity curves, Sharpe ratio, and max drawdown.
2. **LLM Function Calling via Backend Agent**:
   - Augment the client-side parser with an OpenAI/Gemini structured outputs API endpoint (`function_calling` / JSON Schema) for handling arbitrary multi-sentence natural language trading ideas.
3. **Multi-Condition & Indicator Rule Builder**:
   - Expand beyond price changes to support complex indicator combinations (e.g., RSI Divergence, Bollinger Band squeeze, Moving Average crossovers, Volume spikes).
4. **Code Export to Multiple Algorithmic Frameworks**:
   - Add one-click export to **Pine Script (TradingView)**, **Python (Backtrader/VectorBT)**, and **Interactive Brokers API** code templates.
5. **Persistence & Strategy Comparison**:
   - Implement Supabase / SQLite storage for saved hypotheses, enabling strategy versioning, tag-based search, and side-by-side backtest result comparisons.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/TusharKhot42/TradeLens.git
cd TradeLens

# Install dependencies and start client
cd client
npm install
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)**.

---

## ⚠️ Research Scope Disclaimer

TradeLens is designed to structure natural-language trading hypotheses into reproducible research blueprints. It does **not** provide financial, investment, or trading advice.
