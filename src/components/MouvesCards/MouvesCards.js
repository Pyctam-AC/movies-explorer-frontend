import React from 'react';
import './MouvesCards.css';
import Card from './Card/Card';

function MouvesCards({cards, mouves, onSaveMovie, savedMovies, onCardDelete}) {

  return (
    <section
      className="page__wraper"
      aria-label="список найденных фильмов"
    >
      <ul className="card-mouvies">

          {cards?.map((item) => (
            <Card
              card={item}
              key={item.id}
              mouves={mouves}
              onSaveMovie={onSaveMovie}
              savedMovies={savedMovies}
              onCardDelete={onCardDelete}
            />
          ))}

      </ul>
    </section>
  );
}

export default MouvesCards;
