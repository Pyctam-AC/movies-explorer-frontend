import React from 'react';
import { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';
import Footer from '../Footer/Footer';



const SavedMovies = ({cards, onCardDelete, handleSearcheMouves, changeFilter, filterDuration, loggedIn, currentUser, resetSearch}) => {

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



/*    //лайки
   const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .setLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаление карточки
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }; */
