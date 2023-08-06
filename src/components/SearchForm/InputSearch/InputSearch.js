const InputSearch = ({
    type,
    name,
    placeholder,
    onChange,
  }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="search-input"
      /* onChange={ handleChange } */
    />
  );
};

export default InputSearch;
