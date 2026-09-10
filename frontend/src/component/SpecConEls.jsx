import React from 'react';

/**
 * The definitions of special consideration and ELS. Shared by every page that
 * explains an adjustment, so the two schemes are always described the same way.
 */
export const SpecConElsSummary = () => (
  <>
    <p>In this course, students can gain adjustments one of two ways:</p>
    <ol>
      <li>
        By applying for{' '}
        <a href="https://www.student.unsw.edu.au/special-consideration" target="_blank">
          special consideration
        </a>
        . When illness or circumstances beyond your control interfere with your assessment
        performance, you may be eligible to apply for Special Consideration; a process for assessing
        the impact of unexpected, short-term events on your ability to complete a specific
        assessment task.
      </li>
      <li>
        By having an{' '}
        <a href="https://www.student.unsw.edu.au/equitable-learning" target="_blank">
          Equitable Learning Services consideration (ELS)
        </a>
        . ELS provides practical support to ensure your mental or physical health conditions do not
        adversely affect your studies.
      </li>
    </ol>
  </>
);

/**
 * How the two schemes play out for an assessment with a due date, i.e. the
 * assignment.
 */
export const SpecConElsExtensions = () => (
  <>
    <h4>Special Consideration</h4>
    <p>
      When you apply for special consideration, they will assess your submission, and if approved,
      email both you and the course account with the extension or adjustment. For any pair/group
      assignment (if applicable to this course), adjustments may be a little less straightforward.
    </p>
    <p>
      Sometimes, the due date will pass before special consideration has made a decision on your
      situation. In this case it's important that:
    </p>
    <ul>
      <li>
        You still make sure you put yourself in a situation where what is on master at the due date
        is your best attempt by that point - just in case special consideration rejects your
        submission.
      </li>
      <li>
        You continue working on your assignment, with the assumption that the number of days
        extension you have is equivalent to the number of days your documentation says you were
        impacted for.
      </li>
    </ul>

    <h4>ELS</h4>
    <p>
      ELS situations are dealt with by emailing the lecturer-in-charge within a week before an
      assessment is due. They will extend the due date of your personal assessment.
    </p>
  </>
);

/**
 * How the two schemes play out for the in-class quizzes, which are sat live and
 * so can't simply have their due date pushed out.
 */
export const SpecConElsQuizzes = () => (
  <>
    <p>
      Quizzes are sat live, so an adjustment can't work the way an extension on an assignment does.
      Each quiz runs at a number of times across the week it is scheduled in, and the sitting you
      are placed in by default depends on the day of your tutorial.
    </p>
    <h4>What an adjustment gets you</h4>
    <p>
      Special consideration or an ELS arrangement will allow you to sit the quiz at an alternative
      time <b>within the regular scheduled window for that quiz</b> - that is, at one of the other
      sittings running that week. Email the lecturer-in-charge as soon as you know you will need
      this, so that an alternative sitting can be arranged for you.
    </p>
    <h4>If you can't make any of the scheduled windows</h4>
    <p>
      We do not run additional quiz sittings outside of that window. If you are unable to make any
      of the scheduled windows for a quiz, then at the end of the course we will take an estimate of
      what you would have scored on that quiz, based on your performance in the final exam.
    </p>
  </>
);
