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
      icon: <SchoolIcon />,
      subRoute: 'ass3',
    },
  ];

  return (
    <SubNavWrapper baseUrl={'/assessments/assignments'} menu={menu}>
      <>
        <h2>{params.ass} has {params.ass === 'test' ? 'not ' : ''} been released!</h2>
        <Button variant="contained" size="large">
          <a style={{ color: '#fff' }} target="_blank" href={params.ass === 'ass3' ? `https://docs.google.com/spreadsheets/d/1ePXvDAZ1ItjZcHtRV1N8Adt03jDrfLfcpS2oi9fA5eA/edit#gid=0` : `/redirect/?path=COMP6080/${getters.term}/students/_/${params.ass}/`}>
            View on gitlab
          </a>
        </Button>
      </>
    </SubNavWrapper>
  );
};

export default makePage(AssessmentsAssignments, {
  loginRequired: true,
  title: 'Assessments > Assignments',
});
