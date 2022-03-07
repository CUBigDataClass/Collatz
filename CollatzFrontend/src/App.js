import React, { useState, useRef } from 'react';
import LocationSearch from './LocationSearch'

function App() {

  const [userSearch, setUserSearch] = useState([])
  const inputLocation = useRef()

  function handleSearch() {

  }

  return (
    <>
        <LocationSearch />
        <input desiredLocation={inputLocation} type="text" />
        <button onClick={handleSearch}> Search </button>
        <button> Clear </button>

    </>
  );

}

export default App;
