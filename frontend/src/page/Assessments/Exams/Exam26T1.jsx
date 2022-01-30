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
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        1. Requirements to sit the exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        During the duration you sit the exam, you must have access to a stable internet connection
        for pushing to gitlab and receiving emails.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam is covered by UNSW's Fit-to-Sit policy. That means that by sitting this exam, you
        are declaring yourself well enough to do so and cannot later apply for Special
        Consideration.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If, during an exam you feel unwell to the point that you cannot continue with the exam, you
        should take the following steps:
        <ol>
          <li>Stop working on the exam and take note of the time</li>
          <li>
            Make contact immediately with cs6080@cse.unsw.edu.au and advise them that you are unwell
          </li>
          <li>
            Immediately submit a Special Consideration application saying that you felt ill during
            the exam and were unable to continue
          </li>
          <li>
            If you were able to advise cs6080@cse.unsw.edu.au of the illness during the assessment,
            attach screenshots of this conversation to the Special Consideration application
          </li>
        </ol>
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
        Your exam will be worth 20% of the course.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be very similar to assignment 4, with the following simplified criteria:
        <ul>
          <li>80%: Providing the features and functionality required in a desktop viewport</li>
          <li>20%: Ensuring functionality in other viewport sizes, i.e. tablet, mobile</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The main differences compared to assignment 4 are that the exam will:
        <ul>
          <li>Be substantially less work than ass4</li>
          <li>
            Not be assessed in terms of linting & code design & accessibility & ui/ux - <i>we will not
            look at your source code when marking</i>
          </li>
          <li>Will not have a backend attached (local storage will be used instead)</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        You are allowed to use your code from other assessments in the exam (or in the case of
        assignment 4, your group's code).
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        4. Platform to complete exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam will be distributed via gitlab, and operationally be very similar to the release
        and submission of a single assignment repo.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        The exam must be completed locally or via vlab. Regardless of where you complete the exam,
        you must:
        <ul>
          <li>Ensure you push the work you want submitted to your gitlab master branch</li>
          <li>Ensure that your code works as expected in the latest version of Google Chrome</li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Technical issues relating to your local environment that are reasonably solvable prior to
        the exam are not grounds for special consideration.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        5. Communication & Help during the exam
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>
            This exam is an open book exam, meaning you are able to use the internet and other
            resources, with a few exceptions.
            <ul>
              <li>
                You may only seek assistance from Invigilators or Course Staff via Discourse during the exam.
                All other forms of communication are strictly prohibited once the exam has commenced.
              </li>
              <li>
                You cannot use code generation tools such as LLMs, including but not limited to,
                ChatGPT, Gemini, etc. If you're using a tool that generates code that you didn't
                write by hand then it should be considered prohibitive and may result in a 0 grade.
                The only two exceptions are:
                <ul>
                  <li>
                    The immediate AI results summary that comes from entering a query into
                    a search engine
                  </li>
                  <li>
                    Non-AI powered single-line autocompletion tools(e.g. variable name suggestions etc). This differs
                    from some of the newer auto-complete functionality in tools like cursor that
                    will suggest multiple lines of code that it can generate

                    Examples of this include: Linters, IntelliSense style auto complete extensions, Auto Imports etc.
                  </li>
                </ul>
            </li>
              <li>More specific examples on what is <b>strictly prohibited</b>:
                <ul>
                  <li>
                    Any AI webpages such as ChatGPT, Gemini, DeepSeek, Perplexity, etc. You cannot have these pages open during the exam.
                  </li>
                  <li>
                    Any AI chats or conversations. You cannot have any conversations with any AI during the exam. This includes any search engine AI Overview chats, any chatbots, Dev Tools AI assist etc.
                  </li>
                  <li>
                    Any AI agents such as Cursor, Copilot agents etc.
                  </li>
                  <li>
                    Any AI inline chats, suggestions and features such as with Claude, Copilot etc.
                  </li>
                  <li>
                    Any AI powered ide integrated browser features.
                  </li>
                </ul>
              </li>
              <li>
                Whilst you can use resources on the internet, you cannot copy or plagiarise those
                resources. The only material you can copy is any of your own assignment work, any
                work you've prepared in advance, or any course materials
              </li>
            </ul>
          </li>
          <li>
            Do not place your exam work in any location, including file sharing services such as
            Dropbox or GitHub, accessible to any other person. Ensure during the exam that no other
            person can access your work.
          </li>
          <li>
            Your zpass should not be disclosed to any other person. If you have disclosed your zpass, you should change it immediately.
          </li>
        </ul>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <b>
          Deliberate violation of exam conditions will be referred to Student Integrity as serious
          misconduct. This may result in a 0 for the course.
        </b>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        If you have any questions or clarifications about the exam during the exam, please ask in the forum.
        For any other questions(feeling sick etc.), please ask the invigilator.
        <br/><br/>
        Do NOT email or MS Teams any course staff during the exam. ONLY the discourse forum will be monitored by course staff.
        <br/>
        Clarifications made during the exam will be outlined in a Change Log at the top of the exam paper page. After
        each clarification, invigilators will notify students to refresh the exam paper page.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        6. Git Commit Requirements
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        To avoid being penalised in the final exam we require that you:
        <ul>
          <li>Make commits no more than 100 lines of code</li>
          <li>Have meaningful commit names</li>
        </ul>
        Exceptions to the 100 line commit requirement are made for initial setup files (e.g.,
        package.json) and when running lint. However, the commit message must explicitly reflect
        this. Example:
        <ul>
          <li>Commit over 100 lines: Initial React app setup</li>
        </ul>
        If you have other specific circumstances (like adding large configuration files or
        dependencies), similarly explain these in your commit message. Ensure the message clearly
        conveys the reason for the exception.
        <strong>The commit must not contain other code</strong> for these exceptions to be valid.
        Reasons such as adding new functionality, components, or other code-related changes are not
        accepted. Excepted commits must not contain such changes.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Hurdle Requirements
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        This exam has a hurdle component - which means if you don't achieve a <i>scaled</i> pass
        mark then you will not pass the course.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        7. Submission
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Push to master regularly throughout your exam. Once the exam is complete, we will take the
        last commit you have pushed to your master branch up on gitlab. Please check the gitlab site
        directly before the completion of the exam.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Do not leave it to the deadline to push your code to master. Submit each question when you
        finish working on it.
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        8. Preparation
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>
            Review previous exercises and assignments to stay confident with both theory and
            practical elements of the course.
          </li>
          <li>
            An exam submission repo will be released to each student before the exam.
            <ul>
              <li>You are free to push any files you want to that repo before the exam begins.</li>
            </ul>
          </li>
          <li>
            A sample exam paper can be found{' '}
            <a
              target="_blank"
              href="https://gitlab.cse.unsw.edu.au/coursework/COMP6080/exam-sample-spec"
            >
              here
            </a>
            .
            <ul>
              <li>
                A solution (built file, not the source code) of the sample exam can be found{' '}
                <a target="_blank" href="https://cs6080.web.cse.unsw.edu.au/sample-exam/">
                  here
                </a>
                . Please note, this solution may be incomplete, but it is mostly complete.
              </li>
            </ul>
          </li>
          <li>
            Ensure you will have access to GitLab during the exam (double check your GitLab tokens aren't expiring)
          </li>
          <li>
            Ensure you have access to the Discourse forum and know how to ask questions on it.
          </li>
          <li>
            Ensure your node versions are up to date and you are able to set up a
            React App locally or on vlab that runs with `npm run dev` or `yarn dev`
            prior to the start of the exam.
          </li>
          <li>
            Ensure you understand how to disable any IDE/browser AI tooling you own
            and that all of your AI tools are disabled prior to the start of the exam
          </li>
        </ul>
      </Typography>
      <Typography variant="h5" component="div" style={{ marginTop: '20px', marginBottom: '10px' }}>
        9. In-Person Exam Rules
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
          This is a BYOD (bring your own device) exam and as such <b>it is expected that students will bring their own devices to complete the exam</b>.  
          <br/>
          <b><br/>Required Items</b>
          <ul>
          <li>A laptop to complete the exam</li>
          <li>A pen/pencil to sign the declaration of identity.
            <ul>
            <li>Writing materials will <strong>NOT</strong> be provided.</li>
            </ul>
          </li>
          <li>A valid UNSW Student ID card.
            <ul>
            <li>You must present a valid UNSW Student ID card. No other forms of identification will be accepted.</li>
            <li>If your card is expired or missing:
              <ul>
                <li>Obtain a replacement from The Nucleus: Student Hub</li>
                <li>Hours: Weekdays, 10am–5pm</li>
                <li>New cards require an appointment</li>
              </ul>
            </li>
          </ul>
          </li>
          </ul>
          <b>Allowed Items</b>
          <ul>
            <li>An external keyboard and/or mouse</li>
            <li>1 additional monitor (e.g. iPad used as a second screen). Small or non-visible devices (e.g. phones) are not permitted as monitors.</li>
            <li>Paper notes</li>
            <li>Stationery</li>
            <li>Chargers and extension boards
              <ul>
                <li>While we will try to accomodate to the best of our abilities, access to power outlets may be limited. <b>If you bring an extension board, please keep it in your bag until it is necessary</b></li>
              </ul>
            </li>
          </ul>
          <b>Prohibited Items</b>
          <ul>
          <li>Mobile phones are not permitted, they:
            <ul>
              <li>Must be switched off or on silent</li>
              <li>Must not be accessed during the exam</li>
            </ul>
          </li>
          <li>Electronic watches (e.g. smartwatches) are not allowed.</li>
          <li>Any electronic devices not explictly allowed are strictly prohibited. If you require an exception please seek special consideration</li>
          <li>You may not wear hats, sunglasses, or anything else that hides your appearance during the exam. With the exception of masks and religious headwear. If you are wearing a mask or religious headwear, you may be asked to remove it so your identity can be confirmed. If this is required it will be done in the least intrusive way possible.</li>
          <li>You may not use earphones, or earpods, or wear anything that covers your ears during the exam.</li>
          </ul>
          <b>Other</b>
          <ul>
          <li>All device screens must be clearly visible to invigilators at all times.</li>
          <li>If you are unsure about whether a device is allowed, you must seek approval in advance (via Discourse). Any unauthorised electronic devices will be confiscated or rejected.</li>
          </ul>
     </Typography>
    </>
  );
};

export default CourseOutline26T1;
