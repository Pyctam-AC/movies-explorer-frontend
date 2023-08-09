import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {Link, useLocation} from 'react-router-dom';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';


const SavedMovies = () => {
  return (
    <div className='page__wraper'>
      <Header />
      <section className='movies'>
        <SearchForm />
        <MouvesCards />
        <Footer />
      </section>
    </div>
  );
};

export default SavedMovies;
