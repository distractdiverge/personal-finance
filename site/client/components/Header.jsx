import React from 'react';
import PropTypes from 'prop-types';
import { stitch } from 'keo';

const propTypes = {
  text: PropTypes.string.isRequired
};

const render = ({props}) => {
  return (
    <div style={{textAlign: 'center', marginTop: "1em"}}>
      <h1>{props.text}</h1>
    </div>
  );
};

export default stitch({render, propTypes});
