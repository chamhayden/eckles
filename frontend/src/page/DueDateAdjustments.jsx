import { Link } from 'react-router-dom';
import * as React from 'react';

import makePage from '../component/makePage';
import config from '../config';
import { SpecConElsSummary, SpecConElsExtensions } from '../component/SpecConEls';

import { Context, useContext } from '../context';

const DueDateAdjustments = () => {
  const { getters } = useContext(Context);
  // From 26T3 the specifics live alongside the assessment they apply to, since
  // an in-class quiz can't simply have its due date pushed out.
  const perAssessment = config.ARCHIVED_ASSIGNMENT_TERMS.includes(getters.term);

  return (
    <>
      <h4 style={{ marginTop: 0 }}>Summary</h4>
      <SpecConElsSummary />

      {perAssessment ? (
        <>
          <p>How an adjustment is applied depends on the assessment it applies to:</p>
          <ul>
            <li>
              <Link to={`/${getters.term}/assessments/assignments`}>Assignment 1</Link> - see the
              "Special Consideration &amp; ELS" section at the end of the spec.
            </li>
            <li>
              <Link to={`/${getters.term}/assessments/quizzes`}>Quizzes</Link> - see the "Special
              Consideration &amp; ELS" section on that page.
            </li>
            <li>
              <Link to={`/${getters.term}/assessments/exam`}>Exam</Link> - adjustments to the final
              exam are handled centrally by UNSW rather than by this course.
            </li>
          </ul>
        </>
      ) : (
        <SpecConElsExtensions />
      )}
    </>
  );
};

export default makePage(DueDateAdjustments, {
  loginRequired: true,
  title: '🕰️ Due Date Adjustments',
});
