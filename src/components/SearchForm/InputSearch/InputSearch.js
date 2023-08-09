const InputSearch = ({
    type,
    name,
    placeholder,
    required,
    onChange,
  }) => {
  return (
    <input
      required={required}
      type={type}
      name={name}
      placeholder={placeholder}
      className="search-input"
      /* onChange={ handleChange } */
    />
  );
};

export default InputSearch;
