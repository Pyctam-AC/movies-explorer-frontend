import React from "react";
import { useState, useEffect } from "react";
import './Card.css';
import { BASE_URL_MOVIE } from "../../../utils/constans/moviesUrl";

const Card = ({ card, mouves, onSaveMovie, onCardDelete, savedMovies }) => {

//проверяем сохранённые фильмы
  const [isSaved, setSave] = useState(false);

  useEffect(() => {
    if (mouves) {
      if (savedMovies.some((movie) => movie.movieId === card.id)) {
        setSave(true);
      }
    }
  }, [mouves, savedMovies, card.id]);

// ссылки на картинки
  const imgUrl = `${BASE_URL_MOVIE}${card.image.url}`;

//обозначем продолжительность
  const convertTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const time = `
      ${hours === 0 ? "" : hours + "ч"}
      ${minutes === 0 ? "00" : minutes}м
      `;
    return time;
  };


  const handleSave = () => onSaveMovie(card, setSave);

  const handleDeleteClick = () => {
    onCardDelete(card._id || card.id, setSave)
  };

  return (
    <li className="mouve__item" key={card._id}>
      <div className="mouve-container">
        <div className="mouve__info">
          <h2 className="mouve__title">{card.nameRU}</h2>
          <span className="mouve__duration">{convertTime(card.duration)}</span>
        </div>
        {mouves ? (
          <button
            type="button"
            aria-label="Сохранить фильм"
            onClick={isSaved ? handleDeleteClick : handleSave}
            className={`save-mouvie
              ${isSaved ? "save-mouvie_active" : "save-mouvie_none"}
            `}
          />
        ) : (
          <button
            type="button"
            aria-label="Сохранить фильм"
            onClick={handleDeleteClick}
            className={`save-mouvie save-mouvie_delete `}
          />
        )}
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={mouves ? imgUrl : card.image}
          className="mouve__img"
          alt={card.nameRU}
        />
      </a>
    </li>
  );
};

export default Card;
