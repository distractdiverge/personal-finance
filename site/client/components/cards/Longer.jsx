import React from 'react';
import PropTypes from 'prop-types';
import {stitch} from 'keo';
import Base from './Base';

const propTypes = {};

const render = ({props}) => {
    return (
      <Base title="Longer Term" style={{width: '100%', minHeight: '500px'}}>
      </Base>
    );
};

export default stitch({render, propTypes});
