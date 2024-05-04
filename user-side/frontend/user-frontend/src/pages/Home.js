// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from '../components/HomeComponent';
import Navbar from '../components/navbar';

function Home() {
  return(
    <div>
    <Navbar/>
  <HomeComponent/>
  
  </div>
  )
}

export default Home;
