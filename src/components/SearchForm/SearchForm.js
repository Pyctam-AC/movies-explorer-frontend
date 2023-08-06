import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import InputSearch from './InputSearch/InputSearch';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

const SearchForm = () => {

  const { register, reset, handleSubmit } = useForm({ mode: 'onBlur' });

  const [searchedMouves, setSearchedMouves] = useState([]);


  const [rendered, setRendered] = useState(false);

  return (
    <section className='page__wraper'>
      <form
        className='search-form'
        /* onSubmit={handleSubmit(onSubmit)} */
      >
        <div className='loupa'/>
        <InputSearch
          type='text'
          className='search-input'
          placeholder='Фильм'
        />
        <button
          type='submit'
          className='find-button'
        />
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;
