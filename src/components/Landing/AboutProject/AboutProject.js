import { forwardRef } from 'react';
import './AboutProject.css'

const AboutProject = () => {
  return (
    <section className='about-project'>
      <div className='page__wraper'>
        <div className='text__container'>
          <h2 id="AboutProject" className='section__title'>О проекте</h2>
          <ul className='table__text'>
            <li className='table__cell'>
              <h3 className='table__title'>
                Дипломный проект включал 5 этапов
              </h3>
              <p className='table__text'>
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </p>
            </li>
            <li className='table__cell'>
              <h3 className='table__title'>
                На выполнение диплома ушло 5 недель
              </h3>
              <p className='table__text'>
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </li>
          </ul>
          <ul className='weeks'>
            <li className='one__week'>
              <p className='text__week'>1 неделя</p>
            </li>
            <li className='for__week'>
              <p className='text__week'>4 недели</p>
            </li>
          </ul>
          <ul className='weeks weeks_span'>
            <li className='one__week span__theme'>Back-end</li>
            <li className='for__week span__theme'>Front-end</li>
          </ul>
        </div>
      </div>

    </section>
  );
};

export default forwardRef (AboutProject);
