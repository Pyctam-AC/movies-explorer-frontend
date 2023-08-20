import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import {Link, useLocation} from 'react-router-dom';
import './Profile.css'
import InputForm from "../InputForm/InputForm";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as MainApi from  '../../utils/MainApi';

function Profile ({ onUpdateUser, handleLogOut, editFormOpen, btnForm }) {

  const currentUser = useContext(CurrentUserContext);

/*   const editFormClose = () => {
    setIsEditableForm(false)
  } */

  //изменение данных пользователя

  const onSubmit = (data) => {
    onUpdateUser(data);
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
    defaultValues.name = currentUser?.name;
    defaultValues.email = currentUser?.email;
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
          <h3 className="profile-title">{currentUser?.name}</h3>
          {/* <span className="profile-span">Имя</span> */}
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
            spanTitle='Имя'
            disabled={!btnForm}
            profile={true}
          />
          {/* <span className="profile-span">email</span> */}
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
            spanTitle='email'
            disabled={!btnForm}
            profile={true}
          />

          <button
            type="button"
            className={`button-profile ${btnForm ? 'button__none' : ''}`}
            onClick={editFormOpen}
          >
            Редактировать
          </button>

          <button
            onClick={handleLogOut}
            className={`profile-logout ${btnForm ? 'button__none' : ''}`}
          >
            Выйти из аккаунта
          </button>

          <button
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            className={`save-button ${btnForm ? '' : 'button__none'}`}
          >
            Сохранить
          </button>

        </form>
      </section>
    </>
  );
};

export default Profile;
