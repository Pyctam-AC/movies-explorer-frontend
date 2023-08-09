import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {Link, useLocation} from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';


const Movies = () => {
  return (
    <div className='page__wraper'>
      <Header />
      <section className='movies'>
        <SearchForm />
        <MouvesCards />
        <Pagination />
        <Footer />
      </section>
    </div>
  );
};

export default Movies;
