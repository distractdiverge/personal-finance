import React  from 'react';
import { stitch } from 'keo';
import NavBar from './NavBar';
import Daily from './cards/Daily';
import Weekly from './cards/Weekly';
import Monthly from './cards/Monthly';
import Yearly from './cards/Yearly';
import Longer from './cards/Longer';

const render = ({props}) => {
  return (
    <div>
      <NavBar title="Personal Finance" />
      <div className="cards">
        <Daily />
        <Weekly />
        <Monthly />
        <Yearly />
        <Longer />
      </div>
    </div>
  );
};

export default stitch({render});
