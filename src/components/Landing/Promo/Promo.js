import React from 'react';
import { useRef } from 'react';
/* import {Link, NavLink, useLocation} from 'react-router-dom'; */
import './Promo.css';
import { Link } from 'react-scroll';
import Header from '../../Header/Header';
import web from '../../../images/text__COLOR_landing-logo.svg';

const Promo = () => {

  return (
    <section className="promo">
      <Header />
      <div className="page__wraper">
        <div className='hero__landing'>
          <article className="hero__text-conteiner">
            <h1 className="hero__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="hero__text">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
            <Link
              to="AboutProject"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="hero__btn"
            >
              О проекте
            </Link>
          </article>
          <img src={web} className="hero__img" alt="картинка земеного шара из слов web world" />
        </div>
      </div>
    </section>
  );
};
export default Promo;
