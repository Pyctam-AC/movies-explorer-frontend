// проверяем на совпадения в поиске
const searchMovies = (
  moviesNameRU,
  searchLowerCase,
  ) => {
  return moviesNameRU.includes(searchLowerCase);
};

// ищем коротометражки в поиске
const searchMoviesDuration = (
  movies,
  moviesNameRU,
  searchLowerCase,
  ) => {

  if (movies.duration < 40) {
    return searchMovies(moviesNameRU, searchLowerCase);
  }
};

const filterDurationSearch = (movies, filterDuration) => {
  if (filterDuration) {
    return movies.duration < 40;
  }
  return movies;
}

// проверяем основные запросы, и есть-ли запрос на корометражки
const filterSearchMovies = (
  res,
  searchText,
  filterDuration,
  )  => {
  return res.filter(movies => {
    if (!searchText) {
      return filterDurationSearch(movies, filterDuration)
    }
    if (filterDuration) {
      return searchMoviesDuration(movies, movies.nameRU.toLowerCase(), searchText.toLowerCase());
    }
    return searchMovies(movies.nameRU.toLowerCase(), searchText.toLowerCase());
  });
}

export default filterSearchMovies;
