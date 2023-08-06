import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {Link, useLocation} from 'react-router-dom';
import './Profile.css'
import InputForm from "../InputForm/InputForm";
import Header from "../Header/Header";

function Profile ({ authData, loggedIn }) {

  const [isEditableForm, setIsEditableForm] = useState(false);

  /*isEditableForm, setIsEditableForm */

  const editForm = () => {
    setIsEditableForm(true)
  }

  const onSubmit = (data) => {
/* authData(data); */
    setIsEditableForm(false)
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = "Rustam";
    defaultValues.email = "qwerty@qwerty.com";
    reset({ ...defaultValues });
  }, [reset]);

  return (
    <>
      <Header />
      <section className="page__wraper">
        <form
          name="profile"
          className="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="profile-title">Привет, Rustam!</h3>
          <InputForm
            type="text"
            {...register("name", {
              required: "Напишите ваше имя",
              minLength: {
                value: 2,
                message: "Минимум два символа",
              },
              maxLength: {
                value: 40,
                message: "Максимум сорок символов",
              },
            })}
            name="name"
            placeholder="Напишите ваше имя"
            errors={errors}
            disabled={!isEditableForm}
          />
          <InputForm
            type="text"
            {...register("email", {
              required: "Напишите ваш email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Напишите правильный адрес",
              },
            })}
            name="email"
            placeholder="Напишите Email"
            errors={errors}
            disabled={!isEditableForm}
          />

          <button
            type="button"
            className={`button-profile ${isEditableForm ? 'button__none' : ''}`}
            onClick={editForm}
          >
            Редактировать
          </button>

          <Link to="/singin" className={`profile-logout ${isEditableForm ? 'button__none' : ''}`}>
            Выйти из аккаунта
          </Link>

          <button
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            className={`save-button ${isEditableForm ? '' : 'button__none'}`}
          >
            Сохранить
          </button>

        </form>
      </section>
    </>
  );
};

export default Profile;
