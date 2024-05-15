

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./components/Home";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/NewUser";
import AdminLogin from "./components/AdminLogin";
import AdminChat from "./components/AdminChat";
import DisplayChats from "./components/DisplayChats";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/admin" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/" element={<AdminLogin />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/displaychats" element={<DisplayChats />} />
          <Route path="/newchat" element={<AdminChat />} />
          <Route path="/chat/:patientId" element={<AdminChat />} />
  
        </Routes>
    </Router>
  );
}

export default App;
