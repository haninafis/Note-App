import React from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';

function ToggleLocale() {
    return (
        <LocaleConsumer>
            {
                ({ locale, toggleLocale}) => {
                    return (
                        <nav className="navigation">
                            <ul>
                                <li><button className='toggle-locale' onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
                            </ul>
                        </nav>
                    )
                }
            }
      </LocaleConsumer>
    );
}

export default ToggleLocale;