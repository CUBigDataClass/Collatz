import React from 'react'

import { Footer, Header, Report, ReportDecision } from './containers';
import { Navbar } from './components';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <div className="footer-gradient">
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Report />
        <ReportDecision />
        <Footer />
        </div>
      </div>
  );
}

export default App
