export const ass1a = `
## 1. Before you start

### 1.1. Background & Motivation

This assessment focuses on you implementing a series of basic web pages that look and behave like images and descriptions we we provide.

A basic capability required of someone working with user-facing interfaces is to be able to produce a web page that looks and behaves like something that has been clearly specified (e.g. an image). A common workflow within a product team may consist of a designer producing a high fidelity mock-up, which a developer will then take and use HTML/CSS to build the webpage for usage. In reality this process tends to be a bit more collaborative, and the high fidelity mockups provided are usually quite detailed and visually consist of many interact layers. However, for the sake of simplicity and fundamental knowledge we are providing flattened images with written requirements.

This assessment aims to allow students to demonstrate knowledge they've developed during week 1-3 of the course. You will be building web pages with HTML and CSS.

This assessment focuses on demonstrating skills with HTML ("Hyper Text Markup Language") and CSS ("Cascading Style Sheets") covered in week 1 of the course. Most of the tasks centre around this.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):
 * [HTML Fundamentals](/~cs6080/NOW/content/lectures/html-fundamentals)
 * [CSS Rules](/~cs6080/NOW/content/lectures/css-rules)
 * [CSS Formatting](/~cs6080/NOW/content/lectures/css-formatting)
 * [Flexbox](/~cs6080/NOW/content/lectures/css-flexbox)
 * [Mobile CSS](/~cs6080/NOW/content/lectures/css-mobile)
 * [Fonts](/~cs6080/NOW/content/lectures/css-fonts)
 
You will _need_ to watch at least the following lectures to finish the assessment completely:
 * [Dev Tools](/~cs6080/NOW/content/lectures/dev-tools)`

export const ass1b = `

## 3. Analysing the pages

### 3.1. Analysing the Pages

Two things will want to seek external help for are:
1) Determining the particular colour (RGB or HEX) of various pixels (we recommend the use of [a chrome extension](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/), though other alternatives may be appropriate for you)
2) Determining the size of particular elements (we recommend the use of [photopea](https://www.photopea.com/)). An screenshot example of it's usage is below
![](/~cs6080/assets/photopea.png)

### 3.2. Font Sizes

You will also be curious to know what the correct font-size and other font properties are for this assignment. Part of this assignment is trying to explore the relationship between how a font looks and the properties that are set for the element. 

Generally the best approach is to set a basic font size (e.g. \`font-size: 1.1em\`), see how it looks, and if it just generally seems too big or too small, then adjust the \`em\` or \`rem\` value appropriately until you're comfortable with it. You will not be  penalised for having font that is off by a few pixels in size. We will cover best practices when it comes to font sizing later in the course. 

## 4. Constraints & Assumptions

### 4.1. Correct viewing settings

Don't forget to put this code in the head of each webpage you make:
~~~js
<meta name="viewport" content="width=device-width, initial-scale=1.0">
~~~
. It will help you on mobile responsive view get the right zoom.

### 4.2. Fair use of methods

You are prohibited from unreasonable use of images and svg to solve your problem - more specifically, you cannot upload large chunks of the 'page' as just a single SVG image or single JPG.

### 4.3. Browser Compatibility

You should ensure that your programs have been tested on Google Chrome, ensuring that you are running the latest version.

### 4.4. External libraries

You are restricted from using any third party CSS libraries when completing this assessment. Basically, this means you can't import code using the \`<script />\` and \`<link />\` tags if it's from a file you did not write yourself, and you shouldn't be copying any larger chunks of code from other sources.

## 5. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

### 5.1. Visual Compliance (50%)
  
 * Rendered static HTML page accurately matches the reference image provided for each task. *Please note: For text, don't expect every word to match every position on every line. Different screens, browsers, operating systems may display text slightly differently. It's normal for words to overflow in different positions.* 
 * For specified tasks, if applicable, pseudo-class behaviour satisfies the task requirements
 * For specified tasks, rendered HTML page renders appropriately for intermediate sizes

### 5.2. Code Quality (50%)
 * Your code is compliant with the course style guide, which includes but is not limited to:
   * HTML is appropriately formatted such that each inner HTML is indented with respect to the outer one
   * HTML follows the correct structure and usage of head, title, meta, body 
   * CSS is appropriate structured to be placed in external stylesheets rather than inline styles
   * CSS ID and class selectors are clearly and meaningfully named
   * CSS has limited repetition where multiple similar components use the same underlying styles
   * Ensure that source code (HTML, CSS) is no more complicated or verbose than necessary to solve a given problem (less is more).
   * Maintaining separation between HTML and CSS for structural and stylistic aspects, respectively
   * Avoiding usage of more obselete methods of page styling that have been discussed in lectures (e.g. tables for non-tabular purposes)
   
## 6. Git Commit Requirements

It's imperative that we are able to track your progress when marking.

There are some requirements for us to track your ongoing progress:

1. You must make commits on at least 4 unique days prior to due date.
1. You must make at least 20 commits across the course of your assignment.
2. Your commits must be meaningful in description (e.g. "Continued work on loop speed")
3. Each commit include no more than 100 lines additions of code (this may differ in future assignments). You are given 3 exceptions.

Failure to adhere to these guidelines in their entirety may result in a penalty up to 50%. Any moderate or significant failure may result in a 0 grade.

## 7. Originality of Work

The work you submit must be your own work.  Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalized, even if the work was submitted without your
knowledge or consent.  This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.

## 8. Submission

To submit your assignment, you must have pushed all of your code to your gitlab master branch. You can check if you've done this properly by seeing what code is on the gitlab site on your master branch.
 
We will collect the latest work on your master branch of gitlab at the time of submission.

It is your responsibility to ensure that your code can run successfully when cloned fresh from Gitlab.

## 9. Late Submission Policy

No late submission are accepted`;

