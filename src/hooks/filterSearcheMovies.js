// проверяем на совпадения в поиске
const searchMovies = (
  searchText,
  moviesNameRU,
  searchLowerCase,
  ) => {
/*   if (searchText.length === 1) {
    return moviesNameRU.startsWith(searchLowerCase);
  } */
  return moviesNameRU.includes(searchLowerCase);
};

// ищем коротометражки в поиске
const searchMoviesDuration = (
  movies,
  searchText,
  moviesNameRU,
  searchLowerCase,
  ) => {

  if (movies.duration < 40) {
    return searchMovies(searchText, moviesNameRU, searchLowerCase);
  }
};

// проверяем основные запросы, и есть-ли запрос на корометражки
const filterSearchMovies = (
  res,
  searchText,
  filterDuration,
  )  => {
  return res.filter(movies => {
    if (filterDuration) {
      return searchMoviesDuration(movies, searchText, movies.nameRU.toLowerCase(), searchText.toLowerCase());
    }
    return searchMovies(searchText, movies.nameRU.toLowerCase(), searchText.toLowerCase());
  });
}

export default filterSearchMovies;
