import './FilterCheckbox.css';

const FilterCheckbox = ({changeFilter, filterDuration}) => {

  return (
    <div className='checkbox-container'>
      <div
        className={`filter-checkbox ${filterDuration? 'filter-checkbox_active' : ''}`}
        onClick={changeFilter}
      >
        <span className={`filter-togle ${filterDuration? 'filter-togle_active' : ''}`}></span>
      </div>
      <h4 className={`search__title ${filterDuration? 'search__title_active' : ''}`} >
        Короткометражки
      </h4>
    </div>
  );
};

export default FilterCheckbox;
