import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css'
import icon from '../../images/icon__COLOR_icon-main.svg';
import BurgerBtn from '../Header/BurgerBtn/BurgerBtn';

function Navigation({isNavBarVisible, handlOpenNav}) {

  return (
    <div className={`navigation  ${isNavBarVisible ? 'navigation_opened' : ''}`}>
      <div className={`nav-menu  ${isNavBarVisible ? 'nav-menu_opened' : ''}`}>
        <BurgerBtn
          isNavBarVisible={isNavBarVisible}
          handlOpenNav={handlOpenNav}
        />
        <nav className='nav-container'>
        { isNavBarVisible ? <NavLink to="/" className='movies-link' >
            Главная
          </NavLink> : null}
          <NavLink to="/movies" className='movies-link' >
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="movies-link">
            Сохранённые фильмы
          </NavLink>
        </nav>
        <NavLink to="/profile" className='account-link'>
          <p className="account-text">Аккаунт</p>
          <img src={icon} className='account-icon' alt='icon' />
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
