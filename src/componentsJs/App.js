import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import '../componentsCss/App.css';

import Home from "./Home";
import Intro from "./Intro";
import Header from "./Header";
import Hamburger from "./Hamburger";
import Navbar from "./Navbar";
import IntroText from "./IntroText";
import Roles from "./Roles";
import Abilities from "./Abilities";
import Marsel from "./Marsel";
import Table from "./Table";
import Simulation from "./Simulation";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/IntroText" element={<IntroText />} />
                <Route path="/home" element={<Home />} />
                <Route path="/hamburger" element={<Hamburger />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/abilities" element={<Abilities />} />
                <Route path="/marsel" element={<Marsel />} />
                <Route path="/table" element={<Table />} />
                <Route path="/simulation" element={<Simulation />} />
            </Routes>
        </div>
    );
}


function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}


export default AppWrapper;