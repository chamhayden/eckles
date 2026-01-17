import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Outlet, useParams } from 'react-router-dom';
import { Context, useContext } from '../../context';

import AssPrint from '../../component/AssPrint';
import { ass1a, ass1b, ass2a, ass2b, ass3a, ass3b, ass4a, ass4b } from './Assignments/AssMd';

import SubNavWrapper from '../../component/SubNavWrapper';
import makePage from '../../component/makePage';
import config from '../../config';
import { apiCall } from '../../util/api';

const AssessmentsAssignments = ({}) => {
  const { getters, setters } = useContext(Context);
  const [groupInfo, setGroupInfo] = React.useState(null);
  React.useEffect(() => {
    apiCall(`${getters.term}/groupinfo`, {}, 'GET').then((data) => {
      setGroupInfo(data);
    });
  }, []);

  const params = useParams();
  const menu = [
    {
      title: 'Ass1',
      icon: <TheatersIcon />,
      subRoute: 'ass1',
    },
    {
      title: 'Ass2',
      icon: <SchoolIcon />,
      subRoute: 'ass2',
    },
    {
      title: 'Ass3',
      icon: <FavoriteIcon />,
      subRoute: 'ass3',
    },
    {
      title: 'Ass4',
      icon: <LocalHospitalIcon />,
      subRoute: 'ass4',
    },
  ];

  return (
    <SubNavWrapper baseUrl={'/assessments/assignments'} menu={menu}>
      <>
        {['22T1', '22T3', '23T1', '23T3', '24T1', '24T3', '25T1'].indexOf(getters.term) === -1 ? (
          <>
            {params.ass === 'ass4' && (
              <>
                <h3 style={{ marginTop: 0 }}>Here is some information about your group</h3>
                {groupInfo ? (
                  <>
                    {!groupInfo.assignmentReady ? (
                      <>
                        <span style={{ fontSize: '2em', color: 'red' }}>
                          ⚠️⚠️⚠️ You have yet to complete the preference form for this assignment
                          ⚠️⚠️⚠️ - see the week 5 & 6 course notices for the form. EVERY student
                          must fill in this form to get access to your repo, regardless of if you're
                          working alone or not.
                        </span>
                      </>
                    ) : (
                      <>
                        Your assignment repo has been created. You are <> </>
                        {groupInfo.inGroup ? (
                          <>
                            working in a group with z{groupInfo.groupZid}
                            @unsw.edu.au.
                          </>
                        ) : (
                          <>working alone.</>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>Loading...</>
                )}
                <br />
                <br />
                <hr />
              </>
            )}
            {params.ass === 'ass1' ? (
              <AssPrint mda={ass1a} mdb={ass1b} assNumber={1} startWeek={1} />
            ) : params.ass === 'ass2' ? (
              <AssPrint mda={ass2a} mdb={ass2b} assNumber={2} startWeek={3} />
            ) : params.ass === 'ass3' ? (
              <AssPrint mda={ass3a} mdb={ass3b} assNumber={3} startWeek={4} />
            ) : params.ass === 'ass4' ? (
              <AssPrint mda={ass4a} mdb={ass4b} assNumber={4} startWeek={6} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <h2>
              You can find a link to {params.ass}{' '}
              <a
                target="_blank"
                href={`${config.BASE_URL}/gitlabredir/${getters.term}/${params.ass}`}
              >
                here
              </a>
              .
            </h2>
            <h3>
              Please note: This URL will return a gitlab 404 error until the lecturer announces that
              the assignment is released.
            </h3>
          </>
        )}
      </>
    </SubNavWrapper>
  );
};

export default makePage(AssessmentsAssignments, {
  loginRequired: true,
  title: 'Assessments > Assignments',
});
