import Navbar from './components/navbar/index.js';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import React from 'react';
import {teamLocker} from './screens/teamlocker.jsx';
import {playerLocker} from './screens/playerlocker.jsx';
import './App.css';
import { Home } from './screens/index.js';


function App() {
  return (
    <Router>
        <Navbar />
            <Routes>
            <Route exact path='/' element={<Home />} />
                <Route path='/teamLocker' element={<teamLocker />} />
                <Route path='/playerLocker' element={<playerLocker />} />
            </Routes>
        </Router>
    );
}

export default App;
