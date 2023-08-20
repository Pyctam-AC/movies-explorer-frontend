import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import InputSearch from './InputSearch/InputSearch';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  handleSearcheMouves,
  changeFilter,
  filterDuration,
}) => {

  const location = useLocation();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ mode: "onChange" });

  // итория поиска из localStorage
/*   const saveSearcheText = (data) => {
    localStorage.removeItem("historySearch");
    localStorage.setItem("historySearch", JSON.stringify({ data }));
  }; */

//  const [dataSearch, setSaveData] = useState(null)

/*   useEffect(() => {
    if (location.pathname === "/movies") {
    const historySearch = localStorage.getItem('historySearch');
      if (historySearch) {
        const savedSearch = JSON.parse(historySearch)
        setSaveData(savedSearch.data)
      }
    }
  }, []) */

  const onSubmit = (data) => {
    handleSearcheMouves(data.search);
/*     setSaveData(data.search);
    saveSearcheText(data.search); */
  };

/*   useEffect(() => {
      let defaultValues = {};
      defaultValues.search = dataSearch;
      reset({ ...defaultValues });
  }, [reset]); */

  return (
    <section className="page__wraper">
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="loupa" />
        <input
          {...register("search", {
            required: "хоть одну букву напиши для поиска",
          })}
          name="search"
          type="text"
          className="search-input"
          placeholder="Фильм"
          errors={true}
        />
        {errors && (
          <span className="error">{errors["search"]?.message || ""}</span>
        )}
        <button type="submit" className="find-button" />
        <FilterCheckbox
          changeFilter={changeFilter}
          filterDuration={filterDuration}
        />
      </form>
    </section>
  );
};

export default SearchForm;
