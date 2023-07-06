import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Dashboard from './pages/Dashboard';
import UnidadeConsumidora from './pages/UnidadeConsumidora';
import EnergiaGerada from './pages/EnergiaGerada';
import './App.css';

function App() {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  return (
    <BrowserRouter>
      <Navbar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/unidades" element={<UnidadeConsumidora />} />
          <Route path="/energiaGerada" element={<EnergiaGerada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
