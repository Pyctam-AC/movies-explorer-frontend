import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import headerLogo from '../../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';
import HeaderMain from './HeaderMain/HeaderMain';
import Navigation from '../Navigation/Navigation';

const Header = ({
  emailUser,
  handleLogOut,
  handlOpenNav,
  isOpen,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  const handleLanding = () => {
    navigate("/");
  }

  return (
    <header className={`header ${isOpen ? "header_open" : ""}`}>
      <img
        src={headerLogo}
        className="header__logo"
        alt="логоотип"
        onClick={handleLanding}
      />
      {/* <nav className="header__nav">
        {location.pathname === "/" && (
          <>
            <Link to="/signup" className="header__nav-link">
              Регистрация
            </Link>
            <Link to="/signin" className="singin-link" /* onClick={handleLogOut} >
              Войти
            </Link>
          </>
        )}
      </nav> */}
      {location.pathname === "/" && (<Navigation />)}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__nav-link header__nav-link_sing">
          Войти
        </Link>
      )}
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__nav-link header__nav-link_sing">
          Регистрация
        </Link>
      )}

       {location.pathname === "/" && (
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
      )}
    </header>
  );
};

export default Header;
