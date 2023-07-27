import React from 'react';
import './Promo.css';
import Header from '../../Header/Header';
import web from '../../../images/text__COLOR_landing-logo.svg';

const Promo = () => {
  return (
    <section className="promo">
      <Header />
      <div className="landing__wraper">
        <div className='hero__landing'>
          <article className="hero__text-conteiner">
            <h1 className="hero__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="hero__text">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <button className="hero__btn">Узнать больше</button>
          </article>
          <img src={web} className="hero__img" alt="web world" />
        </div>
      </div>
    </section>
  );
};
export default Promo;
