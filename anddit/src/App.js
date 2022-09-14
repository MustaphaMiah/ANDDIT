import React, { useEffect, useState } from 'react';
import './App.css';
import Profile from './Components/profiles';
import logo from '../src/Assets/Images/andlogo.png'
import axios from 'axios'


function App() {

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    axios('http://localhost:3000').then(({ data }) => {
      setProfiles(data)
    }).catch((error) => console.log(error))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" />
      </header>
      <div><h2>And Profile</h2>
        <Profile />
      </div>
    </div>
  );
}

export default App;
