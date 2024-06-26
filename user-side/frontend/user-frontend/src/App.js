import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import RequestNurse from './pages/RequestNurse';
import RequestDoctor from './pages/RequestDoctor';
import ChatBox from './components/ChatBox';
import RequestPhlebotomist from './pages/RequestPhlebotomist';
import Profile from './pages/Profile';
import TestAnalysis from './pages/TestAnalysis';
import DesktopNotification from './components/DesktopNotificationComponent';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/requestNurse" element={<RequestNurse/>}/>
        <Route path="/requestDoctor" element={<RequestDoctor/>}/>
        <Route path="/requestPhlebotomist" element={<RequestPhlebotomist/>}/>
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/live_chat" element={<ChatBox />} />
        <Route path="/result_analysis" element={<TestAnalysis/>}/>
        <Route path="/notification" element={<DesktopNotification/>}/>
        
      </Routes>

    </Router>
  );
}

export default App;
