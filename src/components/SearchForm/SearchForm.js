import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SearchForm = () => {

  const { register, reset, handleSubmit } = useForm({ mode: 'onBlur' });

  const [searchedMouves, setSearchedMouves] = useState([]);


  const [rendered, setRendered] = useState(false);

  return (
    <section>
      <form
        className=''
        /* onSubmit={handleSubmit(onSubmit)} */
      >
        <input
          {...register('searchValue', {
            required: { value: true, message: 'Это поле нужно заполнить' },
          })}
          type='text'
          className=''
          placeholder='Фильм'
        />
        <button
          type='submit'
          className=''
        />
      </form>
    </section>
  );
};

export default SearchForm;