export const ass2a = `

## 1. Before you start

### 1.1. Background & Motivation

This assessment aims to allow students to demonstrate knowledge they've developed during week 3 of the course. You will given a static HTML page and be asked to write Javascript to make the webpage dynamic according to the spec.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):

- Everything from assesssment 1
- [Javascript Language & Syntax](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-syntax-intro)
- [WebJS Intro](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-browser-intro)
- [DOM](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-browser-dom)
- [Events](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-browser-dom)

You will _need_ to watch at least the following lectures to finish the assessment completely:

- [Closures](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-closures)
- [Forms](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-browser-forms)`;

export const ass2b = `
## 3. Constraints & Assumptions

### 3.1. Browser Compatibility

You should ensure that your programs have been tested on one of the following two browsers:

- Locally, Google Chrome (various operating systems) latest version
- On CSE machines, Chromium

### 3.2. External libraries

You are restricted from using any third party JS libraries when completing this assessment. Basically, this means you can't import code using the \`<script />\` tag or \`fetch\` keyword if it's from a file you did not write yourself, and you shouldn't be copying any larger chunks of code from other sources.

## 4. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

### 4.1. Visual Compliance (50%)
 * For specified elements of the page, JS events triggered by specific actions occur.

### 4.2. Code Quality (50%)
 * JS code is appropriately styled and formatted based on common conventions shown in lectures and the style guide.
 * Ensure that source code (JS) is no more complicated or verbose than necessary to solve a given problem (less is more).
 * Your code is clean, well commented, with well-named variables, and well laid out as highlighted in the course style guide.

## 4. Git Commit Requirements

It's imperative that we are able to track your progress when marking.

There are some requirements for us to track your ongoing progress:

1. You must make commits on at least 2 unique days prior to due date.
1. You must make at least 5 commits across the course of your assignment.
2. Your commits must be meaningful in description (e.g. "Add validation check to full name input field")
3. Each commit include no more than 50 lines additions of code (this may differ in future assignments). You are given no exceptions.

Failure to adhere to these guidelines in their entirety may result in a penalty up to 50%. Any moderate or significant failure may result in a 0 grade.

## 5. Originality of Work

The work you submit must be your own work. Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalized, even if the work was submitted without your
knowledge or consent. This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.

**PLEASE NOTE: To ensure the originality of your work, we are requiring that you regularly commit your work to git throughout the weeks this assignment has been released. Regular and small commits (essentially at least once a day that you work on the assignment) are critical. Failures to commit regularly (or at minimum, failures to commit in small chunks) may results in either penalties of up to 20% of result in allegations of plagiarism.**

## 6. Submission

To submit your assignment, you must you've pushed all of your code to your gitlab master branch. You can check if you've done this properly by seeing what code is on the gitlab site on your master branch.

We will collect the latest work on your master branch of gitlab at the time of submission.

It is your responsibility to ensure that your code can run successfully when cloned fresh from Gitlab.

## 7. Late Submission Policy

No late submission are accepted.

`;

