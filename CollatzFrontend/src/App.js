import React from 'react'

import { Footer, Possibility, Features, WhatCollatz, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatCollatz />
      <Features />
      <Possibility />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
