import React from 'react';
import PropTypes from 'prop-types';
import {stitch} from 'keo';
import Base from './Base';

const propTypes = {};

const render = ({props}) => {
    return (
      <Base className="longer-term-card" title="Yearly Overview">
      </Base>
    );
};

export default stitch({render, propTypes});
