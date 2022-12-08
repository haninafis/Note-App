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
import { ThemeProvider } from './contexts/ThemeContext';
import ToggleTheme from './Components/ToggleTheme';
import { LocaleProvider } from './contexts/LocaleContext';
import ToggleLocale from './Components/ToggleLocale';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'dark',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          }
        });
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          })
        }
      }
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
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }
  
  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className='app-container'>
            <header>
              <h1><Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
              <ToggleLocale/>
              <ToggleTheme/>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
        </LocaleProvider>
      )
    }
    
    return (
      <LocaleProvider value={this.state.localeContext}>
      <ThemeProvider value={this.state}>
        <div className="app-container">
          <header>
            <h1><Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
            <ToggleLocale/>
            <ToggleTheme/>
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
      </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default App;
