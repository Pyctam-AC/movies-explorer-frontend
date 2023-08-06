import React from 'react';
import './MouvesCards.css';
import Card from './Card/Card';
import cards from '../../utils/constans/cards'

function MouvesCards() {
  return (
    <section
      className="page__wraper"
      aria-label="список найденных фильмов"
    >
      <ul className="card-mouvies">

          {cards?.map((item) => (
            <Card
              card={item}
              key={item._id}
            />
          ))}

      </ul>
    </section>
  );
}

export default MouvesCards;
