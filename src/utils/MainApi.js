import { MAIN_URL } from "./constans/mainUrl";

//export const MAIN_URL = 'http://localhost:4000';
//export const MAIN_URL = 'api.movie-sultangaliev.nomoredomains.xyz';

const getResult = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject (`Ошибка: ${res.status}`)
  }
};

export const register = (data) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(res => getResult (res))
};

export const autorize = (data) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(res => getResult (res))
};

export const getDataUser = () => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(res => getResult (res))
}

export const setInfoProfile = (data) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    })
    .then(res => getResult (res))
}

export const logOut = () => {
  return fetch(`${MAIN_URL}/signout`, {
//    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(),
  })
    .then(res => getResult (res))
}

export const getMovies =() => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then(res => getResult (res));
}

export const createMovies =(data) => {
  return fetch(`${MAIN_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  .then(res => getResult (res));
}

export const deleteMovie = (movieId) => {
  return fetch(`${MAIN_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then(res => getResult (res));
}

