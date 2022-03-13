// import React, { useState, useRef } from 'react';
// import LocationSearch from './LocationSearch'

// function App() {

//   const [userSearch, setUserSearch] = useState([])
//   const inputLocation = useRef()

//   function handleSearch() {

//   }

//   return (
//     <>
//         <LocationSearch />
//         <input desiredLocation={inputLocation} type="text" />
//         <button onClick={handleSearch}> Search </button>
//         <button> Clear </button>

//     </>
//   );

// }

// export default App;

import React from 'react'

import { Footer, Possibility, Features, WhatCollatz, Header } from './containers';
import { CTA, Brand, Navbar } from './components';

const App = () => {
  return (
    <div className = "App">
      <div className = "gradient__bg">
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
