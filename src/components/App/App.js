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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as MainApi from  '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { BASE_URL_MOVIE } from '../../utils/constans/moviesUrl';
import filterSearchMovies from '../../hooks/filterSearcheMovies';



function App() {

  const navigate = useNavigate();

  //регистрация пользователя

  const registrationUser = (data) => {
    MainApi.register(data)
      .then(() => {
        openPopup(registerTitle);
        registrOkPopup(true);
        regPopup(true);
      })
      .catch((err) => {
        console.log(err);
        openPopup(err.message ?? errTitle);
        registrOkPopup(false);
      });
  };

  //авторизация пользователя

  const [emailUser, setUserData] = useState(null);

  const [loggedIn, setLoggedIn] = useState(null);

  const [currentUser, setUserInfo] = useState(null);

  const authorizationUser = (data) => {
    setUserData(data.email);
    MainApi.autorize(data)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        /* checkToken(); */

        openPopup(loginTitle);
        loginOkPopup(true);
        logPopup(true);
        navigate("/movies");
        setUserInfo(data.user);
      })
      .catch((err) => {
        console.log(err);
        openPopup(err.message ?? errTitle);
        loginOkPopup(false);
      });
  };

  //аутентификация пользователя

  const checkToken = () => {
    MainApi.getDataUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          /* setUserData(res.user.email); */
          setUserInfo(res);
          navigate("/movies");
        } else {
          setLoggedIn(false);
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

// изменение данных пользователя
  const [isEditableForm, setIsEditableForm] = useState(false);

  const editFormOpen = () => {
    setIsEditableForm(true);
  }

  const onUpdateUser = (dataUser) => {
    /* setIsLoading(true); */
    MainApi
      .setInfoProfile(dataUser)
      .then((data) => {
        setUserInfo(data);
      })
      .then(() => {
        setIsEditableForm(false);
      })
      .catch((err) => console.log(err))
      /* .finally(() => setIsLoading(false)); */
  };

// выход из учётной записи
  const handleLogOut = () => {
    MainApi
      .logOut()
      .then()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate('/');
        setLoggedIn(false);
      });
  };

  //сохранение фильмов
  const [savedMovies, setSavedMovies] = useState([]);

  const [saveMoviesAll, setSavedMoviesAll] = useState([]);

  const onSaveMovie = (movie, setSave) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BASE_URL_MOVIE + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: BASE_URL_MOVIE + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    };

    MainApi
      .createMovies(movieData)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setSave(true);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    renderSavedMovies();
  }, [])

  const renderSavedMovies = () => {
    MainApi
      .getMovies()
      .then((movies) => {
        console.log(movies)
        setSavedMovies(movies)
        setSavedMoviesAll(movies)
      })
      .catch((e) => console.log(e));
  }

// проверяем в сетйте был-ли запрос поиска
  const [submit, setSubmit] = useState(false);

// сохраняем текст запроса в стейт
  const [saveData, setSaveData] = useState(null);

  // делаем поиск карточек в полученном массиве
  const searchMovies = (data, duration) => {
    setSubmit(true);
    const result = filterSearchMovies(saveMoviesAll, data, duration);
    setSavedMovies(result);
  }

  const handleSearcheMouves = (data) => {
    //setIsLoading(true);
    setSaveData(data);
    searchMovies(data, filterDuration)
    //setIsLoading(false);
  };

  // изменение фильтра короткометражек
  const [filterDuration, setFilter] = useState(false);

  const changeFilter = () => {
    if (submit) {
      if (filterDuration) {
        setFilter(false);
        searchMovies(saveData, false)
        //setSubmit(false)
      }
      else {
        setFilter(true)
        searchMovies(saveData, true)
        //setSubmit(false)
      }
    }
    else if (filterDuration) {
      setFilter(false);
    }

    else {
      setFilter(true);
    }
  }

// удаление сохранённых фильмов

  const onCardDelete = (movieId, setSave) => {
    MainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movieId));
        setSave(false);
      })
      .catch((e) => console.log(e));
  }

  const onCardMovieDelete = (id, setSave) => {
    const cardDeleteID = savedMovies.filter((c) => c.movieId === id);

    onCardDelete(cardDeleteID[0]._id, setSave);
  }

  //логика попапов
  const [isPopupVisible, popupVisible] = useState(false);
  const [title, titlePopupVisible] = useState(null);

  const openPopup = (titlePopup) => {
    popupVisible(true);
    titlePopupVisible(titlePopup)
  }


  const [isRegistrOk, registrOkPopup] = useState(true);
  const [isLoginOk, loginOkPopup] = useState(true);
  const [registr, regPopup] = useState(false);
  const [login, logPopup] = useState(false);

  const closePopup = () => {
    closeAllPopups();
    if (registr) {
      if (isRegistrOk) {navigate("/singin")};
    }
/*     if (login) {
      if (isLoginOk) {navigate("/movies")};
    } */
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
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/singin"
            element={
              <>
                <Login
                  /* openPopup={openPopup} */
                  authorizationUser={(data) => authorizationUser (data)}
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
                  registrationUser={(data) => registrationUser(data)}
                  /* registrPopup={registrPopup} */ />
                <Popup
                  isOpen={isPopupVisible}
                  title={title}
                  isOk={isRegistrOk}
                  onClose={closePopup}
                />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={<Movies
                  onSaveMovie={(movie, setSave) => onSaveMovie(movie, setSave)}
                  savedMovies={savedMovies}
                  onCardDelete={(id, setSave) => onCardMovieDelete(id, setSave)}
                />}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={<SavedMovies
                  cards={savedMovies}
                  onCardDelete={(id, setSave) => onCardDelete(id, setSave)}
                  handleSearcheMouves={(data) => handleSearcheMouves(data)}
                  changeFilter={changeFilter}
                  filterDuration={filterDuration}
                />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <Profile
                    onUpdateUser={(data) => onUpdateUser(data)}
                    btnForm={isEditableForm}
                    editFormOpen={editFormOpen}
                    handleLogOut={handleLogOut}
                  />
                }
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
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
