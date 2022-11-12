import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DetailPage from './Pages/DetailPage';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1><Link to="/">Aplikasi Catatan</Link></h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/notes/:id" element={<DetailPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
