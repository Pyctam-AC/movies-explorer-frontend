import './Techs.css';
import stackNames from '../../../utils/constans/stackName'
import TechName from './TechName/TechName';

const Techs = () => {
  return (
    <section className='stack'>
      <div className='page__wraper'>
        <div className='text__container'>
          <h2 className='section__title'>Технологии</h2>
          <h3 className='stack-title'>8 технологий</h3>
          <p className='stack-subtitle'>
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <ul className='stacks-list'>
            {
              stackNames.map((tech, i) => <TechName key={i} text={ tech } />)
            }
          </ul>
        </div>
      </div>

    </section>
  );
};

export default Techs;
