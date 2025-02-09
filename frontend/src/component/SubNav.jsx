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
    setValue(menu.map(m => `/${getters.term}${baseUrl}/${m.subRoute}`).indexOf(pathname))
  }, [pathname, getters.term]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ minWidth: '400px', position: 'fixed', top: 61, zIndex: 0, left: getters.sidebarOpen ? '230px' : 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {menu.map(({ title, icon, subRoute }, key) => (
            <BottomNavigationAction key={key} label={title} icon={icon} onClick={() => navigate(`/${getters.term}${baseUrl}/${subRoute}`)} />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default SubNav;