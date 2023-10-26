import Navbar from './components/navbar/index.js';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import React from 'react';
import {TeamLocker} from './screens/teamlocker.js';
import {PlayerLocker} from './screens/playerlocker.js';
import './App.css';
import { Home } from './screens/index.js';


function App() {
  return (
    <Router>
        <Navbar />
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/Home' element={<Home />} />
                <Route path='/teamlocker' element={<TeamLocker />} />
                <Route path='/playerlocker' element={<PlayerLocker />} />
            </Routes>
        </Router>
    );
}

export default App;