export const ass3a = `

## 1. Before you start

### 1.1. Background & Motivation

Web-based applications are becoming the most common way to build a digital capability accessible to a mass audience. While there are modern tools that help us build these rapidly, it's important to understand the fundamental JavaScript-based technology and architectures that exist, both to gain a deeper understanding for when these skills may be needed, but also to simply understand the mechanics of fundamental JS. Even when working with a high level framework like ReactJS, understanding (in-concept) the code that it is transpiled to will ensure you're a more well rounded web-based engineer.

This assignment consists of building a **frontend** website in Vanilla JS (no ReactJS or other frameworks). This frontend will interact with a RESTful API HTTP backend that is built in JavaScript (NodeJS express server) and provided to you.

A theoretical background on how to interface with this API can be found the "promises & fetch" lecture.

The web-based application you build is required to be a single page app (SPA). Single page apps give websites an "app-like feeling", and are characterised by their use of a single full load of an initial HTML page, and then using AJAX/fetch to dynamically manipulate the DOM without ever requiring a full page reload. In this way, SPAs are generated, rendered, and updated using JavaScript. Because SPAs don’t require a user to navigate away from a page to do anything, they retain a degree of user and application state. In short, this means you will only ever have \`index.html\` as your HTML page, and that any sense of "moving between pages" will just be modifications of the DOM. Failure to implement your site as a single page app will result in significant penalties.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):
 * Everything from assesssment 2
 * [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-frameworks)

You will _need_ to watch at least the following lectures to finish the assessment completely:
 * [Local storage](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-browser-localstorage)
 * [Events & Callbacks](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-async-callbacks)
 * [Promises](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-async-promises)
 * [AJAX Introduction](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/ajax-intro)
 * [Fetch](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/ajax-fetch)
 * [UI Fundamentals](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/ui-fundamentals)
 * [Perceivability](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/accessibility-perceivability)
 * [Operability](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/accessibility-operability)
 * [Understandability](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/accessibility-understandability)
 * [Robustness](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/accessibility-robustness)`

