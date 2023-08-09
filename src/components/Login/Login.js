import React from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputForm from "../InputForm/InputForm";
import Header from "../Header/Header";
import SingForm from "../SingForm/SingForm";

function Login({ authData, loggedIn, openPopup, loginPopup }) {

  const navigate = useNavigate();


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    /* authData(data); */
    openPopup();
    loginPopup();
  };

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [reset]);

  return (
    <div className="sing-page">
      <Header
        sing={true}
      />
      <SingForm
        name="login"
        title="Рады видеть!"
        buttonTitle="Войти"
        onSubmit={handleSubmit(onSubmit)}
        text='Ещё не зарегистрированы?'
        location='/singin'
        link='/singup'
        textLink='Регистрация'
        /* isValid={isValid}
        isLoading={isLoading}
        isDirty={isDirty} */
      >
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
            /* placeholder="Email" */
            errors={errors}
            spanTitle='E-mail'
            sing={true}
          />
          <InputForm
            type="password"
            {...register("password", {
              required: "Введите пароль",
            })}
            name="password"
            span
            errors={errors}
            spanTitle='Пароль'
            /* placeholder="Пароль" */
            sing={true}
            autoComplete="on"
          />
      </SingForm>
    </div>
  );
};

export default Login;
