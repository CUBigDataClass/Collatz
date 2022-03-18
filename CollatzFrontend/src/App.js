import React from 'react'

import { Footer, Possibility, Features, Report, WhatCollatz, Header } from './containers';
import { CTA, Brand, Navbar, Placeholder } from './components';
import './App.css'; 

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Report />
      <Placeholder />
      <CTA />
      <Footer />
    </div>
  );
}

export default App
