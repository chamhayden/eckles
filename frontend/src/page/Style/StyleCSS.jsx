import React from 'react';

import makePage from '../../component/makePage';


import { Body, H3, H5, HR, Example } from '../../component/StyleComponents';


const StyleCSS = ({}) => {
  const emoji = '🎨';

  return (
    <>
      <H3>{emoji} 2. CSS Style Guide</H3>

      <Body>The assignments in COMP6080 all have a portion of their marks allocated to code style. As such, it is <b>highly</b> recommended for students to have a read through this style guide.</Body>

      <Body>
        Below is our style guide for COMP6080 for writing good CSS. <b>For anything not mentioned here, refer to the <a href="https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/CSS" target="_blank" rel="noreferrer">MDN style guide for CSS</a>.</b>
      </Body>
      <Body>
        Please also note that you should refer to the marking criteria too that's attached with each Assignment.
      </Body>

      <Body>
        <ul>
          <li><a href="#css-casing">2.1. Casing & Quotation</a></li>
          <li><a href="#css-indentation">2.2. Indentation</a></li>
          <li><a href="#css-avoid-repetition">2.3. Avoid Repetition</a></li>
          <li><a href="#css-colors">2.4. CSS Colors</a></li>
          <li><a href="#css-universal-selectors">2.5. Universal Selectors</a></li>
          <li><a href="#css-external-spreadsheet">2.6. Use External Spreadsheets</a></li>
          <li><a href="#css-names">2.7. Class/ID naming convention</a></li>
          <li><a href="#css-important-spam">2.8. Overuse of !important</a></li>
          <li><a href="#css-negative-margins">2.9. Avoid negative margins</a></li>
          <li><a href="#css-empty-rulesets">2.10. Remove empty rulesets</a></li>
          <li><a href="#css-commented-code">2.11. Remove blocks of commented out code</a></li>
        </ul>
      </Body>

      <HR />

      <H5 id="css-casing">{emoji} 2.1. Casing & Quotation</H5>

      <Body>You should stick to kebab-casing when creating Classes/IDs and other things like keyframes. We won't be strict about this however - as long as you're <b>consistent</b>.</Body>

      <Example
        lang="css"
        bads={[
`.LinearRotation {
  animation: rotateAnimation 1s linear infinite;
}

.publicTitle {
  background-color: rgb(50,205,50);
  text-transform: capitalize;
  font-family: "Arial", sans-serif;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`
        ]}
        goods={[
`.linear-rotation {
  animation: rotate-animation 1s linear infinite;
}

.public-title {
  background-color: rgb(50,205,50);
  text-transform: capitalize;
  font-family: "Arial", sans-serif;
}

@keyframes rotate-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`
        ]}
      />

      <Body>You may use either single (') or double (") quotations as long as you're <b>consistent</b> with which you choose. Using double quotation in CSS is more commonly seen in the industry.</Body>

      <HR />

      <H5 id="css-indentation">{emoji} 2.2. Indentation</H5>

      <Body>As long as you're <b>consistent</b>, you may use 2-space or 4-space indentation in CSS files. We increase the indentation level everytime we use an opening brace <code>{'{'}</code> and decrease it when we use a closing brace <code>{'}'}</code>. We also go to a new line with each semicolon <code>;</code>.</Body>

      <Example lang="css"
        bads={[
`.square-card { width: 500px; height: 500px;
  border: 2px dashed black;
        background-color: white;
transition: background-color 0.3s ease;
}

.square-card:hover { background-color: rgba(255, 255, 255, 0.5); }`
        ]}
        goods={[
`.square-card {
  width: 500px;
  height: 500px;
  border: 2px dashed black;
  background-color: white;
  transition: background-color 0.3s ease;
}

.square-card:hover {
  background-color: rgba(255, 255, 255, 0.5);
}`
        ]}
      />

      <HR />

      <H5 id="css-avoid-repetition">{emoji} 2.3. Avoid Repetition</H5>

      <Body>Like coding languages, you should try and follow the DRY principle here - Don't Repeat Yourself. If two classes are very similar, then you should break it up into smaller pieces.</Body>

      <Example
        lang="css"
        bads={[
`/* in styles.css */
.green-card-with-border {
  background-color: green;
  border: 2px solid black;
  width: 50px;
  height: 50px;
}
.green-card-without-border {
  background-color: green;
  width: 50px;
  height: 50px;
}
.green-card-with-thick-border {
  background-color: green;
  border: 10px solid black;
  width: 50px;
  height: 50px;
}
.red-card-with-border {
  background-color: red;
  border: 2px solid black;
  width: 50px;
  height: 50px;
}
.red-card-without-border {
  background-color: red;
  width: 50px;
  height: 50px;
}
.red-card-with-thick-border {
  background-color: red;
  border: 10px solid black;
  width: 50px;
  height: 50px;
}

/* in index.html */
<div class="green-card-without-border" ></div>
<div class="green-card-with-border" ></div>
<div class="green-card-with-thick-border" ></div>
<div class="red-card-without-border" ></div>
<div class="red-card-with-border" ></div>
<div class="red-card-with-thick-border" ></div>`
        ]}
        goods={[
`/* in styles.css */
.card {
  width: 50px;
  height: 50px;
}
.red-bg {
  background-color: red;
}
.green-bg {
  background-color: green;
}
.thin-border {
  border: 2px solid black;
}
.thick-border {
  border: 10px solid black;
}

/* in index.html */
<div class="card green-bg"></div>
<div class="card green-bg thin-border"></div>
<div class="card green-bg thick-border"></div>
<div class="card red-bg"></div>
<div class="card red-bg thin-border"></div>
<div class="card red-bg thick-border"></div>`
        ]}
      />

      <Body>You may also take advantage of child selectors for simpler code.</Body>

      <Example
        lang="css"
        bads={[
`/* in styles.css */
css
.purple-column {
  background-color: purple;
  height: 100vh;
  width: 10px;
}
.black-column {
  background-color: black;
  height: 100vh;
  width: 10px;
}

/* in index.html */
<div class="purple-column" />
<div class="black-column" />
<div class="purple-column" />
<div class="black-column" />`
        ]}
        goods={[
`/* in style.css */
.column {
  background-color: purple;
  height: 100vh;
  width: 10px;
}
.column:nth-child(even) {
  background-color: black;
}

/* in index.html */
<div class="column" />
<div class="column" />
<div class="column" />
<div class="column" />`
        ]}
      />

      <HR />

      <H5 id="css-colors">{emoji} 2.4. CSS Colors</H5>

      <Body>You may use any method when picking/defining CSS colors.</Body>

      <Example
        lang="css"
        goods={[
`.example-a {
  background-color: rgb(153,183,201);
}
.example-b {
  background-color: hsl(203 30.8% 69.4%);
}
.example-c {
  background-color: #99B7C9;
}
/* etc. etc... */`
        ]}
      />

      <HR />

      <H5 id="css-universal-selectors">{emoji} 2.5. Universal Selectors</H5>

      <Body>Avoid the <code>*</code> selector to prevent unintended side effects, such as unintentionally overriding the margin property of an element that you want a different margin set.</Body>
      <Body>However, an exception will be made if they are solely used to modify the default settings for <code>box-sizing</code>, <code>margin</code> or <code>padding</code>.</Body>

      <Example
        lang="css"
        bads={[
`* {
  background-color: red;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* Any style etc. */
}`
        ]}
        goods={[
`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`
        ]}
      />

      <HR />

      <H5 id="css-external-spreadsheet">{emoji} 2.6. Use External Spreadsheet</H5>

      <Body>Keep all CSS separate from the HTML file. This is for the following reasons:
        <ul>
          <li><b>Separation of Concerns</b>: Mixing CSS and HTML together makes it harder to maintain and update the code.</li>
          <li><b>Code Reusability</b>: Can reuse the same CSS file across multiple web pages.</li>
          <li><b>Prevents Cascading issues</b>: Inline styles take priority over external stylesheets and other CSS rules. This means as your codebase grows, it becomes more difficult to understand the styling hierarchy of your element.</li>
        </ul>
      </Body>

      <Body>Do not be afraid to create multiple stylesheets to keep things more organised.</Body>

      <Example
        lang="css"
        bads={[
`<button style="color:white;background-color:blue;text-transform:capitalize;width:50px;height:50px;">Lorem Ipsum</button>
<button style="color:white;background-color:blue;text-transform:capitalize;width:50px;height:50px;">Muspi Merol</button>
<button style="color:white;background-color:blue;text-transform:capitalize;width:50px;height:50px;">This is a card</button>`,
`/* in <head> */
<style>
  .primary-btn {
    background-color: blue;
    color: white;
    text-transform: capitalize;
    width: 50px;
    height: 50px;
  }
</style>

/* in <body> */
<button class="primary-btn">Lorem Ipsum</button>
<button class="primary-btn">Muspi Merol</button>
<button class="primary-btn">This is a card</button>`
        ]}
        goods={[
`/* in style.css */
.primary-btn {
  background-color: blue;
  color: white;
  text-transform: capitalize;
  width: 50px;
  height: 50px;
}

/* in index.html in <head> */
<!-- In Head -->
<link rel="stylesheet" href="styles.css">

/* in index.html in <body> */
<button class="primary-btn">Lorem Ipsum</button>
<button class="primary-btn">Muspi Merol</button>
<button class="primary-btn">This is a card</button>`
        ]}
      />

      <HR />

      <H5 id="css-names">{emoji} 2.7. Class/ID naming conventions</H5>

      <Body>Make sure your Classes/IDs have meaningful names that describes what styles it has or what it's used for. It will make your code more accessible to your group mate. Also in the event of forgetting what a Class/ID is for, the name will remind you.</Body>

      <Example
        lang="css"
        bads={[
`.img-a {
  border-radius: 50%
}
.img-b {
  filter: grayscale(100%);
}
.bg-1 {
  background-color: salmon;
}
.bg-2 {
  background-color: forestgreen;
}
.zbsd {
  display: grid;
  place-items: center;
}`
        ]}
        goods={[
`.round-img {
  border-radius: 50%;
}
.grayscale-img {
  filter: grayscale(100%);
}
.red-bg {
  background-color: salmon;
}
.green-bg {
  background-color: forestgreen;
}
.container {
  display: grid;
  place-items: center;
}`
        ]}
      />


      <HR />
      <H5 id="css-important-spam">{emoji} 2.8. Overuse of !important</H5>
      <Body>Using <code>!important</code> in CSS should be avoided or used sparingly as last resort because it can cause the following problems:</Body>
      <ul>
        <li><b>Limited flexibility</b>: It will be harder to change styles of elements easily in the future as you'll need to figure out that the style you're trying to change is being overridden by an <code>!important</code> and then subsequently you need to hunt down that specific <code>!important</code>.</li>
        <li><b>Specificity Confusion</b>: <code>!important</code> overrides the natural cascading behaviour of Cascading Stylesheets (CSS), which can lead to confusion in understanding what styles are being applied to your elements.</li>
      </ul>
      
      <Example
        lang="css"
        bads={[
          `.card {
  background-color: #bbdabb !important;
  color: black !important;
  width: 200px !important;
  height: 200px !important;
  border-radius: 15px !important;
}

/* new-card won't have an effect if both of these classes are applied */
.new-card {
  background-color: #f7d02d;
  color: white;
}
`
        ]}
        goods={[
          `.card {
  background-color: #bbdabb;
  color: black;
  width: 200px;
  height: 200px;
  border-radius: 15px;
}

.new-card {
  background-color: #f7d02d;
  color: white;
}
`
        ]}
      />

      <HR />
      <H5 id="css-negative-margins">{emoji} 2.9. Avoid negative margins</H5>
      <Body>Overusing negative margins makes it difficult to debug, maintain or understand your CSS. Instead, if you want elements to overlap, you can use other methods like relative positioning.</Body>
      <Example
        lang="html"
        bads={[
          `<!-- in style.css -->
.offset {
  margin-top: -10px;
}

<!-- in index.html -->
<div>
  <p class="offset">Hello world!</p>
</div>`
        ]}
        goods={[
          `<!-- in style.css -->
.offset {
  position: relative;
  top: -10px;
}

<!-- in index.html -->
<div>
  <p class="offset">Hello world!</p>
</div>`
        ]}
      />
      <Body>If you're trying to get elements closer, remove the margins that are in the way. For example, it's better to get rid of the margin on the body rather than setting negative margins to the children to close the gap.</Body>
      <Example
        lang="html"
        bads={[
          `<!-- in style.css -->
.container {
  margin-top: -8px;
  margin-left: -8px;

  background-color: salmon;
}

<!-- in index.html -->
<body>
  <div class="container">Hello world!</div>
</body>`
        ]}
        goods={[
          `<!-- in style.css -->
body {
  margin: 0;
}

.container {
  background-color: salmon;
}

<!-- in index.html -->
<body>
  <div class="container">Hello world!</div>
</body>`
        ]}
      />

      <HR />
      <H5 id="css-empty-rulesets">{emoji} 2.10. Remove empty rulesets</H5>
      <Body>You should not have any empty rulesets in your CSS files. They don't do anything.</Body>
      <Example
        lang="css"
        bads={[
          `/* Remove these */
.card {

}
div {
  
}
`
        ]}
      />
      <HR />
      <H5 id="css-commented-code">{emoji} 2.11. Remove blocks of commented out code</H5>
      <Body>While it may be useful during debugging, having a bunch of commented out code around will make your code less readable.</Body>
      
      <Example
        lang="css"
        bads={[
          `.logo-text {
  /*
  width: 200px;
  height: 100px;
  word-spacing: 10px;
  rotate: -30deg;
  */

  font-family: Poppins;
}
`
        ]}
        goods={[
          `.logo-text {
  font-family: Poppins;
}
`
        ]}
      />
    </>
  );
};

export default makePage(StyleCSS, {
  loginRequired: true,
  title: 'CSS Style',
});