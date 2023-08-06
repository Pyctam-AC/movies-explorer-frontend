import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import headerLogo from '../../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';
import HeaderMain from './HeaderMain/HeaderMain';
import Navigation from '../Navigation/Navigation';
import BurgerBtn from './BurgerBtn/BurgerBtn';

const Header = ({
  emailUser,
  handleLogOut,
  isOpen,
  sing,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const handleLanding = () => {
    navigate("/");
  };

  const [isNavBarVisible, navBarVisible] = useState(false);

  const handlOpenNav = () => {
    navBarVisible(!isNavBarVisible);
  };

  return (
    <div className="page__wraper">
      <header
        className={`header
        ${sing ? "header_sing" : ""}`}
      >
        <img
          src={headerLogo}
          className="header__logo"
          alt="логоотип"
          onClick={handleLanding}
        />
        {location.pathname === "/" && (
          <nav className="header__nav">
            <Link to="/singup" className="header__nav-link">
              Регистрация
            </Link>
            <Link to="/singin" className="singin-link">
              Войти
            </Link>
          </nav>
        )}

        {location.pathname === "/movies" && (
          <Navigation
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <Navigation
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}
        {location.pathname === "/profile" && (
          <Navigation
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}

        {location.pathname === "/movies" && (
          <BurgerBtn
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}
        {location.pathname === "/saved-movies" && (
          <BurgerBtn
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}
        {location.pathname === "/profile" && (
          <BurgerBtn
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />
        )}
      </header>
    </div>
  );
};

export default Header;


/*       {location.pathname === "/signup" && (
        <Link to="/signin" className="header__nav-link header__nav-link_sing">
          Войти
        </Link>
      )}
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__nav-link header__nav-link_sing">
          Регистрация
        </Link>
      )} */


      /*        {location.pathname === "/mouvies" || "/saved-movies" || "/profile" && (
        <>
          <button
            className={`header__burger-btn ${
              isOpen ? "header__burger-btn_open" : ""
            }`}
            onClick={handlOpenNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </>
      )} */
