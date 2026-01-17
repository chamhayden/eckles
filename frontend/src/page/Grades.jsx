import SubNav from '../component/SubNav';

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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import makePage from '../component/makePage';

import { apiCall } from '../util/api';
import { Context, useContext } from '../context';

const Grades = () => {
  const { getters, setters } = useContext(Context);
  const [grades, setGrades] = React.useState([]);

  const [zid, setZid] = React.useState('');

  const getGrades = () => {
    apiCall(`gradesearch?term=${getters.term}&searchZid=${zid}`, {}, 'GET').then((data) => {
      setGrades(data);
    });
  };
  React.useEffect(() => {
    getGrades();
  }, []);

  const renderGradeTable = (title, data, emoji) => (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          p: 0,
          '&:last-child': { pb: 0 },
        }}
      >
        <Box
          sx={{
            p: 3,
            background:
              'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {emoji} {title}
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: 'rgba(37, 99, 235, 0.03)',
                }}
              >
                <TableCell sx={{ fontWeight: 700, width: '50%' }}>Field</TableCell>
                <TableCell sx={{ fontWeight: 700, width: '50%' }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value, key) => (
                <TableRow
                  key={key}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.02)',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{value[0]}</TableCell>
                  {value[1] === '.' || value[1] === '' ? (
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontStyle: 'italic',
                          fontSize: '0.875rem',
                        }}
                      >
                        Unreleased
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {value[1].replace('{', '').replace('}', '')}
                      {value[2] && (
                        <Typography component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                          / {value[2]}
                        </Typography>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      {grades.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress size={48} />
          <Typography variant="h6" color="text.secondary">
            Loading your grades...
          </Typography>
        </Box>
      ) : (
        <>
          {getters.isTutor && (
            <Card
              elevation={0}
              sx={{
                mb: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                background:
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🔍 Tutor Search
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    fullWidth
                    value={zid}
                    onChange={(e) => setZid(e.target.value)}
                    placeholder="Enter student zID (e.g., 5555555)"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={getGrades}
                    sx={{
                      minWidth: '120px',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '10px 24px',
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {renderGradeTable('Overall Grades', grades.main, '📊')}
          {renderGradeTable('Assignment 1 Breakdown', grades.ass1, '📝')}
          {renderGradeTable('Assignment 2 Breakdown', grades.ass2, '📝')}
          {renderGradeTable('Assignment 3 Breakdown', grades.ass3, '📝')}
          {renderGradeTable('Assignment 4 Breakdown', grades.ass4, '📝')}
        </>
      )}
    </Box>
  );
};

export default makePage(Grades, {
  loginRequired: true,
  title: '💯 Grades',
});
