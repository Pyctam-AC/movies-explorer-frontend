import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  handleSearcheMouves,
  changeFilter,
  filterDuration,
  dataSearch
}) => {

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    handleSearcheMouves(data.search);
  };

  useEffect(() => {
      let defaultValues = {};
      defaultValues.search = dataSearch;
      reset({ ...defaultValues });
  }, [dataSearch, reset]);

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
          errors="true"
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