export const ass3b = `

## 3. Getting started

### 3.1. The Frontend

Stub code has been provided to help you get started in:
 * \`frontend/index.html\`
 * \`frontend/styles/global.css\`
 * \`frontend/src/helpers.js\`
 * \`frontend/src/main.js\`

You can modify or delete this stub code if you choose. It's simply here to potentially provide some help.

To work with your frontend code locally with the web server, you may have to run another web server to serve the frontend's static files.

To do this, run the following command once on your machine:

~~~sh
$ npm install --global http-server
~~~

Then whenever you want to start your server, run the following in your project's root folder:

~~~sh
$ npx http-server frontend -c 1 -p [port]
~~~

Where \`[port]\` is the port you want to run the server on (e.g. \`8080\`). Any number is fine.

This will start up a second HTTP server where if you navigate to \`http://localhost:8000\` (or whatever URL/port it provides) it will run your \`index.html\` without any CORs issues.

### 3.2. The Backend

You are prohibited from modifying the backend. No work needs to be done on the backend. It's provided to you simply to power your frontend.

The backend server can be cloned by running \`git clone git@nw-syd-gitlab.cseunsw.tech:COMP6080/[term]/ass3-backend.git\` where [term] is the current term (e.g. 24T3). After you clone this repo, you must run \`npm install\` in the project once.

To run the backend server, simply run \`npm start\` in the backend project. This will start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. \`http://localhost:5005\`). This will list all of the HTTP routes that you can interact with.

We have provided you with a very basic starting database containing two users and one public channel with messages. You can look in \`backend/database.json\` to see the contents.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run \`npm run reset\` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy \`database.json\`. If you want to start with an empty database, you can run \`npm run clear\` in the backend directory.

Once the backend has started, you can view the API documentation by navigating to \`http://localhost:[port]\` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in \`frontend/src/config.js\`. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.

Please note: If you manually update database.json you will need to restart your server.

Please note: You CANNOT modify the backend source code for bonus marks.

### 3.3. Taking the first steps

This is how we recommend you start the assignment:
 1. Read the entire spec, including a thorough read of section 2 so you know what is ahead of you!
 2. Try to load up the \`index.html\` on your browser with a simple "Hello world" text just to sanity check you know what page you're trying to load.
 3. Plan out your UI by thinking about all of the key screens and what information they rely on
 4. Try to load up the backend and verify you've got it working by navigating to the API documentation - Swagger \`http://localhost:5005\` and testing some of the routes.
 5. Good luck!

### 3.4. Making a fetch request

Here is some helpful starter code to make a POST request (for non-authenticated routes). Note: there are many other ways (and some cleaner than this) to do this, so don't assume this is perfect code. It will just help you get started.

~~~js
const apiCall = (path, body) => {
  fetch('http://localhost:5005/' + path, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert(data.error);
    } else {
      Promise.resolve(data);
    }
  });
};
~~~

Here is some helpful starter code to make a GET request (for authenticated routes). Note: there are many other ways (and some cleaner than this) to do this, so don't assume this is perfect code. It will just help you get started.

~~~js
const apiCall = (path, token, queryString) => {
  fetch('http://localhost:5005/' + path + '?' + queryString, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert(data.error);
    } else {
      Promise.resolve(data);
    }
  });
};
~~~

## 4. Constraints & Assumptions

### 4.1. Javascript

 * You must implement this assignment in ES6-compliant Vanilla JavaScript. You cannot use ReactJS, JQuery, or other abstract frameworks. You cannot, for example, use a popular Javascript framework such as [Angular](https://angular.io/) or [React](https://reactjs.org/).
 * You may **NOT** directly use external JavaScript. Do not use NPM except to install any other development libraries without prior approval from course authority.

### 4.2. CSS and other libraries

 * You may use small amounts (&lt; 10 lines) of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should clearly attribute the source of this code in a comment with it. You can not otherwise use code written by another person.
 * You may include external CSS libraries in this assignment (with the \`<link />\` tag). You must attribute these sources (i.e. provide the URL/author in source code comments). For example, you are permitted to use the popular [Bootstrap](https://getbootstrap.com/) CSS framework. Some Bootstrap functionality relies on accompanying Javascript. You are permitted to include this Javascript. The Javascript accompanying Bootstrap requires the popular general purpose Javascrpt library [jQuery](https://jquery.com). You are permitted to include **jQuery** so bootstrap can use it. However you are not permitted to use **jQuery** in the code you write for the assignment.

### 4.3. Browser Compatibility

You should ensure that your programs have been tested on one of the following two browsers:
 * Locally, Google Chrome (various operating systems)
 * On CSE machines, Chromium

### 4.4. Other Requirements

 * The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
 * This is not a design assignment. You are expected to show common sense and critical thinking when it comes to basic user experience and visual layout, but you are not required to be creative to achieve full marks.
 * Your web app must be a single page app. This means that there is only one initial browser load of content on one html page, and all subsequent dynamic changes to the page are based on Javascript DOM manipulation, and not through any page refreshes. If you do not build a single page app (e.g. using links to multiple HTML pages), you will receive a 50% penalty of your mark.
 > **What is non-SPA?**<br>
 > Non-SPA is a multi-page application where each new page is loaded from the server, causing a full page reload with each navigation. This contrasts with SPAs, which handle navigation on the client side for faster interactions.

### 4.5. Static HTML, innerHTML, DOM manipulation

In this assignment, you are:
 * Add static HTML/CSS to the stub website provided (i.e. you can put raw HTML/CSS as if it's a static page, even if you then later manipulate it with JavaScript).
 * Build HTML elements and add CSS properties to the DOM via JavaScript.
 * Use \`innerText\` properties/functions

### 4.6. Prohibited Usages

* You are not allowed to have more than 1 HTML file in your repo.
* You are strictly **not** allowed to use the \`async\` and \`await\` syntax in this assignment. You must use Javascript Promises. The use of any \`async\` or \`await\` will result in a 50% penalty of your mark.
* You are prohibited from using any string-to-DOM parser (e.g. DOMParser, or the \`innerHTML\` property, or \`insertAdjacentHTML\` or anything similar). The use of any of this will result in a 50% penalty of your mark. You can read more about this [https://www.dhairyashah.dev/posts/why-innerhtml-is-a-bad-idea-and-how-to-avoid-it/](here).

## 5. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

Please note: When we test your UI we will use a pre-loaded database JSON that already has threads and users and watches added to it. 

### 5.1. Compliance to task requirements (70%)
 * Each milestone specified a particular % of overall assignment (summing up to 70%). Implement those components as required to receive the marks.
 * You **MUST** update the \`progress.csv\` file in the root folder of this repository as you complete things partially or fully. The valid values are "NO", "PARTIAL", and "YES". Updating this is necessary so that your tutor knows what to focus on and what to avoid - giving them the best understanding of your work and provide you with marks you have earned. Failure to correctly fill in this file will result in a 5% penalty.

### 5.2. Mobile Responsiveness (15%)
 * Your application is usable for desktop sizes generally, tablet sizes generally, and mobile sizes generally (down to 400px wide, 700px high).

### 5.3. Code Style (10%)
 * Your code is clean, well commented, with well-named variables, and well laid out as highlighted in the course style guide.
 * Code follows common patterns that have been discussed in lectures and as highlighted in the course style guide.
 * If you do not complete at least 50% of the assignment, your code quality mark will be scaled down to some degree based on the limited contributions.
      
### 5.4. Usability & Accessibility (5%)
 * Your application is usable and easy to navigate. No obvious usability issues or confusing layouts/flows.
 * Your application follows standard accessibility guidelines, such as use of alt tags, and colours that aren't inaccessible.
 * Describe any attempts you've made to improve the usability/accessibility in <code>usability.md</code>
      
### 5.5. Bonus Marks (5%)
 * An extra 5% of the assignment can be attained via bonus marks, meaning a maximum mark of 105/100. Any bonus marks that extend your ass2 mark above 100% will bleed into other assignment marks, but cannot contribute outside of the 75% of the course that is allocated for assignment marks
 * Your bonus feature(s) can be anything. You just have to think of something that could make your web app stand out in some minor or major way. Simple examples would include just making sure that your user interface and user experience stands out amongst other students, maybe through some user testing.
 * You could also add extra features, such as some additional frontend form validations - the possibilities are limitless.
 * If you do implement a bonus feature, describe the feature and its details in \`bonus.md\` in the root directory of this repository.

## 6. Git Commit Requirements

It's imperative that we are able to track your progress when marking.

There are some requirements for us to track your ongoing progress:

1. You must make commits on at least 4 unique days prior to due date.
1. You must make at least 20 commits across the course of your assignment.
2. Your commits must be meaningful in description (e.g. "Continued work on loop speed")
3. Each commit include no more than 100 lines additions of code (this may differ in future assignments). You are given no exceptions.

Failure to adhere to these guidelines in their entirety may result in a penalty up to 50%. Any moderate or significant failure may result in a 0 grade.

## 7. Originality of Work

The work you submit must be your own work.  Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalized, even if the work was submitted without your
knowledge or consent.  This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.

**PLEASE NOTE: To ensure the originality of your work, we are requiring that you regularly commit your work to git throughout the weeks this assignment has been released. Regular and small commits (essentially at least once a day that you work on the assignment) are critical. Failures to commit regularly (or at minimum, failures to commit in small chunks) may results in either penalties of up to 20% of result in allegations of plagiarism.**

## 8. Submission

To submit your assignment, you must you've pushed all of your code to your GitLab master branch. You can check if you've done this properly by seeing what code is on the GitLab site on your master branch.
 
We will collect the latest work on your master branch of GitLab at the time of submission.

It is your responsibiltiy to ensure that your code can run successfully when cloned fresh from Gitlab.

## 9. Late Submission Policy

No late submission are accepted.
`;


