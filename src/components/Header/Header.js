import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerBtn from './BurgerBtn/BurgerBtn';

const Header = ({
  loggedIn,
  sing,
}) => {

  const navigate = useNavigate();

  const handleLanding = () => {
    navigate("/");
  };

  const [isNavBarVisible, navBarVisible] = useState(false);

  const handlOpenNav = () => {
    navBarVisible(!isNavBarVisible);
  };

  const elementLogin = (
    <nav className="header__nav">
      <Link to="/singup" className="header__nav-link">
        Регистрация
      </Link>
      <Link to="/singin" className="singin-link">
        Войти
      </Link>
    </nav>
  );

  return (
    <div className="page__wraper">
      <header
        className={`header
        ${sing ? "header_sing" : ""}`}
      >
        <img
          src={headerLogo}
          className="header__logo"
          alt="логотип"
          onClick={handleLanding}
        />

        {loggedIn ? (<Navigation
          isNavBarVisible={isNavBarVisible}
          handlOpenNav={handlOpenNav}
        />) : elementLogin}

        {loggedIn ? (<BurgerBtn
            isNavBarVisible={isNavBarVisible}
            handlOpenNav={handlOpenNav}
          />) : null}

      </header>
    </div>
  );
};

export default Header;

