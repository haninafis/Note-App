import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DetailPage from './Pages/DetailPage';
import AddPage from './Pages/AddPage';
import ArchivedPage from './Pages/ArchivedPage';
import { Link } from 'react-router-dom';
import Navigation from './Components/Navigation';
import NotFound from './Pages/NotFound';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
 
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }
  
  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <div className='app-container'>
          <header>
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage/>} />
            </Routes>
          </main>
        </div>
      )
    }
    
    return (
      <div className="app-container">
        <header>
          <h1><Link to="/">Aplikasi Catatan</Link></h1>
          <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
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
