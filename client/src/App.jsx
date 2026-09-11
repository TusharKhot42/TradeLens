import React from 'react';
import Home from './pages/Home';
import { ExperimentProvider } from './context/ExperimentContext';

function App() {
  return (
    <ExperimentProvider>
      <Home />
    </ExperimentProvider>
  );
}

export default App;
