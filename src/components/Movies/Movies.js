import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {Link, useLocation} from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MouvesCards from '../MouvesCards/MouvesCards';
import Pagination from '../Pagination/Pagination';
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import {getMovies} from '../../utils/MoviesApi'
import filterSearchMovies from '../../hooks/filterSearcheMovies';
import Preloader from '../Preloader/Preloader';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import {
  LG_ROW_CARD_COUNT,
  MD_ROW_CARD_COUNT,
  SM_ROW_CARD_COUNT,
  LG_INITIAL_CARD_COUNT,
  MD_INITIAL_CARD_COUNT,
  SM_INITIAL_CARD_COUNT
} from '../../utils/constans/amountCards'

//let amount = window.screen.width > 769 ? 12 : 8;

const Movies = ({onSaveMovie, savedMovies, onCardDelete}) => {

// стейт эффекта загрузки
  const [isLoading, setIsLoading] = useState(false);

// стейт всех карточек
  const [mouvesAll, setMouvesAll] = useState([]);

// сохраняем в стейте карточки после поиска
  const [mouvesCards, setSearchedMouves] = useState([]);

// сохраняем текст запроса в стейт
  const [saveData, setSaveData] = useState(null);

// сохраняем в сетйте был-ли запрос поиска
  const [submit, setSubmit] = useState(false);

// стейт фильтра короткометражек
  const [filterDuration, setFilter] = useState(false);

// загрузка страницы, получаем все фильмы, сбрасываем некоторые стейты фильтра и сабмита
  useEffect(() => {
    //setFilter(false);
    //setSubmit(false)
    getMovies()
      .then((res) => {
        // console.log(res)
        setMouvesAll(res)})
      .catch((e) => console.log(e))
  }, []);

// итория поиска из localStorage
  const saveSearche = (data, result, duration, submit) => {
    localStorage.removeItem('historySearch')
    localStorage.setItem('historySearch', JSON.stringify({data, result, duration, submit}));
  }

  useEffect(() => {
    const historySearch = localStorage.getItem('historySearch');
    if (historySearch) {
      const savedSearch = JSON.parse(historySearch)
      setFilter(savedSearch.duration);
      setSubmit(savedSearch.submit);
      setSaveData(savedSearch.data)
      setSearchedMouves(savedSearch.result);
      setShowCards(savedSearch.result);
    }
  }, [])

// количество карточек при изменении экрана

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

// кнопка ещё
  const showMoreCards =() => {
  //  calculateCardCount();
    if (isDesktop) {
      setShowCards(mouvesCards.slice(0, position + LG_ROW_CARD_COUNT));
      setPosition(position + 3);
    }
    else {
      setShowCards(mouvesCards.slice(0, position + MD_ROW_CARD_COUNT));
      setPosition(position + SM_ROW_CARD_COUNT);
    }
  }

// количество карточек на экране
  const [showCards, setShowCards] = useState(mouvesCards.slice(0, initialCardCount))
  const [position, setPosition] = useState(initialCardCount);


// делаем поиск карточек в полученном массиве
  const searchMovies = (data, duration) => {
    setSubmit(true);
    const result = filterSearchMovies(mouvesAll, data, duration);
    console.log(result);
    setSearchedMouves(result);
    saveSearche(data, result, duration, submit);
    setShowCards(result.slice(0, initialCardCount));
    setPosition(initialCardCount)
  }

  const handleSearcheMouves = (data) => {
    setIsLoading(true);
    setSaveData(data);
    searchMovies(data, filterDuration)
    setIsLoading(false);
  };

// изменение фильтра короткометражек
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

  return (
    <div className='page__wraper'>
      <Header />
      <section className='movies'>
        <SearchForm
          handleSearcheMouves={(data) => handleSearcheMouves(data)}
          changeFilter={changeFilter}
          filterDuration={filterDuration}
          submitSearch={submit}
          dataSearch={saveData}
        />
        {isLoading ? (<Preloader />) : null}
        {mouvesCards?.length && !isLoading ?
          <MouvesCards
            cards={showCards}
            mouves={true}
            onSaveMovie={onSaveMovie}
            savedMovies={savedMovies}
            onCardDelete={onCardDelete}
          /> :
          (!isLoading && <p className="movies__not-found" >
            Кина не будет
          </p>)
        }
        {mouvesCards?.length > position ?
          <Pagination
            showMoreCards={showMoreCards}
          /> :
          null
        }
        <Footer />
      </section>
    </div>
  );
};

export default Movies;

//const [showCards, setShowCards] = useState(mouvesCards?.slice(0, amount))


/*   const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  }; */

/*     if (width > 769) {
      setShowCards(result.slice(0, 12))
      setPosition(12);
    }
    else if (769 > width > 480) {
      setShowCards(result.slice(0, 8))
      setPosition(8);
    }
    else {
      setShowCards(result.slice(0, 5))
      setPosition(5);
    } */


    /*    if (width > 769) {
      setShowCards(result.slice(0, 12))
      setPosition(12);
    }
    else if (769 > width > 480) {
      setShowCards(result.slice(0, 8))
      setPosition(8);
    }
    else {
      setShowCards(result.slice(0, 5))
      setPosition(5);
    }*/
