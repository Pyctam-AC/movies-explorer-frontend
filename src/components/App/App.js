import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, } from 'react-router-dom';
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
import {getMovies} from '../../utils/MoviesApi'



function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

//регистрация пользователя

  const registrationUser = (data) => {
    setIsLoading(true)
    MainApi.register(data)
      .then((data) => {
        openPopup(registerTitle);
        registrOkPopup(true);
        regPopup(true);
        setLoggedIn(true);
        setUserInfo(data.user);
      })
      .catch((err) => {
        console.log(err);
        openPopup(err.message ?? errTitle);
        registrOkPopup(false);
      })
      .finally(() => setIsLoading(false))
  };

//авторизация пользователя

  const [loggedIn, setLoggedIn] = useState(null);

  const [currentUser, setUserInfo] = useState(null);

  const authorizationUser = (data) => {
    setIsLoading(true)
    MainApi.autorize(data)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        /* checkToken(); */

        /* openPopup(loginTitle);
        loginOkPopup(true); */
        navigate("/movies");
        setUserInfo(data.user);
      })
      .catch((err) => {
        console.log(err);
        openPopup(err.message ?? errTitle);
        //loginOkPopup(false);
      })
      .finally(() => {
        setIsLoading(false)
        //loginOkPopup(false)
      })
  };

  //аутентификация пользователя

  const checkToken = () => {
    MainApi.getDataUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserInfo(res);
          navigate(location.pathname, { replace: true });
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

  const resetBtnForm = () => {
    setIsEditableForm(false)
  }

  const onUpdateUser = (dataUser) => {
    setIsLoading(true)
    MainApi
      .setInfoProfile(dataUser)
      .then((data) => {
        setUserInfo(data);
        openPopup(okTitle);
        profileOkPopup(true);
      })
      .then(() => {
        setIsEditableForm(false);
      })
      .catch((err) => {
        console.log(err)
        openPopup(err.message ?? errTitle);
      })
      .finally(() => setIsLoading(false))
  };

// выход из учётной записи
  const handleLogOut = () => {
    MainApi
      .logOut()
      .then(() => {
        localStorage.clear()
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
        openPopup(err.message ?? errTitle);
      })
      .finally(() => {
        navigate('/', { replace: true })
      });
  };

  // стейт всех карточек
  const [mouvesAll, setMouvesAll] = useState([]);

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
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([newMovie, ...savedMovies]))
        setSave(true);
        setSavedMoviesAll([newMovie, ...savedMovies])
      })
      .catch((e) => {
        console.log(e)
        openPopup(e.message ?? errTitle);
      });
  };

  const getMoviesAll = () => {
    getMovies()
      .then((res) => {
        console.log(res);
        setMouvesAll(res);
      })
      .catch((e) => console.log(e));
  };

//сохранение фильмов
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [savedMoviesAll, setSavedMoviesAll] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);

  const renderSavedMovies = () => {
    MainApi
      .getMovies()
      .then((movies) => {
        console.log(movies)
        setSavedMovies(movies.filter((movie) => {
            if (movie.owner === currentUser._id) {
              return movie;
            }
          }))
        setSavedMoviesAll(movies.filter((movie) => {
          if (movie.owner === currentUser._id) {
            return movie;
          }
        }))

        localStorage.setItem('savedMovies', JSON.stringify(movies.filter((movie) => {
          if (movie.owner === currentUser._id) {
            return movie;
          }
        })))
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (loggedIn) {
      renderSavedMovies();
      getMoviesAll();
    };
  }, [loggedIn])

// делаем поиск карточек в полученном массиве при смене фильтра короткометражек
  const searchMovies = (data, duration) => {
    const result = filterSearchMovies(savedMoviesAll, data, duration);
    setSavedMovies(result);
  }
// поиск карточек по сабмиту
  const handleSearcheMouves = (data) => {
    setSubmit(true);
    setSaveData(data);
    searchMovies(data, filterDuration)
  };

  // проверяем в сетйте был-ли запрос поиска
  const [submit, setSubmit] = useState(false);

 // сохраняем текст запроса в стейт
  const [saveData, setSaveData] = useState(null);

  // изменение фильтра короткометражек
  const [filterDuration, setFilter] = useState(false);

  const changeFilter = () => {
    if (submit) {
      if (filterDuration) {
        setFilter(false);
        searchMovies(saveData, false)
      }
      else {
        setFilter(true)
        searchMovies(saveData, true)
      }
    }
    else if (filterDuration) {
      setFilter(false);
      searchMovies(null, false)
    }

    else {
      setFilter(true);
      searchMovies(null, true)
    }
  }

  const resetSearch = () => {
    setFilter(false);
    setSaveData(null);
    setSubmit(false);
    // setSavedMovies(savedMovies);
  }

// удаление сохранённых фильмов

  const onCardDelete = (movieId, setSave) => {
    MainApi
      .deleteMovie(movieId)
      .then(() => {

        const deletedMovies = savedMovies.filter(
          (c) => c._id !== movieId);

        setSavedMovies((state) => state.filter((c) => c._id !== movieId));
        localStorage.setItem('savedMovies', JSON.stringify(deletedMovies));
        setSave(false);
      })
      .catch((e) => {
        console.log(e)
        openPopup(e.message ?? errTitle)
      });
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


  const [isRegistrOk, registrOkPopup] = useState(false);
  const [isLoginOk, loginOkPopup] = useState(false);
  const [registr, regPopup] = useState(false);
  const [isProfileOk, profileOkPopup] = useState(false);

  const closePopup = () => {
    closeAllPopups();
    if (registr) {
      if (isRegistrOk) {navigate("/movies")};
    }
  };

  const closeAllPopups = () => {
    popupVisible(false);
    regPopup(false);
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
          <Route path="/" element={<Landing loggedIn={loggedIn}/>} />
          <Route
            path="/singin"
            element={
              <>
                <Login
                  authorizationUser={(data) => authorizationUser (data)}
                  isLoading={isLoading}
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
                  isLoading={isLoading}
                />
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
                  loggedIn={loggedIn}
                  mouvesAll={mouvesAll}
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
                  loggedIn={loggedIn}
                  currentUser={currentUser}
                  resetSearch={resetSearch}
                  //renederListMovies={renederListMovies}
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
                  <>
                    <Profile
                      onUpdateUser={(data) => onUpdateUser(data)}
                      btnForm={isEditableForm}
                      editFormOpen={editFormOpen}
                      handleLogOut={handleLogOut}
                      loggedIn={loggedIn}
                      isLoading={isLoading}
                      resetBtnForm={resetBtnForm}
                    />
                    <Popup
                      isOpen={isPopupVisible}
                      title={title}
                      isOk={isProfileOk}
                      onClose={closePopup}
                    />
                  </>
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


/*         setSavedMovies(movies.filter(movie => {
          if (movie.owner === currentUser._id ) {
            return movies
          }
        }));
        localStorage.setItem('savedMovies', JSON.stringify(movies.filter(movie => {
          if (movie.owner === currentUser._id ) {
            return movies
          }
        }))); */
