import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {Link, useLocation} from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';


const Movies = () => {
  return (
    <section className='Movies'>
      <Header />
      <SearchForm />
      <MouvesCards />
    </section>
  );
};

export default Movies;
