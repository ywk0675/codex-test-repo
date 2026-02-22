import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recorder from './pages/Recorder';
import Patterns from './pages/Patterns';
import Coach from './pages/Coach';
import Onboarding from './pages/Onboarding';
import Marketing from './pages/Marketing';

function App() {
  return (
    <Router>
      <div className="antialiased text-slate-900 dark:text-white bg-background-light dark:bg-background-dark min-h-screen font-display">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Recorder />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/marketing" element={<Marketing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
