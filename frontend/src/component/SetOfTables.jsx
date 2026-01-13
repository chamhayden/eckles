import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { RELEVANCE } from '../util/content';

const SetOfTables = ({ boxes, lectures }) => {
  var durationCount = 0 
  const [noCatchup, setNoCatchup] = React.useState(localStorage.hasOwnProperty('eckles_noCatchup') ? parseInt(localStorage.getItem('eckles_noCatchup')) : 1);
  const [studentType, setStudentType] = React.useState(localStorage.hasOwnProperty('eckles_studentType') ? localStorage.getItem('eckles_studentType') : 'recommended');

  const setNoCatchupFn = (val) => {
    localStorage.setItem('eckles_noCatchup', val);
    setNoCatchup(val);
  };

  const setStudentTypeFn = (val) => {
    localStorage.setItem('eckles_studentType', val);
    setStudentType(val);
  }

  const shouldShowImportance = (item) => {
    const importance = item[2].value.props.category.toLowerCase();
    if (importance === 'catchup' && noCatchup === 0) {
      return true;
    }
    if (studentType === 'mandatory') {
      return (['mandatory'].includes(importance));
    } else if (studentType === 'recommended') {
      return (['mandatory', 'recommended'].includes(importance));
    } else if (studentType === 'extension') {
      return (['mandatory', 'recommended', 'extension'].includes(importance));
    }
    return true;
  }

  const parseMins = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }

  return (
  	<>
      {lectures && <Paper elevation={0} sx={{ 
        border: '1px solid', 
        borderColor: 'divider',
        borderRadius: '12px',
        padding: '20px', 
        fontSize: '1.1em', 
        margin: '0 auto 24px auto', 
        minWidth: 100, 
        maxWidth: '420px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)',
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
          🎓 What type of student are you?
        </Typography>
        {Object.keys(RELEVANCE).map((item, idx) => {
          if (RELEVANCE[item].select) {
            return <div key={idx} style={{ 
              cursor: 'pointer',
              marginBottom: '8px',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              backgroundColor: studentType === item ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            }} onClick={() => setStudentTypeFn(item)}>
              <input type="radio" checked={studentType === item} readOnly style={{ marginRight: '8px' }} />
              {RELEVANCE[item].select}
            </div>
          }
        })}
        <div style={{ height: '16px' }}></div>
        <div style={{ 
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          backgroundColor: noCatchup ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
        }} onClick={() => setNoCatchupFn(noCatchup === 0 ? 1 : 0)}>
          <input type="checkbox" checked={noCatchup} readOnly style={{ marginRight: '8px' }} />
          I completed COMP1531{' '}
          <span onClick={(e) => { 
            alert('If you uncheck this box, we will show all COMP1531 lectures that are relevant to this course. You won\'t necessarily need to watch every catch up lecture, because you may already have that knowledge.'); 
            e.stopPropagation(); 
          }} style={{ cursor: 'help' }}>ℹ️</span>
        </div>
      </Paper>}
  	  {boxes.map(({ title, key, headers, table, maxWidth, totalDuration }, boxKey) => {
        var hasLectures = false
        let totalWidth = 0;
        headers.filter(h => h.showFn === undefined || h.showFn()).map(h => h.width).forEach(w => {
          totalWidth += w;
        });
        headers = headers.map(h => ({ ...h, width: h.width / (totalWidth / 100) }));
        return (
          <>
            <Accordion key={boxKey} sx={{ 
              marginTop: '0 !important', 
              marginBottom: '20px !important',
              marginLeft: 'auto !important', 
              marginRight: 'auto !important', 
              minWidth: 100, 
              maxWidth,
              borderRadius: '12px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              '&:before': {
                display: 'none',
              },
              overflow: 'hidden',
            }} expanded={true} id={key}>
              <AccordionSummary
                //expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '16px' }}>
                <TableContainer component={Paper} sx={{ 
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <Table aria-label="simple table">
                    <colgroup>
                      {headers.map(({ width, showFn }, widthKey) => {
                        if (showFn === undefined || showFn()) {
                          return <col key={widthKey} style={{ width: `${width}%`, }} />;
                        }
                        return <></>;
                      })}
                    </colgroup>
                    <TableHead>
                      <TableRow sx={{ 
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        '& th': {
                          fontWeight: 700,
                          color: 'primary.main',
                        }
                      }}>
                        {headers.map(({ name, showFn }, headerKey) => {
                        	if (showFn === undefined || showFn()) {
                        	  return <TableCell key={headerKey}><b>{name}</b></TableCell>;
                        	}
                        	return <></>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {table.map((tableRow, tableRowKey) => {
                        hasLectures = true
                        if (!window.location.href.includes('help-session')) {
                          var curDuration = parseInt(tableRow[3].value.replace(/^\D+/g, ''))
                          if (window.location.href.includes('tutorial')) {
                            curDuration = parseInt(tableRow[2].value.replace(/^\D+/g, ''))
                          }
                          if (tableRowKey === 0) {
                            durationCount = curDuration
                          } else if (!lectures || shouldShowImportance(tableRow)) {
                            durationCount += curDuration
                          } 
                        }
                        return (
                        <TableRow
                          key={tableRowKey}
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': {
                              backgroundColor: 'rgba(37, 99, 235, 0.03)',
                            },
                            transition: 'background-color 0.2s ease',
                          }}
                        >
                        	{tableRow.map((cell, cellKey) => {
                            if (!lectures || shouldShowImportance(tableRow)) {
                          	  const showFn = headers[cellKey].showFn;
                          	  if (showFn === undefined || showFn()) {
                                if (cell.Raw) {
                                  return <TableCell key={cellKey}><cell.Raw /></TableCell>;
                                } else {
                                  if (cell.link) {
                                    return (
                                      <TableCell key={cellKey}>
                                        <Link to={cell.link}>
                                          {cell.buttonProps && (
                                            <Button style={{width: '100%', height: '100%'}} {...cell.buttonProps}>
                                              <div style={{textAlign: 'left'}}>{cell.value} &#187;</div>
                                            </Button>
                                          )}
                                          {!cell.buttonProps && <>{cell.value} &#187;</>}
                                        </Link>
                                      </TableCell>
                                    );
                                  } else {
                            	  	  return <TableCell key={cellKey}>{cell.value}</TableCell>
                                  }
                            	  }
                              }
                            } else {
                            }
                        	})}
                        </TableRow>
                      )})}
                    </TableBody>
                  </Table>
                </TableContainer>
                {
                  hasLectures === true &&
                  <Typography variant="h6"
                    sx={{
                      textAlign: 'end',
                      fontSize: '0.95rem',
                      marginTop: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: 'secondary.main',
                      fontWeight: 600,
                    }}
                  >
                    ⏱️ Total duration: <strong>{parseMins(durationCount)}</strong>
                  </Typography>

                }
              </AccordionDetails>
            </Accordion>
          </>
        )
      })}
    </>
  );
}

export default SetOfTables;