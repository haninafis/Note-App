import React from 'react';
import { Link } from 'react-router-dom';
import { LocaleConsumer } from '../contexts/LocaleContext';

class NotFound extends React.Component{
    render(){
        return (
            <LocaleConsumer>
            {
              ({ locale }) => {
                return (
                    <div>
                        <h2>404</h2>
                        <p>{locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}</p>
                        <p><Link to="/">{locale === 'id' ? 'Kembali ke halaman awal' : 'Go to Home'}</Link></p>
                    </div>
                )
              }
            }
          </LocaleConsumer>
        )
    }
}
export default NotFound;