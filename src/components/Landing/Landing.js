import React from 'react';
import './Landing.css'
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const Landing = ({loggedIn}) => {

  return (
      <div className='landing'>
        <Promo loggedIn={loggedIn}/>
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </div>
    );
  };
export default Landing;
