import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import makePage from '../component/makePage';
import Table from '../component/Table';

import { Context, useContext } from '../context';

const DueDateAdjustments = () => {
  return (
    <>
      <h4 style={{ marginTop: 0 }}>Summary</h4>
      <p>In this course, students can gain extensions one of two ways:</p>
      <ol>
        <li>
          By applying for{' '}
          <a href="https://www.student.unsw.edu.au/special-consideration" target="_blank">
            special consideration
          </a>
          . When illness or circumstances beyond your control interfere with your assessment
          performance, you may be eligible to apply for Special Consideration; a process for
          assessing the impact of unexpected, short-term events on your ability to complete a
          specific assessment task.
        </li>
        <li>
          By having an{' '}
          <a href="https://www.student.unsw.edu.au/equitable-learning" target="_blank">
            Equitable Learning Services consideration (ELS)
          </a>
          . ELS provides practical support to ensure your mental or physical health conditions do
          not adversely affect your studies.
        </li>
      </ol>

      <h4>1. Special Consideration</h4>
      <p>
        When you apply for special consideration, they will assess your submission, and if approved,
        email both you and the course account with the extension or adjustment. For any pair/group
        assignment (if applicable to this course), adjustmens may be a little less straightforward.
      </p>
      <p>
        Sometimes, the due date will pass before special consideration has made a decision on your
        situation. In this case it's important that you:
      </p>
      <ul>
        <li>
          You still make sure you put yourself in a situation where what is on master at the due
          date is your best attempt by that point - just in case special consideration rejects your
          submission.
        </li>
        <li>
          You continue working on your assignment, with the assumption that the number of days
          extension you have is equivalent to the number of days your documentation says you were
          impacted for.
        </li>
      </ul>

      <h4>2. ELS</h4>
      <p>
        ELS situations are dealt with my emailing the lecturer-in-charge within a week before an
        assessment is due. They will extend the due date of your personal assessment.
      </p>
    </>
  );
};

export default makePage(DueDateAdjustments, {
  loginRequired: true,
  title: '🕰️ Due Date Adjustments',
});
