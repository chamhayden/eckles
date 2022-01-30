import makePage from '../component/makePage';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { Context, useContext } from '../context';

const Staff = () => {
  const { getters } = useContext(Context);
  const staff = getters.content.staff
    .filter((s) => s.active)
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleCopyEmail = async (email) => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        return;
      } catch {
        // Fall back to the legacy copy flow below.
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Table aria-label="staff table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((member, idx) => {
            const email = `z${member.zid}@unsw.edu.au`;
            return (
              <TableRow
                key={member.zid ?? `${member.name}-${idx}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {member.name}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{email}</span>
                    <Tooltip title="Copy email">
                      <IconButton
                        size="small"
                        aria-label="Copy email"
                        onClick={() => handleCopyEmail(email)}
                      >
                        <FileCopyIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default makePage(Staff, {
  loginRequired: true,
  title: 'Our Staff',
});
