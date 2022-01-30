import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import makePage from '../../component/makePage';

const ResourcesHtmlCSS = ({}) => {
  return (
    <>

      <Typography variant="h5" component="div" gutterBottom>
        HTML/CSS
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li><a target="_blank" href="https://scrimba.com/course/ghtmlcss">Scrimba HTML and CSS</a>. A good overview of HTML and CSS (source: Unknown).</li>
          <li><a target="_blank" href="https://scrimba.com/course/glearnreact">Scrimba Learn React</a>. Another product out there helping you teach yourself how to build apps with ReactJS (source: Unknown).</li>
          <li>LinkedIn learning is available to UNSW students for free and has great courses involving ReactJS (source: Hayden Smith).</li>
        </ul>
      </Typography>

      <Divider sx={{ mb: 3, mt: 3, }} />

      <Typography variant="h5" component="div" gutterBottom>
        CSS
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li><a target="_blank" href="https://flukeout.github.io/">CSS Diner</a>. A fun game to learn CSS selector syntax. (source: Adrian Tan)</li>
          <li><a target="_blank" href="https://keyframes.app/">CSS Animations</a>. An interactive website to help form CSS Animations (source: Adrian Tan)</li>
          <li><a target="_blank" href="https://css-tricks.com/guides/">CSS Tricks</a>. A broad range of CSS explained (source: Adrian Tan)</li>
          <li>
            Flexbox
            <ul>
              <li><a target="_blank" href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">CSS Tricks Guide to Flexbox</a>. An incredibly detailed yet concise guide to using flexbox. A great reference.</li>
              <li><a target="_blank" href="http://www.flexboxdefense.com/">Flexbox Defense</a>. A great game that helps reinforce the behaviour of flexbox (source: Unknown).</li>
              <li><a target="_blank" href="https://flexboxfroggy.com/">Flexbox Froggy</a>. A great game that helps reinforce the behaviour of flexbox (source: Unknown).</li>
            </ul>
          </li>
        </ul>
      </Typography>

      <Divider sx={{ mb: 3, mt: 3, }} />

      <Typography variant="h5" component="div" gutterBottom>
        Miscellaneous
      </Typography>
      <Typography variant="body1" gutterBottom>
        <ul>
          <li><a target="_blank" href="https://caniuse.com/?search=background-color">CanIUse.com</a>. Figure out what features are supported in what browser (source: Unknown)</li>
          <li><a target="_blank" href="https://stackoverflow.com/questions/47862144/how-to-compare-v8-javascript-engine-version-between-chrome-and-nodejs-in-termina">V8 engines</a>. Figure out what version of V8 you're using (source: Unknown)</li>
          <li><a target="_blank" href="https://www.myfonts.com/WhatTheFont/">Image font detection</a>. Figuring out what fonts are in an image. Explanation (source: Unknown)</li>
          <li><a target="_blank" href="https://imageoptim.com/mac">Image Optim</a>. Improve the performance of websites by compressing images (source: Adrian Tan)</li>
          <li><a target="_blank" href="http://www.uigoodies.com/">UI Goodies</a>. A collection of resources across the web for UI elements (source: Adrian Tan)</li>
          <li><a target="_blank" href="https://fontawesome.com/">Font Awesome</a>. A collection of SVG icons made for websites (source: Adrian Tan)</li>
          <li><a target="_blank" href="https://developer.mozilla.org/en-US/">MDN Web Docs</a>. Go-to for a lot of empirical questions about web development (source: Adrian Tan)</li>
        </ul>
      </Typography>
       
    </>
  );
};

export default makePage(ResourcesHtmlCSS, {
  loginRequired: true,
  title: 'HTML/CSS Resources',
});