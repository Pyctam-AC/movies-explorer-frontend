import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Navigation.css'
import icon from '../../images/icon__COLOR_icon-main.svg';

function Navigation() {

  return (
    <div className='navigation'>
      <nav className='nav-container'>
        <Link to="/start" className="movies-link">
          Фильмы
        </Link>
        <Link to="/start" className="movies-link">
          Сохранённые фильмы
        </Link>
      </nav>
      <Link to="/start" className='account-link'>
        <p className="account-text">Аккаунт</p>
        <img
          src={icon}
          className='account-icon'
          alt='icon'
        />
      </Link>
    </div>
  );
}

export default Navigation;
