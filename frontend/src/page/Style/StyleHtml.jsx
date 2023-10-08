import React from 'react';

import makePage from '../../component/makePage';


import { Body, H3, H5, HR, Code, Example, ExampleImages } from '../../component/StyleComponents';
import MoodleImg from '../../asset/style/moodle-bg-example.png';
import ArtImg from '../../asset/style/art-bg-example.png';
import GuardianImg from '../../asset/style/guardian-img-example.png';
import EcklesImg from '../../asset/style/eckles-img-example.png';


const StyleHtml = ({}) => {
  return (
    <>

      <H3>📜 1. HTML Style Guide</H3>

      <Body>The assignments in COMP6080 all have a portion of their marks allocated to code style. As such, it is <b>highly</b> recommended for students to have a read through this style guide.</Body>
      <Body>
        Below is our style guide for COMP6080 for writing good HTML. <b>For anything not mentioned here, refer to the <a href="https://www.w3schools.com/html/html5_syntax.asp" target="_blank" rel="noreferrer">W3 schools style guide</a>.</b>
      </Body>

      <Body>
        <ul>
          <li><a href="#html-casing">1.1. Casing & Quotation</a></li>
          <li><a href="#html-indentation">1.2. Indentation</a></li>
          <li><a href="#html-repetition">1.3. Repetition</a></li>
          <li><a href="#html-structure">1.4. General HTML structure</a></li>
          <li><a href="#html-semantic">1.5. Use Appropriate Semantic Tags</a></li>
          <li><a href="#html-style">1.6. The Style Attribute</a></li>
          <li><a href="#html-script-tag">1.7. The Script Tag</a></li>
          <li><a href="#html-img">1.8. Image Attributes</a></li>
          <li><a href="#html-img-vs-bg-img">1.9. img tag VS. background-image</a></li>
          <li><a href="#html-ids">1.10. Unique IDs</a></li>
        </ul>
      </Body>

      <HR />

      <H5 id="html-casing">📜 1.1. Casing & Quotation </H5>
      <Body>Unless specified otherwise, all tags and its attributes should be written in lowercase. The attribute values should always be in quotation marks, as well as no spaces between the equal sign and the value.</Body>

      <Example
        lang="html"
        bads={[
`<BUTTON Title = "Go to Google">
  Click me!
</BUTTON>`
        ]}
        goods={[
`<button title="Go to Google">
  Click me!
</button>`
        ]}
      />
      <Body>You may use either single (') or double (") quotations as long as you're <b>consistent</b> with which you choose. Using double quotation in HTML is more commonly seen in the industry.</Body>

      <HR />

      <H5 id="html-indentation">📜 1.2. Indentation</H5>
      <Body>As long as you are <b>consistent</b>, you can use 2 or 4 space indentation. However, as there will be many levels of indentation, you should indent with <b>2 spaces</b> in HTML as opposed to the usual 4 spaces.</Body>
      <Body>Each HTML tag should be indented <b>with respect to its parent tag</b>, with the opening and closing tag being on the same level of indentation (unless it is on the same line).</Body>

      <Example
        lang="html"
        bads={[
`<div><p>Hello
</p></div>`
        ]}
        goods={[
`<div>
  <p>Hello</p>
</div>`
        ]}
      />

      <Example
        lang="html"
        bads={[
`<table><thead>
<tr>
<th>Student</th>
<th>ID</th>
</tr>
</thead>
<tbody>
<tr>
  <td>John Doe</td>
  <td>z5555555</td>
</tr>
<tr>
  <td>Gordon Wang</td>
  <td>z5309206</td>
</tr>
</tbody></table>`
        ]}
        goods={[
`<table>
  <thead>
  <tr>
    <th>Student</th>
    <th>ID</th>
  </tr> <!-- The closing tag is on the same indentation level as its respective opening tag -->
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>z5555555</td>
    </tr>
    <tr>
      <td>Gordon Wang</td>
      <td>z5309206</td>
    </tr>
  </tbody>
</table>`
        ]}
      />

      <Body>There are some exceptions to this, especially when the child is small enough such that it is still reasonably readable. For example:</Body>

      <Example
        lang="html"
        goods={[
`<p>This is <b>also</b> good</p>`
        ]}
      />

      <HR />

      <H5 id="html-repetition">📜 1.3. Repetition</H5>

      <Body>Some repetitions are okay when writing HTML for the first assignment. For example, this is okay:</Body>

      <Code lang="html">
{`<div class="card">
  <h1>This is the first card</h1>
</div>
<div class="card">
  <h1>This is the second card</h1>
</div>
<div class="card">
  <h1>This is the third card</h1>
</div>`}
      </Code>

      <Body>In future assignments in the course when you are introduced to better methodologies, you should not repeat your code (See the [JavaScript Modularisation](#js-modularisation) and [ReactJS Modularisation](#jsx-modularisation) section).</Body>

      <HR />

      <H5 id="html-structure">📜 1.4. General HTML Structure </H5>

      <Body>All HTML files should not be missing the following starting code</Body>
      <Code lang="html">
{`<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body></body>
</html>`}
      </Code>
      <Body>This is so the file is better structured (body for the website content, head for meta data etc.)</Body>

      <Body><b>Hint:</b> On VSCode, you should be able to type in <code>!</code> and hit enter in <code>.html</code> files to quickly generate the above boilerplate tags.</Body>

      <Example
        lang="html"
        goods={[
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <!-- Include external spreadsheet or other CSS modules linking here -->
  <!-- <link rel="stylesheet" href="styles.css"> -->

  <!-- Include javascript linking either here or at the very bottom in the body -->
  <!-- <script src="script.js"></script> -->
</head>
<body>
  
  <!-- Include javascript linking either here or in the head tag -->
  <!-- <script src="script.js"></script> -->
</body>
</html>`
        ]}
        medium
      />

      <HR />

      <H5 id="html-semantic">📜 1.5. Use Appropriate Semantic Tags</H5>
      <Body>When deciding on which tag to use to contain your page elements, you should use the appropriate tag whenever you can. Not only will this provide clearer structural meaning to your page, but it will make your file less complicated and give screen readers an easier time.</Body>
      <Body>Reserve <code>div</code> tags for grouping related page elements or for styling purposes.</Body>

      <Example
        lang="html"
        bads={[
`<div>Welcome to my page!</div>
<div>This is a paragraph</div>`
        ]}
        goods={[
`<h1>Welcome to my page!</h1>
<p>This is a paragraph</p>`
        ]}
      />

      <Example
        lang="html"
        bads={[
`<div class="...">
  <div>Shopping List:</div>
  <div class="...">
    <div>• Milk</div>
    <div>• Apple</div>
    <div>• Eggs</div>
  </div>
</div>`
        ]}
        goods={[
`<div class="...">
  <h3>Shopping List:</h3>
  <ul>
    <li>Milk</li>
    <li>Apple</li>
    <li>Eggs</li>
  </ul>
</div>`
        ]}
      />

      <HR />

      <H5 id="html-style">📜 1.6. The Style Attribute</H5>
      <Body>You should always try and avoid inline/internal styling and keep all CSS styles in a separate <code>.css</code> file - <b>stick to external styling</b>. See below under the [CSS section](#css-external-spreadsheet) for reasons why.</Body>

      <Example
        lang="html"
        bads={[
`<button style="color:white;background-color:salmon;text-align:center;">Google</button>
<button style="color:white;background-color:salmon;text-align:center;">Microsoft</button>
<button style="color:white;background-color:salmon;text-align:center;">Apple</button>`,
`<!-- In Head -->
<style>
.external-btn {
  background-color: salmon;
  color: white;
  text-align: center;
}

</style>
<!-- In Body-->
<button class="external-btn">Google</button>
<button class="external-btn">Microsoft</button>
<button class="external-btn">Apple</button>`
        ]}
        goods={[
`<!-- in style.css -->
.external-btn {
  background-color: salmon;
  color: white;
  text-align: center;
}

<!-- in index.html -->
<button class="external-btn">Google</button>
<button class="external-btn">Microsoft</button>
<button class="external-btn">Apple</button>`
        ]}
        medium
      />

      <HR />

      <H5 id="html-script-tag">📜 1.7. The Script Tag</H5>

      <Body>Likewise to the previous guideline, you should not be writing internal JavaScript code - keep them separate. This is to keep your code modularised and prevent your html file from being extraordinarily large.</Body>

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
      const paragraph = document.getElementById("text");
      paragraph.textContent = "Updated text";
    }
  </script>
</body>`
        ]}
        goods={[
`<!-- in script.js -->
const changeText = () => {
  const paragraph = document.getElementById('text');
  paragraph.textContent = 'Updated text';
}

document.getElementById('main-btn').addEventListener('click', changeText);

<!-- in index.html -->
<head>
  <title>External JavaScript Example (Good)</title>
  <script src="script.js"></script>
</head>
<body>    
  <button id="main-btn">Click me</button>

  <p id="text">Initial text</p>
</body>`
        ]}
        medium
      />

      <HR />

      <H5 id="html-img">📜 1.8. Image Attributes</H5>

      <Body>All images should have alt attributes for accessibility/screen readers, search engine optimization and in case the image does not load properly.</Body>

      <Example
        lang="html"
        goods={[
`<img src="https://picsum.photos/200" alt="Team of people discussing" />`
        ]}
        medium
      />

      <HR />

      <H5 id="html-img-vs-bg-img">📜 1.9. img tag VS. background-image</H5>

      <Body><b>Do not mix up the <code>img</code> tag and <code>background-image</code>.</b></Body>

      <Code lang="html" medium>
{`<!-- Using the image tag -->
<img src="https://picsum.photos/200" alt="A knight slaying a moth" />`}
      </Code>

      <Code lang="html" medium>
{`.img {
  /* Using background-image css property */
  background-image: url('https://picsum.photos/200');
}`}
      </Code>

      <Body>While you can interchange <code>{'<img/>'}</code> with another tag styled with <code>background-image</code>, there's a clear distinction between the two.</Body>

      <Body> <code>background-image</code> as the name implies is for setting an image in the <b>background</b> (i.e., there could be text or other elements obscuring the image). These are normally reserved for decoration and making the website visually appealing.</Body>

      <Body>On the other hand, a <code>{'<img/>'}</code> tag is for setting an image in the <b>foreground</b> and is used for salient images (i.e., nothing is obscuring it and is part of the website flow/layout). These are used for displaying content that is to be consumed by users.</Body>

      <Body>Getting these mixed up will impact:
        <ul>
          <li>Accessibility - Screen readers can not detect background images and background images do not have alt text.</li>
          <li>Search Engine Optimisation - Search Engines use <code>alt</code> tags to detect images and display it in searches.</li>
          <li>Interactions - Users can not interact with background images (i.e., copy or download the image).</li>
        </ul>
      </Body>

      <ExampleImages
        title="Examples of when to use the image tag"
        srcArray={[
          { src: EcklesImg, caption: 'Logos like the top left image on Eckles is part of the website layout and thus should use <img />.'},
          { src: GuardianImg, caption: 'Images that are unobscured and is meant to be viewed/consumed by the user should use <img />.'},
        ]}
      />

      <ExampleImages
        title="Examples of when to use the background-image style property"
        srcArray={[
          { src: MoodleImg, caption: 'UNSW Moodle uses a image of the campus in the background and is not part of the website layout. As such, it uses background-image.'},
          { src: ArtImg, caption: 'Images that have other elements obscuring it should use background-image.'},
        ]}
      />

      <HR />

      <H5 id="html-ids">📜 1.10. Unique IDs</H5>
      <Body>Do not use the same ID on multiple HTML tags. IDs are meant to be unique identifiers and by using it on multiple tags, the behaviour would be undefined and is up to the browser you are using.</Body>
      <Example
        lang="html"
        bads={[
          `<h1 id="title">Korok Map</h1>
<h1 id="title">Shrine Map</h1>`
        ]}
        goods={[
          `<h1 class="title">Korok Map</h1>
<h1 class="title">Shrine Map</h1>`,
          `<h1 id="forest-title">Korok Map</h1>
<h1 id="shrine-title">Shrine Map</h1>`
        ]}
      />
    </>
  );
};

export default makePage(StyleHtml, {
  loginRequired: true,
  title: 'HTML Style',
});