export const ass4a = `

## 1. Before you start

### 1.1. Background & Motivation

**This assignment is the process you building the front-end for that MVP(Minimum viable product) to the standards described.** Features need to be implemented in order for your React.js app to meet the requirements of the task, and to operate with the backend described in the spec.

The requirements describe a series of **screens**. Screens can be presented as popups/modals, or full-page views. The term _Screen_ is used to refer to a specific state or representation of the web application. You have the flexibility to decide how to implement them, whether as modals, separate pages, or other appropriate UI components.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):

- [Javascript Ecosystem](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-ecosystem)
- [Node Package Manager](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-npm)
- [ReactJS Introduction](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-intro)
- [ReactJS Global CSS Usage](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-css-basic)
- [ReactJS Lifecycle](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-lifecycle)
- [ReactJS useState hook](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-hooks-state)
- [ReactJS useEffect hook](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-hooks-effect)
- [Working with multiple files](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/multi-file-import)
- [Components & Props](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-components-props)
- [Linting](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/javascript-linting)

You will _need_ to watch at least the following lectures to finish the assessment completely:

- [Routing & SPAs](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-routing-spas)
- [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-css-frameworks)
- [useContext hook](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/react-hooks-context)
- [Testing introduction](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/testing-intro)
- [Component testing](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/testing-components)
- [UI Testing](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/testing-ui)

### 1.3. Setup & Requirements

You are to build a web app using a provided backend. This app shall be built with React.js. It must be a SPA (Single Page Application), which means navigation between different views or "pages" should not require full page reloads and you should not add/modify \`.html\` files in \`frontend\` folder. Failure to align with this requirement will result in a 50% penalty of the mark.

#### 1.3.0 IMPORTANT setup

You are to build a web app using a provided backend. This app shall be built with React.js. It must be a SPA (Single Page Application), which means navigation between different views or "pages" should not require full page reloads and you should not add/modify \`.html\` files in \`frontend\` folder. Failure to align with this requirement will result in a 50% penalty of the mark.

2. We strongly recommend you to use [\`nvm\`](https://github.com/nvm-sh/nvm) to manage node version, once you have \`nvm\` installed, you can run \`nvm use\` in this repo to switch to \`v20.17.0\`.

#### 1.3.1 Languages

- You must implement this assignment in React.js. You **cannot** use other declarative frameworks, such as Angular, or Vue.
- You must use React.js solutions wherever possible, and avoid doing any direct DOM manipulation unless completely unavoidable (check with course staff).
- You are strictly **NOT** allowed to use universal css for styling, this applies to any usage of \`.css\`, \`.scss\`, \`.sass\` or \`.less\` files to style your work. You should use css-in-js techniques such as [styled components](https://styled-components.com/) and [Tailwind CSS](https://tailwindcss.com/) etc.
- You can use any UI libraries that you would like, such as material-UI, Radix UI or any other library that you would like.
- Besides those described to avoid, you can install and use any package that is available on [npm](https://www.npmjs.com/). You **MUST** commit \`package.json\` changes.

#### 1.3.2 Browser Compatibility

- You should ensure that your web app has been tested on Google Chrome (various operating systems) - make sure it's latest version.

#### 1.3.3 Using code found online

- You may use small amounts of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should attribute **clearly** the source of this code in a comment with it. You can not otherwise use code written by another person.`;

