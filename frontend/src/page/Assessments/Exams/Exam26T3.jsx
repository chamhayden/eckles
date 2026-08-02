import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Context, useContext } from '../../../context';

const Exam26T3 = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="body" component="div" gutterBottom>
        <b>COMP6080 is an closed-book, invigilated, hurdle-based in-person exam completed at UNSW.</b>
        <br />
        <br />
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        1. Requirements to sit the exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam is covered by UNSW's Fit-to-Sit policy. That means that by sitting this exam, you
        are declaring yourself well enough to do so and cannot later apply for Special
        Consideration.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If, during an exam you feel unwell to the point that you cannot continue with the exam, you
        should talk to an invigilator. They will provide you with next steps.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        2. Date, Time, and Duration
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The final exam will be a 3 hour exam. See infomation given by the UNSW CSE Exam team for time and location.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Only submissions made during your exam time window will be counted as valid.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        3. Exam Structure
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Your exam will be worth 35% of the course.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be of identical nature to the quizzes, just longer in length.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        4. Hurdle Requirements
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam has a hurdle component - which means if you don't achieve a <i>scaled</i> pass
        mark then you will not pass the course.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        5. Preparation
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        To prepare for the exam, please complete all exercises, old assignments, and the sample quiz.
      </Typography>
    </>
  );
};

export default Exam26T3;
