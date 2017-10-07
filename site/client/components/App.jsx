import React  from 'react';
import { stitch } from 'keo';
import NavBar from './NavBar';
import Header from './Header';

const render = ({props}) => {
  return (
    <div>
      <NavBar title="Personal Finance" />
      <Header text="Hello World!" />
    </div>
  );
};

export default stitch({render});
