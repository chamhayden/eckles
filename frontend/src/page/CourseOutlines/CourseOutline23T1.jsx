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

import { Context, useContext } from '../../context';

const CourseOutline23T1 = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  const link = (path) => `/${getters.term}/${path}`;
  const redirect = (path) => navigate(link(path));

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Contents
      </Typography>


      <Typography variant="body1" gutterBottom>
        <ol>
          <li>Course Details</li>
          <li>Course Summary</li>
          <li>Philosophy of teaching web-based front-ends</li>
          <li>Teaching Strategies</li>
          <li>Assessment</li>
          <li>Schedule / Timetable</li>
          <li>Student Conduct</li>
          <li>Resources for Students</li>
          <li>Course Evaluation and Development</li>
        </ol>
      </Typography>

      <Divider sx={{ mb: 3, mt: 3, }} />

      <Typography variant="h5" component="div" gutterBottom>
        1. Course Details
      </Typography>

      <Typography variant="body1" gutterBottom>
        Find information relating COVID-19 and this offering <a href="https://www.covid-19.unsw.edu.au/safe-return-campus-faqs" target="_blank">here</a> and <a href="https://edtech.eng.unsw.edu.au/c19mess/comms.html" target="_blank">here</a>.

         <table>
          <tbody>
           <tr>
            <td><strong>Course Code</strong></td>
            <td>COMP6080</td>
           </tr>
           <tr>
            <td><strong>Course Title</strong></td>
            <td>Web Front-end Programming</td>
           </tr>
           <tr>
            <td><strong>Convenor</strong></td>
            <td><Link to={link('staff/hayden-smith')}>Hayden Smith</Link></td>
           </tr>
           <tr>
            <td><strong>Admin</strong></td>
            <td><Link to={link('staff/hayden-smith')}>Hayden Smith</Link></td>
           </tr>
           <tr>
            <td><strong>Units of Credit</strong></td>
            <td>6</td>
           </tr>
           <tr>
            <td><strong>Course Website</strong></td>
            <td>This website!</td>
           </tr>
           <tr>
            <td><strong>Handbook Entry</strong></td>
            <td><a href="http://www.handbook.unsw.edu.au/undergraduate/courses/current/COMP6080.html">
              http://www.handbook.unsw.edu.au/undergraduate/courses/current/COMP6080.html
             </a></td>
           </tr>
          </tbody>
         </table>
      </Typography>


      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        2. Course Summary
      </Typography>

      <Typography variant="body1" gutterBottom>
        COMP6080 aims to develop your confidence in building modern web-based applications to industry standards. This occurs through the introduction of a range of basic concepts surrounding HTML, CSS, Vanilla Javascript, Javascript Declarative Frameworks, UI/UX Principles, Accessibility, Network &amp; Asynchronous Programming, Front-end Testing, and other basic infrastructure.
      </Typography>
      <Typography variant="body1" gutterBottom>
         This course has a heavy emphasis on industry voices, and as such a number of lectures will be given by current front-end developers from industry. These lectures primarily come from employees at <a href="https://canva.com/" target="_blank">Canva</a>, a Sydney-based technology company that does a lot of work with front-end technologies.
      </Typography>    
      <Typography variant="body1" gutterBottom>
         COMP6080 is a challenging course. Front-end development is unlike most things you've experienced at university before. You will find the individual problems you solve much simpler than other level 6 courses, but the time you will feel that you spend on the aggregate of these issues will feel larger. A number of students will find this course quite time consuming if they're hoping to achieve a high mark. We'd encourage you to reflect on this fact before you enrol in the course.
      </Typography>    
      
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        2.1. Assumed Knowledge
      </Typography>
      <Typography variant="body1" gutterBottom>
        COMP6080 assumes that you have satisfactorily completed COMP1531 and COMP2521. The main areas of knowledge you'll need from these courses are:
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>
           A high level understanding of how interpreted scripting languages work (e.g. python), in terms of inputs, interpretation, loose typing, etc
          </li>
          <li>
           Confident use of GIT as a version management tool
          </li>
          <li>
           Basics of HTTP protocol and interacting with web browsers
          </li>
         </ul>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Postgraduate students will need to familiarise themselves with git, specifically, if not already confident, check out the <Link to={link('help/resources')}>resources here</Link>. We have also <a href="https://gitlab.cse.unsw.edu.au/"> provided a lab0 on the tutorials &amp; exercises page</a> that we encourage everyone who hasn't completed COMP1531 to complete prior to the beginning of the course. Basic competency in git is an expectation in COMP6080.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        2.2. Student Learning Outcomes
      </Typography>
      <Typography variant="body1" gutterBottom>
          After completing this course, students will be able to:
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ol>
          <li>
           A knowledge of fundamental Javascript semantics sufficient to design, construct, test and debug Javascript programs.
          </li>
          <li>
           An understanding of the context of web-front end programming, including CSS and the DOM, sufficient to successfully construction of programs for the web-front end.
          </li>
          <li>
           A knowledge of modern web front-end coding practices including Javascript frameworks and CSS framework, allowing effective and efficient integration of existing commonly-used components into a web application.
          </li>
          <li>
           An ability to use modern Javascript asynchronous programming techniques for the web-front end to produce robust and maintainable code, and a basis to build on in understanding concurrency in other contexts.
          </li>
          <li>
           A knowledge of basic web front-end security issues sufficient to understand and avoid common security vulnerabilities when constructing web applications.
          </li>
          <li>
           An awareness of user interface design as it applies to the web, including accessibility, allowing adoption of sound practices and providing a basis to build an understanding of interface design generally.
          </li>
        </ol>
      </Typography>


      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        3. Philosophy of teaching web-based front-end
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        3.1. Challenges of teaching front-end
      </Typography>
      <Typography variant="body1" gutterBottom>
        The challenges of teaching front-end in a finite time period are related to the size and scope of knowledge around modern web front-end. Building even the most basic modern web app requires an extreme breadth and depth of abstractions that take typical developers years to become very comfortable with.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Teaching front-end is also challenging due to the rapid advances that are made in the world of web (a good thing), which leads to sprawling and conflicting resources across the internet. This can lead to learning inconsistent or sub-standard practices and programming patterns.
      </Typography>
      <Typography variant="body1" gutterBottom>
        To teach only declarative frameworks (e.g. ReactJS) as an introduction creates the problem of producing capable students who can rapidly produce work, but do so without the fundamental understanding to grow and apply their skills sustainably and with accountability. However, to teach only Vanilla Javascript would neglect the reality that nearly all students in this course will inevitably not be building actual applications with Vanilla Javascript.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        3.2. Approach to teaching
      </Typography>
      <Typography variant="body1" gutterBottom>
        This course is about spending a term learning both Vanilla Javascript (Javascript without abstractions)  and Javascript Declarative Frameworks (specifically ReactJS). The term will begin with a heavy focus on HTML/CSS, and have topics of UI/UX, Accessibility, and Testing, trickled throughout. The course will be very heavy Vanilla JS to start while slowly tapering off, and will be very light on ReactJS at the start before rapidly getting into more depth.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        3.3. What isn't included
      </Typography>
      <Typography variant="body1" gutterBottom>
        There will be a number of people who feel strongly about the exclusion of particular topics from the course, such as typescript or more complex state managers (redux, mobx). Often when topics are omitted it's because they aren't <em>fundamental</em>knowledge in the limited weeks this course is offered in.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We've compiled <a href="https://gitlab.cse.unsw.edu.au/COMP6080/21T3/main-content/-/blob/master/FAQ.md">an FAQ</a> to answer these questions. If you still have further questions or comments, we'd encourage you to use the forum linked in the sidebar.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Students with prerequisite knowledge in this course should understand that this is an introductory course with very limited assumed knowledge, and as such, is not a course to extent an already firm foundation of knowledge. If you are already quite competent in the areas taught in this course, please be patient as we will be moving quite slowly by your standards. If this is something that you feel may be frustrating, it may be more appropriate with your skill-set to find a more stimulating course.
      </Typography>


      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        4. Teaching Strategies
      </Typography>
      <Typography variant="body1" gutterBottom>
        This course uses the standard set of practice-focused teaching strategies employed by most CSE foundational courses:
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>Lectures</li>
          <li>Tutorials</li>
          <li>Exercises</li>
          <li>Help Sessions</li>
          <li>Assignments</li>
          <li>Final Exam</li>
        </ul>
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        4.1. Lectures
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lectures will be used to present the theory and practice of the techniques in this course. Although the lectures will primarily focus on the key concepts of software engineering, some lectures will also include practical demonstrations. Lecture slides will be available on the course web page.
      </Typography>
      <Typography variant="body1" gutterBottom>
        On a typical week we will only have the live Tuesday lecture (2 hours). The live Tuesday lecture will be replaced by approximately 2 hours of pre-recorded lectures to watch each week. Please note:
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li>It's critical that you watch the 2 hours of pre-recorded lectures each week <em>prior</em> to the Tuesday lecture</li>
          <li>The length of pre-recorded and live lectures may vary week to week, but the intention is to keep the average weekly duration at 4 hours across the term.</li>
          <li>In general, industry driven lectures are more likely to be in the pre-recorded format</li>
          <li>Lecture notes for the live lectures may only be released a day or two before the lecture. This is because as part of the teaching strategy for this course the live lectures are designed to essentially "supplement" and "round-off" the pre-recorded lectures, so it's natural to wait for some feedback from students before over-planning these.</li>
        </ul>
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can see the <Link to={link('timetable/lectures')}>schedule for lectures here</Link>, and the list of <Link to={link('content/lectures')}>lecture videos and content here</Link>.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Because lectures will be delivered from a <em>range</em> of people, it's important that students are prepared for differences in slide format and teaching style.
      </Typography>

      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        4.2 Tutorials
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Tutorials</strong> are 1 hour lessons every week that help clarify ideas from lectures and work through exercises based on the lecture material. You should make sure that you use them effectively by examining in advance the material to be covered in each week's tutorial, by asking questions, by offering suggestions and by generally participating.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tutorial activities can be found by going to the <Link to={link('content/tutorials/week')}>tutorials page</Link>. Tutorial solutions are available on the solution branch of the exercises gitlab repo. Tutorials do not contribute to your final mark.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tutorials will be run via Zoom.
      </Typography>
      
      <Typography variant="body1" component="div" gutterBottom>
        4.3. Help Sessions
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Help sessions are unprepared drop-in "clinics" where students and groups can go to seek help about course related matters, whether that be the project, tutorials, or exercises. Current tutors or lab assistants will supervise each help session.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Help sessions will be run via Zoom.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        A timetable for help sessions can be found <Link to={link('timetable/help-sessions')}>here</Link>.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        4.4. Assignments
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        There will be a series of assignments which will run through the teaching period from weeks 1-10 and contributes to <strong>80%</strong> of the overall course mark.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Assignments will be the platform you have to study and learn the material in substantially more depth. Your assignments will be completed via gitlab.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The intention is that the third assignment will be completed in a pair. You are able to opt out of this and work alone (at your own expense!). You can choose your pair, otherwise we will assign you a partner. You can pair up with any student in the course.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
          Information on assignments can be found in the links in section 5 (Assessment).
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ mt: 4 }}>
        4.6. Final Exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        There will be a centrally timetabled final exam which will in your UNSW exam timetable. The exam may contain a mixture of multiple choice questions, short answer questions, and programming exercises. More specific details of the exam will be provided through the course.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you cannot attend the final exam because of illness or misadventure, then you must submit a Special Consideration request, with documentation, through MyUNSW within 72 hours of the start of the exam exam. If your request is reasonable, then you will be awarded a Supplementary Exam. No supplementary exams will be provided for students who score marks 49 or below on grounds of being "close" to a pass.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Information on the final exam can be found in the links in section 5 (Assessment).
      </Typography>


      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        5. Assessment
      </Typography>
      <TableContainer component={Paper} sx={{ minWidth: 250, maxWidth: 4500 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Assess</TableCell>
              <TableCell>Weighting</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Individual/Pair</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Ass 1</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>Week 3</TableCell>
              <TableCell>Individual</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => redirect('assessments/assignments/ass1')}>View</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Ass 2</TableCell>
              <TableCell>30%</TableCell>
              <TableCell>Week 7</TableCell>
              <TableCell>Pair (see below)</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => redirect('assessments/assignments/ass2')}>View</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Ass 3</TableCell>
              <TableCell>30%</TableCell>
              <TableCell>Week 10</TableCell>
              <TableCell>Pair (see below)</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => redirect('assessments/assignments/ass3')}>View</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Exam</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>Exam Period</TableCell>
              <TableCell>Individual</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => redirect('assessments/exam')}>View</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="body1" component="div" gutterBottom>
        For pair assignments, you complete them a pair of your choice. If you don't have a pair, we will find one for you. You can also choose to work alone, but we strongly do not recommend this as the workload is much higher for an individual.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Nominations for your pair (or to work alone) must be complete by the end of week 2. Information about this will be distributed in weekly notices.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Pairs will be <b>required</b> to contribute regularly to gitlab and in reasonably equal contributions as we still assess contributions individually. Failure to do so may result in a loss of marks.
      </Typography>
         

      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        6. Course Schedule / Timetable
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The schedule for this course is outlined clearly in the timetable for <Link to={link('timetable/lectures')}>lectures</Link>, <Link to={link('timetable/tutorials')}>tutorials</Link>, and <Link to={link('timetable/help-sessions')}>help sessions</Link>.
      </Typography>


      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        7. Student Conduct
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The <strong>Student Code of Conduct</strong> (<a href="https://student.unsw.edu.au/conduct">Information</a>, <a href="https://www.gs.unsw.edu.au/policy/documents/studentcodepolicy.pdf">Policy</a>) sets out what the University expects from students as members of the UNSW community. As well as the learning, teaching and research environment, the University aims to provide an environment that enables students to achieve their full potential and to provide an experience consistent with the University's values and guiding principles. A condition of enrolment is that students <em>inform themselves</em> of the University's rules and policies affecting them, and conduct themselves accordingly.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        In particular, students have the responsibility to observe standards of equity and respect in dealing with every member of the University community. This applies to all activities on UNSW premises and all external activities related to study and research. This includes behaviour in person as well as behaviour on social media, for example Facebook groups set up for the purpose of discussing UNSW courses or course work. Behaviour that is considered in breach of the Student Code Policy as discriminatory, sexually inappropriate, bullying, harassing, invading another's privacy or causing any person to fear for their personal safety is serious misconduct and can lead to severe penalties, including suspension or exclusion from UNSW.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you have any concerns, you may raise them with your lecturer, or approach the <a href="mailto:ethics-officer@cse.unsw.edu.au">School Ethics Officer</a>, <a href="mailto:grievance-officer@cse.unsw.edu.au">Grievance Officer</a>, or one of the student representatives.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <b>Plagiarism</b> is <a href="https://student.unsw.edu.au/plagiarism">defined as</a> using the words or ideas of others and presenting them as your own. UNSW and CSE treat plagiarism as academic misconduct, which means that it carries penalties as severe as being excluded from further study at UNSW. There are several on-line sources to help you understand what plagiarism is and how it is dealt with at UNSW:
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li><a href="https://student.unsw.edu.au/plagiarism">Plagiarism and Academic Integrity</a></li>
          <li><a href="https://www.gs.unsw.edu.au/policy/documents/plagiarismprocedure.pdf">UNSW Plagiarism Procedure</a></li>
         </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Make sure that you read and understand these. Ignorance is not accepted as an excuse for plagiarism. In particular, you are also responsible that your assignment files are not accessible by anyone but you by setting the correct permissions in your CSE directory and code repository, if using. Note also that plagiarism includes paying or asking another person to do a piece of work for you and then submitting it as your own work.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        UNSW has an ongoing commitment to fostering a culture of learning informed by academic integrity. All UNSW staff and students have a responsibility to adhere to this principle of academic integrity. Plagiarism undermines academic integrity and is not tolerated at UNSW. Plagiarism at UNSW is defined as using the words or ideas of others and passing them off as your own.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you haven't done so yet, please take the time to read the full text of
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li><a href="https://student.unsw.edu.au/plagiarism">UNSW's policy regarding academic honesty and plagiarism</a></li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The pages below describe the policies and procedures in more detail:
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li><a href="https://www.gs.unsw.edu.au/policy/documents/studentcodepolicy.pdf">Student Code Policy</a></li>
          <li><a href="https://www.gs.unsw.edu.au/policy/documents/studentmisconductprocedures.pdf">Student Misconduct Procedure</a></li>
          <li><a href="https://www.gs.unsw.edu.au/policy/documents/plagiarismpolicy.pdf">Plagiarism Policy Statement</a></li>
          <li><a href="https://www.gs.unsw.edu.au/policy/documents/plagiarismprocedure.pdf">Plagiarism Procedure</a></li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        You should also read the following page which describes your rights and responsibilities in the CSE context:
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li><a href="https://www.engineering.unsw.edu.au/computer-science-engineering/about-us/rganisational-structure/student-services/policies/essential-advice-for-cse-students">
            Essential Advice for CSE Students</a></li>
        </ul>
      </Typography>
         

      <Divider sx={{ mb: 3, mt: 3, }} />


      <Typography variant="h5" component="div" gutterBottom>
        8. Resources for Students
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        There is no single text book that covers all of the material in this course at the right level of detail and using the same technology base as we are. The lectures should provide sufficient detail to introduce topics, and you will then study them in further depth in the tutorials, exercises and assignments. For some lectures, further reading material may be given for students who wish to gain a deeper understanding.
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        9. Course Evaluation and Development 
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
         This course is evaluated each session using the MyExperience system.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This is being addressed during 23T1. 
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>We are re-doing parts of the testing lectures to improve clarity for students</li>
          <li>Reducing the workload of the first assignment</li>
        </ul>
      </Typography>
    </>
  );
}

export default CourseOutline23T1;
