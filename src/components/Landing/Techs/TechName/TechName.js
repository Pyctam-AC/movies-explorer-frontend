import React from 'react';

function TechName({ text }) {
  return (
    <li className='stack-cell'>
      <p className='stack-text'>
        { text }
      </p>
    </li>
  );
}

export default TechName;
