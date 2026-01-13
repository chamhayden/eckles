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

const CourseOutline26T1 = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="body" component="div" gutterBottom>
        <b>COMP6080 is an open-book, invigilated, hurdle-based in-person exam completed at UNSW.</b>
        <br />
        <br />
      </Typography>     
      <Typography variant="h5" component="div" gutterBottom>
        1. Requirements to sit the exam
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
        2. Date, Time, and Duration
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The final exam will be a 3 hour exam. The exam will run in TBD.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Only submissions made during your exam time window will be counted as valid.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        3. Exam Structure
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Your exam will be worth 20% of the course.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be very similar to assignment 4, with the following simplified criteria:
        <ul>
          <li>80%: Providing the features and functionality required</li>
          <li>20%: Ensuring mobile responsiveness on desktop, tablet, mobile</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The main differences compared to assignment 4 are that the exam will:
        <ul>
          <li>Be substantially less work than ass4</li>
          <li>Not be assessed in terms of linting & code design & accessibility & ui/ux - we will not look at your source code</li>
          <li>Will not have a backend attached (local storage will be used instead)</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        You are allowed to your code code from other assessments in the exam (or in the case of assignment 4, your group's code).
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        4. Platform to complete exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be distributed via gitlab, and operationally be very similar to the release and submission of a single assignment repo.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam must be completed locally or via vlab. Regardless of where you complete the exam, you must:
        <ul>
          <li>Ensure you push the work you want submitted to your gitlab master branch</li>
          <li>Ensure that your code works as expected in the latest version of Google Chrome</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Technical issues relating to your local environment that are reasonably solvable prior to the exam are not grounds for special consideration.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        5. Communication & Help during the exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>This exam is an open book exam, meaning you are able to use the internet and other resources, with a few exceptions.
          <ul>
            <li>You are prohibited from seeking help from other students during the exam. Any communications (physical, digital) after you or another person has started the exam time is not allowed.</li>
            <li>You cannot use code generation tools such as LLMs, including but not limited to, ChatGPT, Gemini, etc. If you're using a tool that generates code that you didn't write by hand then it should be considered prohibitive and may result in a 0 grade. The only two exceptions are:
              <ul>
                <li>The immediate google AI results summary that come from entering a query into google search</li>
                <li>Single-line autocompletion (e.g. variable name suggestions etc). This differs from some of the newer auto-complete functionality in tools like cursor that will suggest multiple lines of code that it can generate</li>
              </ul>
            </li>
            <li>Whilst you can use resources on the internet, you cannot copy or plagiarise those resources. The only material you can copy is any of your own assignment work, any work you've prepared in advance, or any course materials</li>
          </ul>
          </li>
          <li>Do not place your exam work in any location, including file sharing services such as Dropbox or GitHub, accessible to any other person. Ensure during the exam no other person in your household can access your work.</li>
          <li>Your zpass should not be disclosed to any other person. If you have disclosed your zpass , you should change it immediately.</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <b>Deliberate violation of exam conditions will be referred to Student Integrity as serious misconduct. This may result in a 0 for the course.</b>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you have questions or clarifications needed during the exam, please ask the invigilator. Do NOT email or MS Teams any course staff during teh exam.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        6. Git Commit Requirements
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        To avoid being penalised in the final exam we require that you:
        <ul>
         <li>Make commits no more than 100 lines of code</li>
         <li>Have meaningful commit names</li>
        </ul>
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Hurdle Requirements
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam has a hurdle component - which means if you don't achieve a <i>scaled</i> pass mark then you will not pass the course.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        7. Submission
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Push to master regularly throughout your exam. Once the exam is complete, we will take the last commit you have pushed to your master branch up on gitlab. Please check the gitlab site directly before the completion of the exam.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Do not leave it to the deadline to push your code to master. Submit each question when you finish working on it.
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        8. Preparation
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>Review previous exercises and assignments to stay confident with both theory and practical elements of the course.</li>
          <li>A sample exam paper can be found <a target="_blank" href="https://gitlab.cse.unsw.edu.au/undergraduate-courses/COMP6080/exam-sample-spec">here</a>.
            <ul><li>A solution (built file, not the source code) of the sample exam can be found <a target="_blank" href="https://cs6080.web.cse.unsw.edu.au/sample-exam/">here</a>. Please note, this solution may be incomplete, but it is mostly complete.</li></ul>
          </li>
        </ul>
      </Typography>
    </>
  );
}

export default CourseOutline26T1;
