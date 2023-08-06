import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='page__wraper'>
        <article className='footer__info'>
          <h5 className='footer__title'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h5>
          <span className='footer__border'></span>
          <div className='footer__nav'>
            <p className="footer__date">© {new Date().getFullYear()}</p>
            <nav className='footer-links'>
              <a href='https://practicum.yandex.ru/' className='footer__link'>Яндекс.Практикум</a>
              <a href='https://github.com/Pyctam-AC' className='footer__link'>Github</a>
            </nav>
          </div>
        </article>
      </div>
    </footer>
  );
};
export default Footer;
