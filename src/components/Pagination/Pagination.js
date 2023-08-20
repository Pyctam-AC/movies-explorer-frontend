import './Pagination.css';

const Pagination = ({
  showMoreCards
  }) => {


  return (
    <section className='page__wraper'>
      <button
        className='paginaton'
        onClick={showMoreCards}
      >
        Ещё
      </button>
    </section>
  );
};

export default Pagination;
