import React from 'react';
import { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';
import Footer from '../Footer/Footer';



const SavedMovies = ({cards, onCardDelete, handleSearcheMouves, changeFilter, filterDuration, loggedIn, currentUser, resetSearch}) => {

  useEffect(() => {
    resetSearch()
  }, [])

  return (
    <div className="page__wraper">
      <Header
        loggedIn={loggedIn}
      />
      <section className="movies">
        <SearchForm
          handleSearcheMouves={handleSearcheMouves}
          changeFilter={changeFilter}
          filterDuration={filterDuration}
        />
        {cards?.length ?
          <MouvesCards
          cards={cards}
          onCardDelete={onCardDelete} /> :
        <p className="movies__not-found" >
            Кина не будет
          </p>}
        <Footer />
      </section>
    </div>
  );
};

export default SavedMovies;
