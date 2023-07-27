import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Landing from '../Landing/Landing';
import SavedMovies from '../SavedMovies/SavedMovies';


function App() {
  return (
    <div className='page'>
      <Routes>
          <Route path='/start' element={<Landing />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
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
