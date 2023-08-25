import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import './Profile.css'
import InputForm from "../InputForm/InputForm";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile ({ onUpdateUser, handleLogOut, editFormOpen, btnForm, loggedIn, resetBtnForm, isLoading, isChangeErr }) {

  const currentUser = useContext(CurrentUserContext);

  const onSubmit = (data) => {
    onUpdateUser(data);
  };

  const {
    register,
    formState: { errors, isDirty },
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
    resetBtnForm()
  }, [currentUser, reset]);

  return (
    <div className='page__wraper'>
      <Header
        loggedIn={loggedIn}
      />
      <section className="page__wraper">
        <form
          name="profile"
          className="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          // isDirty='isdirty'
        >
          <h3 className="profile-title">{`Привет, ${currentUser?.name}!`}</h3>
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
            disabled={!btnForm || isLoading}
            profile={true}
          />

          <span className={`profile-err-message ${isChangeErr ? 'profile-err-message_active' : ''}`}>
            При обновлении профиля произошла ошибка.
          </span>
          {btnForm ? (<button
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            className={`save-button ${!isDirty || isLoading ? "save-button_disabled" : " " }`}
            disabled={!isDirty}
          >
            {isLoading ? 'Меняем данные...' : 'Сохранить'}
          </button>) : null}

          {btnForm ? null : (<button
            type="button"
            className='button-profile'
            onClick={editFormOpen}
          >
            Редактировать
          </button>)}

          {btnForm ? null : (<button
            type="button"
            onClick={handleLogOut}
            className='profile-logout'
          >
            Выйти из аккаунта
          </button>)}
        </form>
      </section>
    </div>
  );
};

export default Profile;
