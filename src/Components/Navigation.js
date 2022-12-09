import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { LocaleConsumer } from '../contexts/LocaleContext';

function Navigation({ logout, name }) {
    return (
      <LocaleConsumer>
        {
          ({ locale }) => {
            return (
              <nav className="navigation">
                <ul>
                    <li><Link to="/archives">{locale === 'id' ? 'Terarsip' : 'Archived'}</Link></li>
                    <li><button onClick={logout} className="button-logout">{name}<FiLogOut /></button></li>
                </ul>
              </nav>
            )
          }
        }
      </LocaleConsumer>
    );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
   
export default Navigation;