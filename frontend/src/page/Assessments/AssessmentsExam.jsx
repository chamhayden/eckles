import React from 'react';

import Exam22T1 from './Exams/Exam22T1';
import makePage from '../../component/makePage';
import { Context, useContext } from '../../context';

const AssessmentsExam = () => {
  const { getters } = useContext(Context);
  if (getters.term === '22T1') {
    return <Exam22T1 />
  } else {
    return <>This is a sample exam page!</>;
  }
}

export default makePage(AssessmentsExam, {
  loginRequired: true,
  title: 'Exam',
});