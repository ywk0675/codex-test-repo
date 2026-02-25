import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { TeamProvider } from './contexts/TeamContext';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import TeamCreate from './pages/TeamCreate';
import Office from './pages/Office';

function App() {
  return (
    <Router>
      <SettingsProvider>
        <TeamProvider>
          <div className="antialiased bg-slate-950 min-h-screen font-sans">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/team/:id" element={<TeamCreate />} />
              <Route path="/office/:teamId" element={<Office />} />
            </Routes>
          </div>
        </TeamProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
