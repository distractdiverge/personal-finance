import React  from 'react';
import { stitch } from 'keo';

const render = ({props}) => {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Hello World</h1>
    </div>
  );
};

export default stitch({render});
