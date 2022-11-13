import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DetailPage from './Pages/DetailPage';
import AddPage from './Pages/AddPage';
import { Link } from 'react-router-dom';
import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1><Link to="/">Aplikasi Catatan</Link></h1>
        <Navigation/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/notes/:id" element={<DetailPage/>} />
          <Route path="/notes/new" element={<AddPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
