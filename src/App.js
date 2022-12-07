import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DetailPage from './Pages/DetailPage';
import AddPage from './Pages/AddPage';
import ArchivedPage from './Pages/ArchivedPage';
import { Link } from 'react-router-dom';
import Navigation from './Components/Navigation';
import NotFound from './Pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
    };
  }
  
  render() {
    if (this.state.authedUser === null) {
      return (
        <div className='app-container'>
          <header>
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<p>Halaman Login</p>} />
              <Route path="/register" element={<p>Halaman Register</p>} />
            </Routes>
          </main>
        </div>
      )
    }
    
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
            <Route path="/archives" element={<ArchivedPage/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
