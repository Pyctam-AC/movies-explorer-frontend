import { forwardRef } from 'react';
import './InputForm.css'

const InputForm = forwardRef(
  function InputForm ({
    type,
    name,
    placeholder,
    onChange,
    errors,
    sing,
    autoComplete,
    spanTitle,
    disabled
  },
    ref
  ) {
  return (
    <>
      {
       sing &&
        <span className='span-title'>
          {spanTitle}
        </span>
      }
      <input
        ref={ref}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`input input_type_${name}
          ${sing? "input_sing-theme" : ""}
          ${errors[name]? "input_invalid" : ""}`}
      />
      {errors &&
        <span className={`error input-error-${name}`}>
          {errors[name]?.message || ""}
        </span>
      }
    </>
  );
});

export default InputForm;
