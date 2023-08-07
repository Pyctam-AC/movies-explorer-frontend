import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <div className='page__wraper'>
        <h5 className='portfolio-title'>Портфолио</h5>
        <nav className='portfolio-nav'>
          <a href='https://pyctam-ac.github.io/how-to-learn/index.html'
            className='nav-content'
            target="_blank" rel="noreferrer"
          >
            <p className='nav-text'>Статичный сайт</p>
            <p className='nav-link'>↗</p>
          </a>
          <a href='https://pyctam-ac.github.io/russian-travel/index.html'
            className='nav-content'
            target="_blank" rel="noreferrer"
          >
            <p className='nav-text'>Адаптивный сайт</p>
            <p
              className='nav-link'>↗</p>
          </a>
          <a href='https://pyctam-ac.github.io/react-mesto-auth/index.html'
            className='nav-content'
            target="_blank" rel="noreferrer"
          >
            <p className='nav-text'>Одностраничное приложение</p>
            <p className='nav-link'>↗</p>
          </a>
        </nav>

      </div>
    </section>
  );
};

export default Portfolio;
