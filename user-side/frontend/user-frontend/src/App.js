import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Routes>
      <Route path="/" exact component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
