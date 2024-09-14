import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { useLocation } from "react-router-dom"


import { makeStyles } from "@mui/styles";

import External from '../asset/external.png';
import Logout from './Logout';
import Header from './Header';
import mainlogo from '../asset/mainlogo.png';
import { isMobileWidth } from '../util/screen';
import { Context, useContext } from '../context';

import { getPrimaryNavList, getSecondaryNavList } from './NavList';

const ExternalIcon = () => {
  return <img style={{ width: '15px' }} src={External} />;
}

const background = 'rgb(22,27,37) !important';

const useStyles = makeStyles({
  paper: {
    background,
    color: '#fff !important',
  }
});

export default function ClippedDrawer({ children, drawerWidth, sidebarOpen, setSidebarOpen }) {

  const { getters, setters } = useContext(Context);
  const primaryNav = getPrimaryNavList(getters.term);
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(Array(primaryNav.length).fill(true));

  const handleClick = (key) => {
    const newOpen = [...open];
    newOpen[key] = !newOpen[key];
    setOpen(newOpen);
  };

  const redirect = route => {
    if (route.includes('http')) {
      window.open(route, '_blank').focus();
    } else {
      navigate(route);
    }
  };

  const getUrl = (route, external) => {
    if (external) return route;
    return `/${getters.term}${route}`;
  }

  const boldIfPage = route => {
    if (route === '/') {
      return pathname === route;
    } else {
      return pathname.includes(route);
    }
  }

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{ paper: classes.paper }}
        sx={{
          width: drawerWidth,
          display: getters.sidebarOpen ? 'block' : 'none',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto', paddingTop: '60px' }}>
          <Box sx={{ cursor: 'pointer', position: 'fixed', top: 0, height: '60px', width: drawerWidth, backgroundColor: background, zIndex: 999, borderBottom: '1px solid #333' }} onClick={() => navigate(`/${getters.term}`)}>
            <img src={mainlogo} style={{ height: '59px', marginBottom: '10px', float: 'left' }} />
            <Typography sx={{ float: 'left ',fontSize: '1.3em', paddingTop: '15px', paddingLeft: '15px' }}>
              COMP6080
            </Typography>
          </Box>

          <List>
          {primaryNav.map(({ external, title, route, Icon, children, loginRequired }, key) => {
            if (!getters.loggedIn && loginRequired) {
              return <span key={key}></span>
            }
            const clickFn = route ? () => redirect(getUrl(route, external)) : () => handleClick(key);
            return (
              <span key={key}>
                <ListItem button onClick={clickFn} selected={boldIfPage(route)}>
                  <ListItemIcon>
                    <Icon style={{fill: 'white'}} />
                  </ListItemIcon>
                  <ListItemText sx={{ fontWeight: 'bold' }} primary={title} />
                  {external && <ExternalIcon />}
                  {children ? open[key] ? <ExpandLess /> : <ExpandMore /> : <></>}
                </ListItem>
                {children &&
                  <Collapse in={open[key]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {children.map((child, key2) => {
                        const external2 = child.external;
                        const route2 = child.route;
                        const clickFn2 = route2 ? () => redirect(getUrl(route2, external2)) : () => handleClick(key2);
                        if (getters.loggedIn || !child.loginRequired) {
                          return (
                            <ListItemButton sx={{ pl: 5 }} key={key2} onClick={clickFn2} selected={boldIfPage(child.route)}>
                              <ListItemIcon>
                                <child.Icon style={{fill: 'white'}} />
                              </ListItemIcon>
                              <ListItemText primary={child.title} /> 
                              {external2 && <ExternalIcon />}
                            </ListItemButton>
                          );
                        }
                      })}
                    </List>
                  </Collapse>
                }
              </span>
            );
          })}
          </List>
          {getters.loggedIn && <Divider sx={{borderColor: '#666', margin: '0 15px' }} />}
          <List>
          {getSecondaryNavList(getters.term).map(({ external, title, Icon, route, loginRequired }, key) => {
            if (!getters.loggedIn && loginRequired) {
              return <span key={key}></span>
            }
            return (
              <ListItem button key={key} onClick={() => redirect(getUrl(route, external))} selected={boldIfPage(route)}>
                <ListItemIcon>
                  <Icon style={{fill: 'white'}} />
                </ListItemIcon>
                <ListItemText primary={title} />
                {external && <ExternalIcon />}
              </ListItem>
            );
          })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}