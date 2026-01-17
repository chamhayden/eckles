import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';

import mainlogo from '../asset/doggie.png';
import { Context, useContext } from '../context';
import { makeStyles } from '@mui/styles';

import { getPrimaryNavList, getSecondaryNavList } from './NavList';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ExternalIcon = () => {
  return <OpenInNewIcon sx={{fontSize : '16px'}} />;
};

const background = 'linear-gradient(180deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%) !important';

const useStyles = makeStyles({
  paper: {
    background,
    color: '#fff !important',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
  },
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

  const redirect = (route) => {
    if (route.includes('http')) {
      window.open(route, '_blank').focus();
    } else {
      navigate(route);
    }
  };

  const getUrl = (route, external) => {
    if (external) return route;
    return `/${getters.term}${route}`;
  };

  const boldIfPage = (route) => {
    if (!route) {
      return false;
    }
    if (route === '/') {
      return pathname === route;
    }
    const baseRoute = route.endsWith('/search') ? route.slice(0, -'/search'.length) : route;
    return pathname.includes(baseRoute);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{ paper: classes.paper }}
        sx={{
          width: drawerWidth,
          display: getters.sidebarOpen ? 'block' : 'none',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', paddingTop: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'fixed',
              top: 0,
              height: '60px',
              width: drawerWidth,
              background: 'linear-gradient(180deg, rgb(15, 23, 42) 0%, rgb(20, 27, 48) 100%)',
              zIndex: 999,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(180deg, rgb(20, 27, 48) 0%, rgb(25, 32, 53) 100%)',
              },
            }}
            onClick={() => navigate(`/${getters.term}`)}
          >
            <img
              src={mainlogo}
              style={{
                height: '40px',
                transition: 'transform 0.3s ease',
              }}
              alt={'main-logo'}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            />
            <Typography
              sx={{
                fontSize: '1.15em',
                paddingLeft: '15px',
                paddingTop: '19px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              COMP6080
            </Typography>
          </Box>

          <List>
            {primaryNav.map(({ external, title, route, Icon, children, loginRequired }, key) => {
              if (!getters.loggedIn && loginRequired) {
                return <span key={key}></span>;
              }
              const clickFn = route
                ? () => redirect(getUrl(route, external))
                : () => handleClick(key);
              return (
                <span key={key}>
                  <ListItem
                    button
                    onClick={clickFn}
                    selected={boldIfPage(route)}
                    sx={{
                      margin: '2px 8px',
                      padding: '2px 26px 2px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '40px',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        transform: 'translateX(4px)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderLeft: '3px solid #3b82f6',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.25)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon style={{ fill: 'white', fontSize: '16px' }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          paddingTop: '15px',
                        },
                      }}
                      sx={{
                        my: 0,
                      }}
                      primary={title}
                    />
                    {external && <ExternalIcon />}
                    {children ? open[key] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" /> : <></>}
                  </ListItem>
                  {children && (
                    <Collapse in={open[key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {children.map((child, key2) => {
                          const external2 = child.external;
                          const route2 = child.route;
                          const clickFn2 = route2
                            ? () => redirect(getUrl(route2, external2))
                            : () => handleClick(key2);
                          if (getters.loggedIn || !child.loginRequired) {
                            return (
                              <ListItemButton
                                sx={{
                                  pl: 5,
                                  pr: 2,
                                  margin: '1px 8px',
                                  paddingTop: '0px',
                                  paddingBottom: '0px',
                                  borderRadius: '8px',
                                  transition: 'all 0.2s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  minHeight: '44px',
                                  '&:hover': {
                                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                    transform: 'translateX(4px)',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                    '&:hover': {
                                      backgroundColor: 'rgba(139, 92, 246, 0.25)',
                                    },
                                  },
                                }}
                                key={key2}
                                onClick={clickFn2}
                                selected={boldIfPage(child.route)}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <child.Icon style={{ fill: 'white', fontSize: '16px' }} />
                                </ListItemIcon>
                                <ListItemText
                                  primaryTypographyProps={{
                                    sx: {
                                      fontSize: '0.85rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                      paddingTop: '15px',
                                    },
                                  }}
                                  sx={{
                                    my: 0,
                                  }}
                                  primary={child.title}
                                />
                                {external2 && <ExternalIcon />}
                              </ListItemButton>
                            );
                          }
                        })}
                      </List>
                    </Collapse>
                  )}
                </span>
              );
            })}
          </List>
          {getters.loggedIn && (
            <Divider
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.15)',
                margin: '8px 15px',
              }}
            />
          )}
          <List>
            {getSecondaryNavList(getters.term).map(
              ({ external, title, Icon, route, loginRequired }, key) => {
                if (!getters.loggedIn && loginRequired) {
                  return <span key={key}></span>;
                }
                return (
                  <ListItem
                    button
                    key={key}
                    onClick={() => redirect(getUrl(route, external))}
                    selected={boldIfPage(route)}
                    sx={{
                      margin: '2px 8px',
                      padding: '2px 26px 2px 26px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '40px',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        transform: 'translateX(4px)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderLeft: '3px solid #3b82f6',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.25)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon style={{ fill: 'white', fontSize: '16px' }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '0.9rem',
                          paddingTop: '15px',
                          display: 'flex',
                          alignItems: 'center',
                        },
                      }}
                      sx={{
                        my: 0,
                      }}
                      primary={title}
                    />
                    {external && <ExternalIcon />}
                  </ListItem>
                );
              }
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
