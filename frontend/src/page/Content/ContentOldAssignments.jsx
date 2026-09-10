import React from 'react';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import AssPrint from '../../component/AssPrint';
import { ass2a, ass2b, ass3a, ass3b, ass4a, ass4b } from '../Assessments/Assignments/AssMd';

import SubNavWrapper from '../../component/SubNavWrapper';
import makePage from '../../component/makePage';

// These specs are kept for reference only, so the sections about handing work
// in no longer apply.
const OMITTED_SECTIONS = [
  'Git Commit Requirements',
  'Originality of Work',
  'Submission',
  'Late Submission Policy',
];

const ContentOldAssignments = ({}) => {
  const params = useParams();
  const menu = [
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
    <SubNavWrapper baseUrl={'/content/old-assignments'} menu={menu}>
      <>
        <h3 style={{ marginTop: 0 }}>
          These assignments ran in previous terms and are provided for reference only. They are not
          assessed this term.
        </h3>
        {params.ass === 'ass2' ? (
          <AssPrint mda={ass2a} mdb={ass2b} assNumber={2} omit={OMITTED_SECTIONS} alwaysReleased />
        ) : params.ass === 'ass3' ? (
          <AssPrint mda={ass3a} mdb={ass3b} assNumber={3} omit={OMITTED_SECTIONS} alwaysReleased />
        ) : params.ass === 'ass4' ? (
          <AssPrint mda={ass4a} mdb={ass4b} assNumber={4} omit={OMITTED_SECTIONS} alwaysReleased />
        ) : (
          <></>
        )}
      </>
    </SubNavWrapper>
  );
};

export default makePage(ContentOldAssignments, {
  loginRequired: true,
  title: 'Content > Old Assignments',
});
