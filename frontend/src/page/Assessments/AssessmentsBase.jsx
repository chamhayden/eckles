import React from 'react';
import { Outlet } from 'react-router-dom';

import makePage from '../../component/makePage';

const AssessmentsBase = ({ }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AssessmentsBase;