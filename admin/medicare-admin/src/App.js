

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./components/Home";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/NewUser";
import AdminLogin from "./components/AdminLogin";
import AdminChat from "./components/AdminChat";
import DisplayChats from "./components/DisplayChats";
import PatientList from "./components/PatientList";
import Patient from "./components/Patient";
import Medications from "./components/Medications";
import NewMedication from "./components/NewMedication";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/admin" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/displaychats" element={<DisplayChats />} />
          <Route path="/newchat" element={<AdminChat />} />
          <Route path="/chat/:patientId" element={<AdminChat />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/:patientId" element={<Patient />} />
          <Route path="/medication/:medicationId" element={<Medications />} />
          <Route path="/newmedication" element={<NewMedication />} />
  
        </Routes>
    </Router>
  );
}

export default App;
