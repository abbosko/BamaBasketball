import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import React from 'react';
import {teamLocker} from './screens/teamLocker';
import {playerLocker} from './screens/playerLocker';
import './App.css';
import { Index } from './screens/Index';


function App() {
  return (
    <Router>
        <Navbar />
            <Routes>
            <Route exact path='/' element={<Index />} />
                <Route path='/teamLocker' element={<teamLocker />} />
                <Route path='/playerLocker' element={<playerLocker />} />
            </Routes>
        </Router>
    );
}

export default App;
