import React from "react";
import './Card.css';

const Card = ({
  card,
  }) => {


  return (
    <li className="mouve__item" key={card._id}>
      <div className="mouve-container">
        <div className="mouve__info">
          <h2 className="mouve__title">{card.nameRU}</h2>
          <span className="mouve__duration">{card.duration}</span>
        </div>
        <button
          type="button"
          aria-label="Сохранить фильм"
          className="save-mouvie"
        />
      </div>
      <img
        /* type="button" */
        src={card.image}
        className="mouve__img"
        alt={card.name}
      />
    </li>
  );
};

export default Card;
