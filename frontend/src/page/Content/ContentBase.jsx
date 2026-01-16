import React from 'react';
import { Outlet } from 'react-router-dom';

import makePage from '../../component/makePage';

const ContentBase = ({}) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ContentBase;
