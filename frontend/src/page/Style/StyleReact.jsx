import React from 'react';

import makePage from '../../component/makePage';

import { Body, H3, H5, HR, Code, Example } from '../../component/StyleComponents';
import EslintError from '../../asset/style/eslint-error.png';
import EslintSuccess from '../../asset/style/eslint-success.png';
import Box from '@mui/material/Box';

const StyleReact = ({}) => {
  return (
    <>

      <H3>⚛️ 4. ReactJS</H3>

      <Body>The assignments in COMP6080 all have a portion of their marks allocated to code style. As such, it is <b>highly</b> recommended for students to have a read through this style guide.</Body>

      <Body>
        Below is our style guide for COMP6080 for writing good React code. <b>For anything not mentioned here, refer to the <a href="https://github.com/airbnb/javascript/tree/master/react" target="_blank" rel="noreferrer">Airbnb style guide for ReactJS</a>.</b>
      </Body>
      <Body>
        It is a very strict style guide so we don't enforce every principle, but do take it's guidance generally.
      </Body>

      <Body>
        <ul>
          <li><a href="#jsx-casing">4.1. Casing & Quotation</a></li>
          <li><a href="#jsx-comments">4.2. Comments (And examples of E2E/Component testing)</a></li>
          <li><a href="#jsx-modularisation">4.3. Modularisation</a></li>
          <li><a href="#jsx-eslint">4.4. ESLint</a></li>
          <li><a href="#jsx-document">4.5. The Document Keyword</a></li>
          <li><a href="#jsx-functional-vs-class">4.6. Functional VS. Class Components</a></li>
          <li><a href="#jsx-css-and-react">4.7. CSS and React</a></li>
        </ul>
      </Body>

      <HR />

      <H5 id="jsx-casing">⚛️ 4.1. Casing & Quotation </H5>

      <Body>Components that you have made should follow PascalCasing.</Body>

      <Example
        lang="javascript"
        bads={[
`const myComponent = () => {
    //...
}

const my-component = () => {
    //...
}`
        ]}
        goods={[
`const MyComponent = () => {
    //...
}`
        ]}
      />

      <Body>Custom hooks you have made must start with <code>use</code>. i.e., <code>useWindowResize()</code> or <code>useLocalStorage()</code>.</Body>

      <Body>You may use either single (') or double (") quotations as long as you're <b>consistent</b> with which you choose.</Body>

      <Body>JavaScript casing rules applies to other variables. See the above [JavaScript section](#js-casing) for more information.</Body>

      <HR />

      <H5 id="jsx-comments">⚛️ 4.2. Comments (And examples of E2E/Component testing)</H5>

      <Body>Use comments to explain what your components are for and what they do. This is not only for you, but also for your group partner. Additionally, they are also very important when <b>describing the test cases you have written for component and E2E testing</b>.</Body>

      <Example
        title="Example for React Components"
        lang="javascript"
        bads={[
`import React, { useState } from 'react';
import Button from '@mui/material/Button';

const ButtonColorChanger = () => {
  const [buttonColor, setButtonColor] = useState('primary');

  const onClick = () => {
    setButtonColor(buttonColor === 'primary' ? 'secondary' : 'primary');
  };

  return (
    <Button
      color={buttonColor}
      onClick={onClick}
    >
      {\`Current color: \${buttonColor}\`}
    </Button>
  );
};

export default ButtonColorChanger;`
        ]}
        goods={[
`import React, { useState } from 'react';
import Button from '@mui/material/Button';

/**
 * ButtonColorChanger component that toggles its color between red and green on click.
 */
const ButtonColorChanger = () => {
  const [buttonColor, setButtonColor] = useState('primary');

  /**
   * Function called when the button is clicked.
   * Toggles the color between primary and secondary color.
   */
  const onClick = () => {
    setButtonColor(buttonColor === 'primary' ? 'secondary' : 'primary');
  };

  return (
    <Button
      color={buttonColor}
      onClick={onClick}
    >
      {\`Current color: \${buttonColor}\`}
    </Button>
  );
};

export default ButtonColorChanger;`
        ]}
      />

      <Example
        title="Example for Cypress/E2E testing"
        lang="javascript"
        bads={[
`describe('Login functionality', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login')
  });
  it('Allows a registered user to log in', () => {
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="password"]').type('5309206');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('.user-name').should('contain', 'John Doe');
  });
});`
        ]}
        goods={[
`/**
 * This test verifies that a user can successfully log in to the application
 */
describe('Login functionality', () => {
  beforeEach(() => {
    // Visit login page before each test
    cy.visit('localhost:3000/login')
  });

  it('Allows a registered user to log in', () => {
    // Fill in the login form and submit
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="password"]').type('5309206');
    cy.get('button[type="submit"]').click();

    // Verifying that the user has now logged in
    cy.url().should('include', '/dashboard');
    cy.get('.user-name').should('contain', 'John Doe');
  });

  // etc. etc...
});`
        ]}
      />

      <Example
        title="Example for JEST/Component testing"
        lang="javascript"
        bads={[
`import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button.jsx';

describe('Button component', () => {
  it('renders the button correctly', () => {
    const { getByText } = render(<Button label='Click me' />);
    expect(getByText('Click me')).toBeInTheDocument();
  });
  it('handles button click correctly', () => {
    const handleClick = jest.fn();
    const {
      getByText
    } = render(<Button label='Click me' onClick={handleClick} />);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`
        ]}
        goods={[
`import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button.jsx';

// Test suite for the Button component
describe('Button component', () => {
  // Test case for rendering the button
  it('renders the button correctly', () => {
    const {
      getByText
    } = render(<Button label='Click me' />);

    // Assert that the button is rendered with the correct label
    expect(getByText('Click me')).toBeInTheDocument();
  });

  // Test case for handling button click
  it('handles button click correctly', () => {
    // Render the component with the mock click handler
    const handleClick = jest.fn();
    const { getByText } = render(<Button label='Click me' onClick={handleClick} />);
    
    // Simulate a button click
    fireEvent.click(getByText('Click me'));
    
    // Assert that the click handler function is called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // etc. etc...
});`
        ]}
      />

      <Body>Note that you do not need to follow the above verbatim - It is to just give a guide of good commenting habits.</Body>

      <HR />

      <H5 id="jsx-modularisation">⚛️ 4.3. Modularisation</H5>

      <Body>Modularisation is an essential part of building scalable React applications (or any project). If you find your components becoming extremely bloated with loads of hooks in it with deep nesting (i.e., not shallow), chances are that it can be broken into smaller components. <b>Each component should ideally have a single responsibility</b> so it is much easier to perform component testing.</Body>

      <Body>It is also best practice to limit it to <b>one component per file</b> when possible, with the filename being the component's name. This is for easier readability and easier time locating where a component is written. If you find a file housing many components and those components are being used by other components, then that is a sign to split it up.</Body>

      <Example
        lang="javascript"
        bads={[
`import React, { Fragment, useState } from 'react';

const App = () => {
  const [topStory, setTopStory] = useState({});
  const [news, setNews] = useState([]);
  const [tvGuide, setTVGuide] = useState([]);

  useEffect(() => {
    // Fetches all the data from backend...
  }, []);

  return (
    <Fragment>
      <div>
        {/* Navigation bar */}
      </div>
      <div>
        {/* Shows top story of the day */}
      </div>
      <div>
        {/* Shows news */}
      </div>
      <div>
        {/* Shows tv guide */} 
      </div>
    </Fragment>
  )
}`
        ]}
        goods={[
`import React, { Fragment } from 'react';
import Navbar from './Navbar.jsx';
import TopStoryDisplay from './TopStoryDisplay.jsx';
import NewsDisplay from './NewsDisplay.jsx';
import TVGuide from './TVGuide.jsx';

const App = () => {
  // Separates all the states, useEffects etc. into its respective component. Delegates responsibility to separate components.
  return (
    <Fragment>
      <Navbar />
      <TopStoryDisplay />
      <NewsDisplay />
      <TVGuide />
    </Fragment>
  )
}`
        ]}
      />

      <HR />

      <H5 id="jsx-eslint">⚛️ 4.4. ESLint</H5>

      <Body>You'll be given a pre-setup ESLint with your React Assignment. <b>Do not ignore</b> the errors and warnings it outputs, as it will point out little style rules you have not followed.</Body>

      <b>🔴Bad</b>
      <Box component='img' display='block' src={EslintError} alt="ESLint Error" width="700px" />
      <br />
      <b>🟢Good</b>
      <Box component='img' display='block' src={EslintSuccess} alt="ESLint Success" width="700px"/>
  
      <Body>Note that the ESLint compiler errors shown above was using the configuration from 22T3. Please use the configuration given to you in your Assignment.</Body>

      <HR />

      <H5 id="jsx-document">⚛️ 4.5. The Document Keyword</H5>

      <Body>When you're working on a React project, it's highly recommended avoid the `document` keyword, which you may have used in previous assignments. This is because React already manages DOM manipulation for you through its virtual DOM. Using this keyword also hinders your components reusability (as seen below). By relying on the `document` keyword, you're overlooking the innovative features that make React so widely used.</Body>

      <Example
        lang="javascript"
        bads={[
`import React from 'react';
import Box from '@mui/material/Box';

const HoverTest = () => {
  const handleMouseEnter = () => {
    // This is poor practice, as since ids are meant to be unique, you wouldn't be able to reuse this component.
    document.getElementById('hover-box').textContent = 'Hovering';
  };

  const handleMouseLeave = () => {
    document.getElementById('hover-box').textContent = 'Not Hovering';
  };

  return (
    <Box
      id='hover-box'
      sx={{
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {'Hovering'}
    </Box>
  );
};`
        ]}
        goods={[
`import React, { useState } from 'react';
import Box from '@mui/material/Box';

const HoverTest = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering ? 'Hovering' : 'Not Hovering'}
    </Box>
  );
};`
        ]}
      />

      <HR />

      <H5 id="jsx-functional-vs-class">⚛️ 4.6. Functional VS. Class Components</H5>

      <Body>Stick to <b>Functional</b> components rather than Class components. This is because, but not limited to:
        <ul>
          <li><b>Simplicity</b> - It is easier to test and understand Functional components as you won't need to worry about complex concepts such as lifecycle methods or `this` keyword.</li>
          <li><b>Modernity</b> - With Functional components being the most popular, there is more resources online to help you out. There are also a lot more libraries available for Functional components compared to Class components.</li>
          <li><b>Hooks</b> - These simplify state management, handling side effects and the lifecycle functionalities in components without the need of classes.</li>
        </ul>
      </Body>

      <Example
        lang="javascript"
        bads={[
`import React, { Component } from 'react';

class ButtonClicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
  }

  onClick = () => {
    this.setState(prevState => ({
      clickCount: prevState.clickCount + 1,
    }));
  };

  render() {
    const { clickCount } = this.state;

    return (
      <button onClick={this.onClick}>
        {clickCount}
      </button>
    );
  }
}

export default ButtonClicker;`
        ]}
        goods={[
`import React, { useState } from 'react';

const ButtonClicker = () => {
  const [clickCount, setClickCount] = useState(0);

  const onClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <button onClick={onClick}>
      {clickCount}
    </button>
  );
};

export default ButtonClicker;`
        ]}
      />

      <HR />

      <H5 id="jsx-css-and-react">⚛️ 4.7. CSS and React</H5>

      <Body>When it comes to CSS, <b>do not use universal CSS</b> (i.e., importing a `.css` file into a React component). Likewise, you should also avoid inline styling. See the following lectures for more information:
        <ul>
          <li><a href="https://youtu.be/Z0OPBwLu5s0">Global CSS</a> for why it is not great practice.</li>
          <li><a href="https://youtu.be/o81ktwwig3g">CSS Frameworks</a> for what the better practices are.</li>
        </ul>
      </Body>

      <Body>The better practices include:
        <ul>
          <li>CSS Modules (generally not recommended, but still OK)</li>
          <li>Using utility class frameworks including but not limited to:
            <ul>
              <li>Tailwind CSS</li>
              <li>Bootstrap/React-Bootstrap</li>
            </ul>
          </li>
          <li>CSS-in-JS methods including but not limited to:
            <ul>
              <li>Styled Components to create your own custom CSS </li>
              <li>Material UI (MUI) sx and styling options</li>
            </ul>
          </li>
        </ul>
      </Body>

      <Body>The following examples uses MUI v5. We highly recommend exploring [MUI's documentation](https://mui.com/material-ui/getting-started/overview/) to maximise the utility of these practices. Also, you are not just restricted to MUI; feel free to explore other libraries that offer similar functionality.</Body>

      <Example
        lang="javascript"
        bads={[
`import './image.css';

const GrayCard = ({ src, alt }) => {
  return (
    <img className='gray-image' alt={alt} src={src} />
  )
}`
        ]}
        goods={[
`// using MUI's sx prop
import { Box } from '@mui/material';

const GrayCard = ({ src, alt }) => {
  return (
    <Box
      component='img'
      alt={alt}
      src={src}
      sx={{
        filter: 'grayscale(100%)',
        '&:hover': {
          // Mouse over image to enlargen it
          scale: '1.25'
        }
      }}
    />
  )
}`,
`// using MUI's styled component
// In a separate .jsx file
import { styled } from '@mui/material';

export const GrayCard = styled('img')({
  filter: 'grayscale(100%)',
  '&:hover': {
    // Mouse over image to enlargen it
    scale: '1.25'
  }
});

// How it's used in another separate .jsx file
const App = () => {
  return (
    <GrayCard src='https://picsum.photos/200' alt='Old days' />
  )
}`
        ]}
      />
    </>
  );
};

export default makePage(StyleReact, {
  loginRequired: true,
  title: 'HTML Style',
});