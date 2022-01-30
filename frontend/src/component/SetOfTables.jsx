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

const SetOfTables = ({ boxes }) => {
  return (
  	<>
  	  {boxes.map(({ title, key, headers, table, maxWidth }, boxKey) => {
        let totalWidth = 0;
        headers.filter(h => h.showFn === undefined || h.showFn()).map(h => h.width).forEach(w => {
          totalWidth += w;
        });
        headers = headers.map(h => ({ ...h, width: h.width / (totalWidth / 100) }));
        return (
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
                      	})}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  );
}

export default SetOfTables;