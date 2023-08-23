import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputForm from "../InputForm/InputForm";
import Header from "../Header/Header";
import {Link, useLocation} from 'react-router-dom';
import './SingForm.css'

function SingForm(props) {

  const location = useLocation();

  return (
      <form
        name={props.name}
        className='sing-form'
        noValidate
        onSubmit={props.onSubmit}
      >
        <h3 className="form-title">{props.title}</h3>
        {props.children}
        <button
          disabled={props.isLoading}
          type="submit"
          className={`form-button
            ${props.reg? "form-button_register" : ""}`}
        >
          {props.buttonTitle}
        </button>
        <div className="form-footer">
          <p className="form-text">{props.text}</p>
          {location.pathname === props.location && (
            <Link to={props.link} className='form-link'>
              {props.textLink}
            </Link>
          )}
        </div>
      </form>
  );
};

export default SingForm;
