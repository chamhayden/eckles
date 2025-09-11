import React from 'react';

import Exam22T1 from './Exams/Exam22T1';
import Exam22T3 from './Exams/Exam22T3';
import Exam23T1 from './Exams/Exam23T1';
import Exam23T3 from './Exams/Exam23T3';
import Exam24T1 from './Exams/Exam24T1';
import Exam24T3 from './Exams/Exam24T3';
import Exam25T1 from './Exams/Exam25T1';
import Exam25T3 from './Exams/Exam25T3';
import makePage from '../../component/makePage';
import { Context, useContext } from '../../context';
import { apiCall } from '../../util/api';

const AssessmentsExam = () => {
  const { getters } = useContext(Context);
  const [examInfo, setExamInfo] = React.useState(null);

  React.useEffect(() => {
    apiCall(`${getters.term}/exam`, {}, 'GET')
      .then(data => {
        if (data.room) {
          setExamInfo(data);
        }
      })
  }, []);
  let Component = <>This is a sample exam page!</>;
  if (getters.term === '22T1') {
    Component = <Exam22T1 />
  } else if (getters.term === '22T3') {
    Component = <Exam22T3 />
  } else if (getters.term === '23T1') {
    Component = <Exam23T1 />
  } else if (getters.term === '23T3') {
    Component = <Exam23T3 />
  } else if (getters.term === '24T1') {
    Component = <Exam24T1 />
  } else if (getters.term === '24T3') {
    Component = <Exam24T3 />
  } else if (getters.term === '25T1') {
    Component = <Exam25T1 />
  } else if (getters.term === '25T3') {
    Component = <Exam25T3 />
  }

  return <>
    {examInfo && <div style={{ margin: '20px', padding: '5px 20px', border: '1px solid #333' }}>
      <h3>Your personal exam info</h3>
      <ul>
        <li>Room: {examInfo.room}</li>
        <li>Date: {examInfo.date}</li>
        <li>Start time: {examInfo.start}</li>
        <li>End time: {examInfo.end}</li>
      </ul>
    </div>}
    {Component}
  </>
}

export default makePage(AssessmentsExam, {
  loginRequired: true,
  title: 'Exam',
});