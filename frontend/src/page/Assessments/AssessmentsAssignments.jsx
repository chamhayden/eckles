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

import SubNavWrapper from '../../component/SubNavWrapper';
import makePage from '../../component/makePage';
import config from '../../config';

const AssessmentsAssignments = ({ }) => {
  const { getters, setters } = useContext(Context);
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
        <h2>You can find a link to {params.ass} <a target="_blank" href={`${config.BASE_URL}/gitlabredir/${getters.term}/${params.ass}`}>here</a>.</h2>

        <h3>Please note: This URL will return a gitlab 404 error until the lecturer announces that the assignment is released.</h3>
      </>
    </SubNavWrapper>
  );
};

export default makePage(AssessmentsAssignments, {
  loginRequired: true,
  title: 'Assessments > Assignments',
});
