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

  return (
  	<>
      {lectures && <div style={{ border: '1px solid #999', padding: '10px', fontSize: '1.1em', margin: '0 auto 20px auto', minWidth: 100, maxWidth: '380px' }}>
        What type of student are you?<br />
        {Object.keys(RELEVANCE).map((item, idx) => {
          if (RELEVANCE[item].select) {
            return <span style={{ cursor: 'pointer'}} onClick={() => setStudentTypeFn(item)}><input type="radio" checked={studentType === item} />{RELEVANCE[item].select}<br /></span>
          }
        })}
        <div style={{ height: '20px' }}></div>
        <span style={{ cursor: 'pointer' }} onClick={() => setNoCatchupFn(noCatchup === 0 ? 1 : 0)}><input type="checkbox" checked={noCatchup} />I completed COMP1531 <span onClick={(e) => { alert('If you uncheck this box, we will show all COMP1531 lectures that are relevant to this course. You won\'t necessarily need to watch every catch up lecture, because you may already have that knowledge.'); e.stopPropagation(); }}>ℹ️</span></span>
      </div>}
  	  {boxes.map(({ title, key, headers, table, maxWidth }, boxKey) => {
        let totalWidth = 0;
        headers.filter(h => h.showFn === undefined || h.showFn()).map(h => h.width).forEach(w => {
          totalWidth += w;
        });
        headers = headers.map(h => ({ ...h, width: h.width / (totalWidth / 100) }));
        return (
          <>
            <Accordion key={boxKey} sx={{ marginTop: '0 !important', marginLeft: 'auto !important', marginRight: 'auto !important', minWidth: 100, maxWidth }} expanded={true} id={key}>
              <AccordionSummary
                //expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5">{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} sx={{ boxShadow: 'none', }}>
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
                      <TableRow>
                        {headers.map(({ name, showFn }, headerKey) => {
                        	if (showFn === undefined || showFn()) {
                        	  return <TableCell key={headerKey}><b>{name}</b></TableCell>;
                        	}
                        	return <></>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {table.map((tableRow, tableRowKey) => (
                        <TableRow
                          key={tableRowKey}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                            	  return <></>;
                              }
                            }
                        	})}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </>
        )
      })}
    </>
  );
}

export default SetOfTables;