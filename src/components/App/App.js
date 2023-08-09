import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import usePopupClose from "../../hooks/usePopupClose";
import { registerTitle, loginTitle, errTitle, okTitle } from '../../utils/constans/popupTitles';


function App() {

  const navigate = useNavigate();

  //логика попапов
  const [isPopupVisible, popupVisible] = useState(false);
  const [title, titlePopupVisible] = useState(null);

  const openPopup = (/* titlePopup */) => {
    popupVisible(true);
    titlePopupVisible(okTitle)
  }


  const [isRegistrOk, registrOkPopup] = useState(true);
  const [isLoginOk, loginOkPopup] = useState(true);
  const [registr, regPopup] = useState(false);
  const [login, logPopup] = useState(false);

  const [isErrorPopupVisible, ErrorPopupVisible] = useState(false);

  const [isNavBarVisible, navBarVisible] = useState(false);

  const registrPopup = () => {regPopup(true)}
  const loginPopup = () => {logPopup(true)}

  const closePopup = () => {
    closeAllPopups();
    if (registr) {
      if (isRegistrOk) {navigate("/singin")};
    }
    if (login) {
      if (isLoginOk) {navigate("/movies")};
    }
  };

  const handlOpenNav = () => {
    navBarVisible(!isNavBarVisible);
  };

  const closeAllPopups = () => {
    popupVisible(false);
    regPopup(false);
    logPopup(false);
    /* loginOkPopupVisible(false) */
    /* ErrorPopupVisible(false); */
    /* registrOkPopupVisible(false); */
  };

  usePopupClose(
    isPopupVisible,
    "popup_opened",
    closeAllPopups
  );

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/singin"
          element={
            <>
              <Login
                openPopup={openPopup}
                loginPopup={loginPopup}
              />
              <Popup
                isOpen={isPopupVisible}
                title={title}
                isOk={isLoginOk}
                onClose={closePopup}
              />
            </>
          }
        />
        <Route
          path="/singup"
          element={
            <>
              <Register
                openPopup={openPopup}
                registrPopup={registrPopup} />
              <Popup
                isOpen={isPopupVisible}
                title={title}
                isOk={isRegistrOk}
                onClose={closePopup}
              />
            </>
          }
        />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;


/*

    <Routes>
      <Route
        path="/"
        element={
          <Promo />
        }
      />
      <Route
        path="/signup"
        element={
          <Register />
        }
      />
      <Route
        path="/signin"
        element={
          <Login />
        }
      />
      <Route
        path="/movies"
        element={
          <Movies />
        }
      />
      <Route
        path="/saved-movies"
        element={
          <SavedMovies />
        }
      />

    </Routes>

*/
