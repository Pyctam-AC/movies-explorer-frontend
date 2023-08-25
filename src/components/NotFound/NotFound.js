import React from 'react';
import './NotFound.css';
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();

  const back = () => navigate(-1);

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button onClick={back} className="not-found__back-btn">
        Назад
      </button>
    </div>
  );
};

export default NotFound
