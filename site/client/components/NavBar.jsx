import React  from 'react';
import PropTypes from 'prop-types';
import { stitch } from 'keo';

const propTypes = {
  title: PropTypes.string.isRequired
}

const render = ({props}) => {
  return (
    <nav className="pt-navbar pt-dark">
      <div style={{margin: "0 auto",  width: "480px"}}>
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">{props.title}</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-home">Home</button>
          <button class="pt-button pt-minimal pt-icon-document">Files</button>
          <span className="pt-navbar-divider"></span>
          <button className="pt-button pt-minimal pt-icon-user"></button>
          <button className="pt-button pt-minimal pt-icon-notifications"></button>
          <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
      </div>
    </nav>
  );
};

export default stitch({render, propTypes});
