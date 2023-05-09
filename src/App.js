import './App.css';
import React from 'react'
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom'
import Info from './components/Info'
import Home from './components/Home'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
