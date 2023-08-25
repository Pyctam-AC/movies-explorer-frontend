import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputForm from "../InputForm/InputForm";
import logo from '../../images/logo.svg';
import SingForm from "../SingForm/SingForm";

function Login({ authorizationUser, isLoading }) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    authorizationUser(data);
  };

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [reset]);

  return (
    <div className="sing-page">
      <Link to="/"><img className="login__logo" src={logo} alt="Лого" /></Link>
      <SingForm
        name="login"
        title="Рады видеть!"
        buttonTitle="Войти"
        onSubmit={handleSubmit(onSubmit)}
        text='Ещё не зарегистрированы?'
        location='/singin'
        link='/singup'
        textLink='Регистрация'
        isLoading={isLoading}
        isValid={isValid}
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
            sing={true}
            autoComplete="on"
          />
      </SingForm>
    </div>
  );
};

export default Login;