export const ass4b = `

## 3. Deployment & Backend

### 3.0 Deployment

You need to deploy your web app to Vercel. Please follow the instructions in [\`deployment.md\`](deployment.md) to deploy both your frontend and backend.

### 3.1. The Frontend

Navigate to the \`frontend\` folder and run \`npm install\` in that folder to install the ReactJS app. Then run \`npm run dev\` to start the ReactJS app.

Don't forget to check out our helpful resources about [React.js](https://cgi.cse.unsw.edu.au/~cs6080/NOW/help/resources/reactjs).

### 3.2. The Backend (provided)

You are **PROHIBITED** from modifying the backend. No work needs to be done on the backend. It's provided to you simply to power your frontend.

The backend server exists in your individual repository. After you clone this repo, you must run \`npm install\` in \`backend\` directory once.

To run the backend server, simply run \`npm start\` in the \`backend\` directory. This will start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. \`http://localhost:5005\`). This will list all of the HTTP routes that you can interact with.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run \`npm run reset\` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy \`database.json\`. If you want to start with an empty database, you can run \`npm run clear\` in the backend directory.

You can also run \`npm run test\` in the backend directory to run the tests, the tests for \`store\` will give you ideas on how to structure your \`store\` object.

Once the backend has started, you can view the API documentation by navigating to \`http://localhost:[port]\` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in \`frontend/src/config.js\`. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.

Please note: You **CANNOT** modify the backend for bonus marks.

## 4. Assumptions

- The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
- Besides those described to avoid, you may use any other packages available on npm.

## 5. Teamwork

This assignment may be completed in a team of two (pair). However, you are also welcome to complete it on your own, if you choose. The groups were organised and coordinated by the course coordinator separately.

If you formed a pair, you will be unable to leave your pair unless under extreme circumstances. You will be assessed together for the assignment.

If your contributions to the assignment are not approximately equal, then the teaching staff may make discretionary calls based on your gitlab history to award different marks to each student.

**Please note: Your contributions will be measured based on the lines and commits contributed via gitlab. Please commit via your own machine or account.** If you're in a pair, your contributions will not be considered yours if it is your partner who pushes the code to gitlab.

**Please note: When special consideration is granted for one individual in a pair, it will only either 1) extend the deadline for the person who gets special consideration (it does not extend for the other individual); or 2) Result in a scale of the mark. To determine which outcome is appropriate, the person who receives special consideration is required to email the lecturer to notify them of how the work is split up prior to deadline.**

## 6. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

### 6.1. Functionality of the Feature Set (50%)
 * Features implemented that satisfy requirements as outlined in section 2.
 * You <b>MUST</b> update the <code>progress.csv</code> file in the root folder of this repository as you complete things partially or fully. The valid values are "NO", "PARTIAL", and "YES". Updating this is necessary so that your tutor knows what to focus on and what to avoid - giving them the best understanding of your work and provide you with marks you have earned. Failure to correctly fill in this file will result in a 5% penalty.

### 6.2. Responsiveness (15%)
 * Features implemented in a mobile responsive way that work on screens as small as 400px wide, 700px high
 * Responsive design will contribute up to one quarter of the marks of this section

### 6.3. UI/UX (10%)
 * Your application is usable and easy to navigate. No obvious usability issues or confusing layouts/flows.
 * Your application makes intelligent use of UI/UX principles and patterns discussed in the UI/UX lectures.
 * Describe any attempts you've made to improve the UI/UX in \`UIUX.md\`. This section will ONLY be marked on things described in that file.

### 6.4. Code Style (10%)
 * Your code is clean, well commented, with well-named variables, and well laid out as highlighted in the course style guide.
 * Code follows common ReactJS patterns that have been discussed in lectures and as highlighted in the course style guide.

### 6.5. Linted Code (5%)
 * Submitted code is completely \`eslint\` compliant based on provided eslint configuration file. There are no partial marks.

### 6.6. Testing (5%)
 * 60% of the marks(3/5) received from complying with requirements in the task in relation to **component testing**
 * 40% of the marks(2/5) received from complying with requirements in the task in relation to **ui testing**
 * Describe your approach to testing in \`TESTING.md\`. This section will ONLY be marked on things described in that file.

### 6.7. Accessibility (5%)
 * Your application follows standard accessibility lessons covered in lectures.
 * Describe any attempts you've made to improve the Accessibility in \`A11Y.md\`. This section will ONLY be marked on things described in that file.

### 6.8. Bonus Mark (5%)
 * Implementation of extra features that are not included in the spec.
 * Extra features should be non-trivial, have a clear justification for existing, and show either a form of technical, product, or creative flare.
 * Any extra features written down in \`BONUS.md\` in the project folder
 * Any bonus marks that extend your ass4 mark above 100% will bleed into other assignment marks, but cannot contribute outside of the 80% of the course that is allocated for assignment marks
 * <b>Expectations placed on solo groups will be half of that of pairs to achieve the same mark.</b>
 * If you are working individually and complete all features marked as 🙉🙉🙉 (and high quality) you can receive full marks for bonus marks.

## 7. Git Commit Requirements

It's imperative that we are able to track your progress when marking.

There are some requirements for us to track your ongoing progress:

1. You must make commits on at least 4 unique days prior to due date.
1. You must make at least 20 commits across the course of your assignment.
2. Your commits must be meaningful in description (e.g. "Continued work on loop speed")
3. Each commit include no more than 200 lines additions of code (this may differ in future assignments). You are given no exceptions.

Failure to adhere to these guidelines in their entirety may result in a penalty up to 50%. Any moderate or significant failure may result in a 0 grade.

Please note: If you choose to work on separate branches before merging into master, you must squash your commits when merging back in. This means that you can make many commits on other branches fine, it's just whatever comes back to master needs to be a single commit that compiles with no more than 200 line additions.

## 8. Originality of Work

The work you submit must be your own work. Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalised, even if the work was submitted without your
knowledge or consent. This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalised if your work has the potential to be taken without your consent or
knowledge.

**PLEASE NOTE: To ensure the originality of your work, we are requiring that you regularly commit your work to git throughout the weeks this assignment has been released. Regular and small commits (essentially at least once a day that you work on the assignment) are critical. Failures to commit regularly (or at minimum, failures to commit in small chunks) may results in either penalties of up to 20% of result in allegations of plagiarism.**

## 9. Submission

To submit your assignment, you must you've pushed all of your code to your gitlab master branch. You can check if you've done this properly by seeing what code is on the gitlab site on your master branch.

We will collect the latest work on your master branch of gitlab at the time of submission.

It is your responsibiltiy to ensure that your code can run successfully when cloned fresh from Gitlab.

### Dryrun

You can run a dryrun to sanity check your code runs basically by:

1. Pushing your code to master on gitlab
2. On a CSE terminal (vlab or lab machine), run \`6080 ass4dryrun presto GROUP_NAME\` where GROUP_NAME is the name of your group

## 10. Late Submission Policy

No late submission are accepted.
`;
