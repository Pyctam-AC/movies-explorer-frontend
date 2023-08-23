import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import InputForm from "../InputForm/InputForm";
import logo from '../../images/logo.svg';
import SingForm from "../SingForm/SingForm";

function Register ({ authData, loggedIn, registrationUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    registrationUser(data);
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
        title="Добро пожаловать!"
        buttonTitle="Зарегистрироваться"
        onSubmit={handleSubmit(onSubmit)}
        text='Уже зарегистрированы?'
        location='/singup'
        link='/singin'
        textLink='Войти'
        reg={true}
        /* isValid={isValid}
        isLoading={isLoading}
        isDirty={isDirty} */
      >
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
            spanTitle='Имя'
            /* placeholder="Напишите ваше имя" */
            errors={errors}
            sing={true}
        />
        <InputForm
            type="text"
            {...register("email", {
              required: "Напишите ваш email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: "Напишите правильный адрес электронной почты",
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
              minLength: {
                value: 4,
                message: "Пароль - не менее четырёх символов",
              },
              maxLength: {
                value: 40,
                message: "Пароль - не более сорок символов",
              },
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

export default Register;
