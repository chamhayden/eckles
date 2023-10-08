import React from 'react';

import makePage from '../../component/makePage';

import { Body, H3, H5, HR, Code, Example } from '../../component/StyleComponents';


const StyleJavascript = ({}) => {
  return (
    <>

      <H3>🔧 3. JavaScript</H3>

      <Body>The assignments in COMP6080 all have a portion of their marks allocated to code style. As such, it is <b>highly</b> recommended for students to have a read through this style guide.</Body>
      
      <Body>
        Below is our style guide for COMP6080 for writing good JavaScript. <b>For anything not mentioned here, refer to the <a href="https://www.w3schools.com/js/js_conventions.asp" target="_blank" rel="noreferrer">W3 schools style guide</a>.</b>
      </Body>
      <Body>
        Please also note that you should refer to the marking criteria too that's attached with each Assignment.
      </Body>

      <Body>
        <ul>
          <li><a href="#js-casing">3.1. Casing & Quotation</a></li>
          <li><a href="#js-indentation">3.2. Indentation</a></li>
          <li><a href="#js-comments">3.3. Comments</a></li>
          <li><a href="#js-modularisation">3.4. Modularisation</a></li>
          <li><a href="#js-external-files">3.5. Use External Files</a></li>
          <li><a href="#js-text-to-dom">3.6. Avoid converting Text to DOM Nodes (innerHTML, outerHTML, DOMParser etc.)</a></li>
          <li><a href="#js-arrow-functions">3.7. Arrow functions over Regular functions</a></li>
          <li><a href="#js-names">3.8. Variable naming convention</a></li>
          <li><a href="#js-variable-declaration">3.9. Variable declaration</a></li>
          <li><a href="#js-strict-equality">3.10. Strict Equality</a></li>
          <li><a href="#js-semicolons">3.11. Semicolons</a></li>
          <li><a href="#js-whitespace">3.12. Whitespace</a></li>
        </ul>
      </Body>

      <HR />

      <H5 id="js-casing">🔧 3.1. Casing & Quotation</H5>

      <Body>You may use camelCase, snake_case etc. As long as you are <b>consistent</b>. camelCase is what most JavaScript developers use. Do not use PascalCase, as that is normally reserved for React components.</Body>

      <Example
        lang="javascript"
        bads={[
`const random_number_generator = (minInt, maxInt) => {
  // Swap values if min is greater than max
  if (minInt > maxInt) {
    [minInt, maxInt] = [maxInt, minInt];
  }

  // Calculate the range of possible values
  const Range = maxInt - minInt + 1;

  // Generate a random number within the range
  return Math.floor(Math.random() * Range) + minInt;
}`
        ]}
        goods={[
`const randomNumberGenerator = (minInt, maxInt) => {
  // Swap values if min is greater than max
  if (minInt > maxInt) {
    [minInt, maxInt] = [maxInt, minInt];
  }

  // Calculate the range of possible values
  const range = maxInt - minInt + 1;

  // Generate a random number within the range
  return Math.floor(Math.random() * range) + minInt;
}`
        ]}
      />

      <Body>You may use either single (') or double (") quotations as long as you're <b>consistent</b> with which you choose.</Body>

      <HR />

      <H5 id="js-indentation">🔧 3.2. Indentation</H5>

      <Body>As long as you're <b>consistent</b>, you may use 2-space or 4-space indentation in JavaScript files. We recommend 2-space. Generally, we increase the indentation level everytime we use an opening brace <code>{'{'}</code> and decrease it when we use a closing brace <code>{'}'}</code>.</Body>

      <Example
        lang="javascript"
        bads={[
`const foo = () => {
const dude = {
age: 20
};
dude.age++;
}`
        ]}
        goods={[
`const foo = () => {
  const dude = {
    age: 20
  };

  dude.age++;
}`
        ]}
      />

      <HR />

      <H5 id="js-comments">🔧 3.3. Comments</H5>

      <Body>Include comments to explain the purpose, functionality, and important details of your code. Comments help you and others understand your code easily, which is especially important in the pair assignments.</Body>

      <Example
        lang="javascript"
        bads={[
`const groupArrayElements = (array, length) => {
  const groupArray = [];
  
  while (array.length > 0) {
    groupArray.push(array.splice(0, length));
  }

  return groupArray;
}`
        ]}
        goods={[
`/**
 * A function that groups items in an array into sub-arrays that have a maximum of size items.
 * i.e., [1, 2, 3, 4, 5] with size = 2 will return [[1, 2], [3, 4], [5]]
 */
const groupArrayElements = (array, size) => {
  const groupArray = [];
  
  // Loop until all elements in the array have been grouped up
  while (array.length > 0) {
    // Extract an array of length "size" and push it into the splitArray
    groupArray.push(array.splice(0, length)); 
  }

  return groupArray;
}`
        ]}
      />

      <Body>Note that the above example does not need to be followed verbatim.</Body>

      <HR />

      <H5 id="js-modularisation">🔧 3.4. Modularisation</H5>

      <Body>If you have a function that is becoming very bloated and has multiple levels of indentation, chances are that it is not modular enough. Break down your code into smaller, modular functions to promote reusability, DRY principle and makes code maintenance more manageable.</Body>

      <Body>In the below example, it is better to extract the <code>fetch</code> into separate module named appropriately named <code>api.js</code> or another appropriate name of your choosing. This module would be dedicated to handling API requests. The <code>sendReq</code> function then encapsulates the logic for making a fetch request, handling the response, and returning the parsed JSON data. This way, the logic of making API calls can be reused again and again without needing to write <code>fetch</code> and all the other logic multiple times.</Body>

      <Example
        lang="javascript"
        bads={[
`const onLeftClick = () => {
  const input = document.getElementById('input-field').value;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  fetch('http://localhost:3000/database', {
    method: 'PUT',
    headers,
    body: JSON.stringify(input),
  })
  .then((res) => {
    // etc...
  })
  .then((res) => {
    const btnElement = document.createElement('button');
    // etc...
  })
  .catch((err) => {
    // etc...
  });
}

const onRightClick = () => {
  // Need to setup the fetch again since it's not modularised, a.k.a more repeating yourself
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  fetch('http://localhost:3000/database', {
    method: 'DEL',
    headers,
    body: JSON.stringify(1),
  })
  .then((res) => {
    // etc...
  })
  .then((res) => {
    const btnElement = document.getElementById('confirm-btn');
    // etc...
  })
  .catch((err) => {
    // etc...
  });
}`
        ]}
        goods={[
`// In another javascript file.
const URL = 'http://localhost:3000/database';
export { URL };

// In another javascript file - This module handles the common configuration and execution of the fetch requests
const sendReq = (url, method, body) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  })
  .then((res) => {
    // etc... Include logic that needs to be done on all fetch requests
  })
  .catch((err) => {
    // etc...
  });
}

export { sendReq };

// In another javascript file - We can now reuse the same code for our fetch requests
const onLeftClick = () => {
  const input = document.getElementById('input-field').value;

  sendReq(URL, 'PUT', input)
  .then((res) => {
    const btnElement = document.createElement('button');
    // etc...
  });
}

const onRightClick = () => {
  sendReq(URL, 'DEL', 1)
  .then((res) => {
    const btnElement = document.getElementById('confirm-btn');
    // etc...
  });
}`
        ]}
      />

      <Body>Note that you do not need to follow the above verbatim - it is just an example of how you can modularise your code.</Body>

      <HR />

      <H5 id="js-external-files">🔧 3.5. Use External Files</H5>

      <Body>You should not be writing JavaScript in a html file. This is to keep your code modularised and prevent your html file from being extraordinarily large.</Body>

      <Example
        lang="html"
        bads={[
`<head>
  <title>Internal JavaScript Example (Bad)</title>
</head>
<body>    
  <button onclick="changeText()">Click me</button>
  
  <p id="text">Initial text</p>
  
  <script>
    const changeText = () => {
      const paragraph = document.getElementById('text');
      paragraph.textContent = 'Updated text';
    }
  </script>
</body>`
        ]}
        goods={[
`<!-- In script.js -->
const changeText = () => {
  const paragraph = document.getElementById('text');
  paragraph.textContent = 'Updated text';
}

document.getElementById('main-btn').addEventListener('click', changeText);

<!-- In index.html -->
<head>
  <title>External JavaScript Example (Good)</title>
</head>
<body>    
  <button id="main-btn">Click me</button>

  <p id="text">Initial text</p>

  <!--It is better to link scripts at the bottom so that the code will only run when the rest of the page has been loaded-->
  <script src="script.js"></script>
</body>`
        ]}
      />


      <HR />

      <H5 id="js-text-to-dom">🔧 3.6. Avoid converting Text to DOM Nodes (innerHTML, outerHTML, DOMParser etc.)</H5>

      <Body>Do not use methods that convert text to DOM nodes (such as <code>innerHTML</code>, <code>outerHTML</code>, <code>DOMParser</code> etc.). <a target="_blank" href="https://www.dhairyashah.dev/posts/why-innerhtml-is-a-bad-idea-and-how-to-avoid-it/">(Please see this blog post as to why these methods are highly discouraged)</a>.</Body>

      <Example
        lang="html"
        bads={[
`// Getting reference for container from the DOM
const container = document.getElementById('container');

// Changing the entire HTML inside the container (DON'T DO THIS)
container.innerHTML = '<button>Click me!</button>';`
        ]}
        goods={[
`// Getting reference for container from the DOM
const container = document.getElementById('container');

// Create a button element
const buttonElement = document.createElement('button');
buttonElement.textContent = 'Click me!';

// Append the button to the container element
container.appendChild(buttonElement);`
        ]}
      />


      <HR />

      <H5 id="js-arrow-functions">🔧 3.7. Arrow functions over Regular functions</H5>

      <Body>From week 8 and onwards, you should use <code>{'a = () => {}'}</code> function definitions over <code>function a() {}</code> in all instances. This is mainly because modern online sample code uses arrow functions instead and also looks much neater and less verbose as seen in the below examples.</Body>

      <Example
        lang="javascript"
        bads={[
`// The function passed into reduce is anonymous as it does not have a name.
// While it still works, it looks very verbose as it needs the return statement and the function keyword.
function calcAvg(arr) {
  if (arr.length === 0) return 0;

  return arr.reduce(function (accumulator, currVal) {
    return accumulator + currVal
  }, 0) / arr.length;
}`
        ]}
        goods={[
`// Using arrow functions eliminates the function keyword and the return functions through implicit return
const calcAvg = (arr) => {
  if (arr.length === 0) return 0;

  return arr.reduce((accumulator, currVal) => (accumulator + currVal), 0) / arr.length;
}`
        ]}
      />

      <Body>As a side note, there is a subtle difference between the two. Regular functions has a dynamic <code>this</code> whereas Arrow functions has a lexical <code>this</code>. This distinction falls outside the scope of this course, and you should not need to worry about it in the assignments. (In other words, stick to Arrow Functions for this course).</Body>

      <Body>If you wish, you may read more about it <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="noreferrer">here</a>.</Body>

      <HR />

      <H5 id="js-names">🔧 3.8. Variable naming convention</H5>

      <Body>All variables and function names should be named appropriately. The name should be meaningful enough that it is "self-documenting" (i.e., explains what it is used for).</Body>

      <Example
        lang="javascript"
        bads={[
`let a = true;
let b = 0;`
        ]}
        goods={[
`let hasUserClicked = true;
let clickCounter = 0;`
        ]}
      />

      <HR />

      <H5 id="js-variable-declaration">🔧 3.9. Variable declaration</H5>

      <Body>Never use <code>var</code> - stick to either <code>let</code> or <code>const</code>. In most cases, <code>const</code> is enough for what you need to do in JavaScript/React web development.</Body>

      <Body><code>var</code> does not have block scoping, meaning that it is accessible outside of the block in which they are declared. This can lead to variable leakage, making it difficult to encapsulate and isolate variables within specific code blocks.</Body>

      <Body><code>let</code> does have block scoping, however may lead to accidental modification of data that should be unchanged.</Body>

      <Body><code>const</code> has block scoping and prevents accidental modification.</Body>

      <Example
        lang="javascript"
        bads={[
`var fooFunction = () => {
  var loopAmount = 10;

  for (var i = 0; i < loopAmount; i++) {
    console.log(i);
  }
}`
        ]}
        goods={[
`const fooFunction = () => {
  const loopAmount = 10;

  for (let i = 0; i < loopAmount; i++) {
    console.log(i);
  }
}`
        ]}
      />

      <H5 id="js-strict-equality">🔧 3.10. Strict Equality</H5>

      <Body>Stick to using <code>===</code> (strict equality) over <code>==</code> (loose/abstract equality) in almost all instances.</Body>

      <Body>When using <code>==</code>, you are checking for equality after any type conversions. This may introduce unintended behaviour in your code. Meanwhile, using <code>===</code> will not do any type conversions, making it the safer comparator.</Body>

      <Example
        lang="javascript"
        bads={[
  `console.log(0 == false);  // Will print true, which might not be what you need
console.log(1 == '1');    // true
console.log(0 == '');     // true
console.log(42 == [42]);  // true`
        ]}
        goods={[
  `console.log(0 === false); // Will print false, which is correct since 0 and false are not the same.
console.log(1 === '1');   // false
console.log(0 === '');    // false
console.log(42 === [42]); // false`
        ]}
      />

      <Body>In some narrow cases, <code>==</code> may be more appropriate. For example, if you want to check if a value is undefined or null (maybe throw an error if the variable is unusable), a loose equality would be better.</Body>

      <Example
        lang="javascript"
        bads={[
  `const foo = null;
console.log(foo === null)      // Prints true
console.log(foo === undefined) // Prints false`
        ]}
        goods={[
  `const foo = null;
console.log(foo == null)       // Prints true
console.log(foo == undefined)  // Prints true`
        ]}
      />

      <HR />

      <H5 id="js-semicolons">🔧 3.11. Semicolons</H5>

      <Body>While JavaScript does not need <code>;</code> at the end of each simple statement, it is still considered the batter practice to include them for code clarity. This guideline won't be enforced strictly.</Body>

      <Example
        lang="javascript"
        bads={[
`const foo = 42

const fooObj = {
  age: 22,
  name: 'foo'
}`
        ]}
        goods={[
`const foo = 42;

const fooObj = {
  age: 22,
  name: 'foo'
}`
        ]}
      />

      <HR />

      <H5 id="js-whitespace">🔧 3.12. Whitespace</H5>

      <Body>Using whitespace effectively will improve your code's readability, which is especially important when working in a team. This means leaving space around operators, after commas, and between logical sections of code.</Body>

      <Example
        lang="javascript"
        bads={[
`const foo =(x,y,z)=>{
  let bar=0;
  bar+=x+y+z;
}`
        ]}
        goods={[
`const foo = (x, y, z) => {
  let bar = 0;

  bar += x + y + z;
}`
        ]}
      />
    </>
  );
};

export default makePage(StyleJavascript, {
  loginRequired: true,
  title: 'HTML Style',
});