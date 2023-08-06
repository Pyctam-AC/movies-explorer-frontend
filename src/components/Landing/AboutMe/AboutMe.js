import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <div className='page__wraper'>
        <div className='text__container'>
          <h2 className='section__title'>Студент</h2>
          <div className='info-table'>
            <article className='student-info'>
              <h3 className='student-name'>Rustam</h3>
              <p className='student-profession'>
                Фронтенд-разработчик
              </p>
              <p className='student-history'>
                Я родился и живу в Саратове, закончил факультет экономики СГУ.
                У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                После того, как прошёл курс по веб-разработке,
                начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <a href='https://github.com/Pyctam-AC'
                className='student-link'
              >
                GitHub
              </a>
            </article>
            <img src='https://avatars.githubusercontent.com/u/117826387?s=400&u=626c2b63343eb9d64efd1d1e9b849fae35eeca0e&v=4'
              className='student-foto'
              alt='student foto'
            />
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutMe;
