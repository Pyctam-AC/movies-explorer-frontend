import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function HeaderMain() {

  return (
    <div className='header-main'>
      <nav>
        <Link to="/start" className="header__nav-link">
          Фильмы
        </Link>
        <Link to="/start" className="header__nav-link">
          Сохранённые фильмы
        </Link>
      </nav>
      <Link to="/start" className="singin-link">
        Аккаунт
      </Link>
    </div>
  );
}

export default HeaderMain;
