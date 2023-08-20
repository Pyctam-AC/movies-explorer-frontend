import { MOVIES_URL } from "./constans/moviesUrl"

const getResult = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject (`Ошибка: ${res.status}`)
  }
};

export const getMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: 'GET',
/*     headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' */
  })
  .then(res => getResult (res))
}
