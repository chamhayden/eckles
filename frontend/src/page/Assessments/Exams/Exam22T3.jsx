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

const CourseOutline22T3 = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Requirements to sit the exam
      </Typography>     
      <Typography variant="body1" component="div" gutterBottom>
        During the duration you sit the exam, you must have access to a stable internet connection for pushing to gitlab and receiving emails.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam is covered by UNSW's Fit-to-Sit policy. That means that by sitting this exam, you are declaring yourself well enough to do so and cannot later apply for Special Consideration.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If, during an exam you feel unwell to the point that you cannot continue with the exam, you should take the following steps:
        <ol>
          <li>Stop working on the exam and take note of the time</li>
          <li>Make contact immediately with cs6080@cse.unsw.edu.au and advise them that you are unwell</li>
          <li>Immediately submit a Special Consideration application saying that you felt ill during the exam and were unable to continue</li>
          <li>If you were able to advise cs6080@cse.unsw.edu.au of the illness during the assessment, attach screenshots of this conversation to the Special Consideration application</li>
        </ol>
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Date, Time, and Duration
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The final exam will be a 3 hour exam that begins at TBD (AEST) and ends at TBD (AEST) on TBD.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Students outside of Asia-Pacific region, or students with ELS requirements, may have their exam time altered and communicated to the lecturer in charge privately. If you have been given alternate instructions about start and finish times, they apply.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Only submissions made during your exam time window will be counted as valid.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Exam Structure
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be worth X marks. those X marks will make up the 20% value of the course. X will be determined closer to the exam.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be very similar to assignment 3, with the following simplified criteria:
        <ul>
          <li>80%: Providing the features and functionality required</li>
          <li>20%: Ensuring mobile responsiveness on desktop, tablet, mobile</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The main differences compared to assignment 3 are that the exam will:
        <ul>
          <li>Be substantially less work than ass3</li>
          <li>Not be assessed in terms of linting & code design & accessibility & ui/ux - we will not look at your source code</li>
          <li>Will not have a backend attached (local storage will be used instead)</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        You are allowed to your code code from other assessments in the exam (or in the case of assignment 3, your group's code).
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Platform to complete exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be distributed via gitlab, and operationally be very similar to the release and submission of a single lab repo.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam must be completed locally or via vlab. Regardless of where you complete the exam, you must:
        <ul>
          <li>Ensure you push the work you want submitted to your gitlab master branch</li>
          <li>Ensure that your code works as expected in the latest version of Google Chrome</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Technical issues relating to your local environment are not grounds for special consideration.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Do not leave it to the deadline to push your code to master. Submit each question when you finish working on it.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Communication & Help during the exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>This exam is an open book exam, meaning you are able to use the internet and other resources.</li>
          <li>Whilst you can use resources on the internet, you cannot copy or plagiarise those resources.</li>
          <li>You are prohibited from seeking help from other students during the exam. Any communications (physical, digital) after you or another person has started the exam time is not allowed.</li>
          <li>Even after you finish the exam, on the day of the exam,on the day of the exam do not communicate your exam answers to anyone. Some students have extended time to complete the exam.</li>
          <li>Do not place your exam work in any location, including file sharing services such as Dropbox or GitHub, accessible to any other person. Ensure during the exam no other person in your household can access your work.</li>
          <li>Your zpass should not be disclosed to any other person. If you have disclosed your zpass , you should change it immediately.</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <b>Deliberate violation of exam conditions will be referred to Student Integrity as serious misconduct. This may result in a 0 for the course.</b>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you have questions or clarifications needed during the exam, you can make a PRIVATE post on our usual forum (linked in sidebar). Do not message lecturers or tutors on MS teams. Do not email lecturers or tutors about issues that are not of a sensitive nature.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        When posting a message to the forum, it's important that you are detailed in your description of your issues. If you are having technical issues:
        <ul>
          <li>Make sure your most recent code is up on gitlab</li>
          <li>Show screenshots of the issue (code, terminal, etc)</li>
          <li>Explain how you produced it</li>
          <li>Whether you're running it locally or in vlab</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Failure to comply may result in delays in responding to your queries.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Clarifications made during the exam will be made at the top of this page. After each clarification, an email will be sent to all students in the course notifying them that a clarification has been made.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Submission
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        There will be no submit command for the final exam. At the end of the exam time, whatever code is on your latest commit pushed to your master branch (on gitlab) will be what is submitted and marked.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Troubleshooting
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you are having issues working on the exam at CSE, please follow these steps
        <ul>
          <li>If you're using VLab:try leaving VLab and reconnecting. You will likely be put on a different server, which may make your connection better. If the problem persists, try using SSH instead: instructions here or here</li>
          <li>If you're using VSCode: Try disconnecting from VSCode, then changing the URL from vscode.cse.unsw.edu.au to vscode2.cse.unsw.edu.au .</li>
          <li>If you're using SSH: try disconnecting and reconnecting.</li>
        </ul>
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        Preparation
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>Review previous exercises and assignments to stay confident with both theory and practical elements of the course.</li>
          <li>A sample exam paper can be found <a target="_blank" href="https://gitlab.cse.unsw.edu.au/COMP6080/exam-sample-spec">here</a>.
            <ul><li>A solution (built file, not the source code) of the sample exam can be found <a target="_blank" href="https://cs6080.web.cse.unsw.edu.au/sample-exam/">here</a>. </li></ul>
          </li>
        </ul>
      </Typography>
    </>
  );
}

export default CourseOutline22T3;
