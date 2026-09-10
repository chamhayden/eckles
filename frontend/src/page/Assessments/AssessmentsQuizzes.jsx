import React from 'react';
import { Link } from 'react-router-dom';

import makePage from '../../component/makePage';
import { Context, useContext } from '../../context';
import { SpecConElsSummary, SpecConElsQuizzes } from '../../component/SpecConEls';

const AssessmentsQuizzes = ({}) => {
  const { getters } = useContext(Context);
  const link = (path) => `/${getters.term}/${path}`;

  return (
    <>
      <h2 style={{ marginTop: 0 }}>Quizzes</h2>
      <p>
        Quizzes are sat in your tutorial. The quiz you sit, and the week you sit it in, depends on
        the day of your tutorial - the schedule is in section 4.5 of the{' '}
        <Link to={link('course-outline')}>course outline</Link>.
      </p>

      <h3>Timing</h3>
      <ul>
        <li>Each quiz is 45 minutes long.</li>
        <li>
          Quizzes start at <b>5 past the hour</b>, so arrive at your tutorial on time.
        </li>
      </ul>

      <h3>Format</h3>
      <ul>
        <li>
          Every question is a <b>theory</b> question - you write a short answer response to the
          question posed. There is no code to produce and submit.
        </li>
        <li>Questions are worth between 2 and 7 marks each.</li>
      </ul>

      <h3>Conditions</h3>
      <p>
        Quizzes are supervised by your tutor, in person, in your tutorial room. You complete the
        quiz on your own device, on a public website.
      </p>
      <ul>
        <li>
          Your tutor supervises the room to ensure nobody is accessing external materials during the
          quiz.
        </li>
        <li>
          Your screen must be visible to your tutor at all times.
        </li>
      </ul>

      <h3>Leaving the room</h3>
      <p>
        You will be asked to use the restrooms <em>before</em> the quiz begins. If you need to leave
        the room for an emergency during the quiz, that will void your quiz - in that case we will
        instead estimate your mark for that quiz from your final exam performance.
      </p>

      <h3>Special Consideration & ELS</h3>
      <SpecConElsSummary />
      <SpecConElsQuizzes />
    </>
  );
};

export default makePage(AssessmentsQuizzes, {
  loginRequired: true,
  title: 'Assessments > Quizzes',
});
