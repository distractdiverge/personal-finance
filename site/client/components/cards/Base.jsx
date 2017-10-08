import React from 'react';
import PropTypes  from 'prop-types';
import { stitch } from 'keo';

const propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  content: PropTypes.node
};

const render = ({props}) => {
  return (
    <div className="card pt-card pt-elevation-2 pt-interactive">
      <h2>{props.title}</h2>
      {props.content}
    </div>
  );
};

export default stitch({render, propTypes});
