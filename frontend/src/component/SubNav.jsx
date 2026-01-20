import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from 'react-router-dom';

import { Context, useContext } from '../context';

const SubNav = ({ menu, baseUrl, sidebarOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const { getters } = useContext(Context);

  React.useEffect(() => {
    setValue(menu.map((m) => `/${getters.term}${baseUrl}/${m.subRoute}`).indexOf(pathname));
  }, [pathname, getters.term]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          minWidth: '400px',
          position: 'fixed',
          top: 60,
          zIndex: 0,
          left: getters.sidebarOpen ? '230px' : 0,
          right: 0,
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
        }}
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              transition: 'all 0.3s ease',
              borderRadius: '8px',
              margin: '4px',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
              },
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            },
          }}
        >
          {menu.map(({ title, icon, subRoute }, key) => (
            <BottomNavigationAction
              key={key}
              label={title}
              icon={icon}
              onClick={() => navigate(`/${getters.term}${baseUrl}/${subRoute}`)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default SubNav;
