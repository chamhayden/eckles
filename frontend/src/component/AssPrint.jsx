import React from 'react';
import { Outlet } from 'react-router-dom';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Context, useContext } from '../context';
import config from '../config';

const AssPrint = ({ mda, mdb, assNumber, startWeek }) => {
  const { getters } = useContext(Context);
  const readyFromWeek = (week) => {
    const thisWeek = getters.content.weeks.filter(w => w.week === week)[0];

    let readyDate = new Date(thisWeek.starts_on)
    readyDate = new Date(readyDate.getTime() + readyDate.getTimezoneOffset() * 60000);

    return new Date() >= readyDate;
  }
  return (
    <>
      <h2 style={{ marginTop: '0' }}>{`Assignment ${assNumber}`}</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{mda}</Markdown>
      <Markdown remarkPlugins={[remarkGfm]}>{`### 2. The Task 🔥🔥`}</Markdown>
      {readyFromWeek(assNumber) ? 
        <>
          <a target="_blank" href={`${config.BASE_URL}/gitlabredir/${getters.term}/${`ass${assNumber}`}`}>Please see details about the task here.</a>
          <marquee>The reluctant use of a generally-advised-against &lt;marquee&gt; HTML tag is being used here just to get your attention so you know to click this link above.</marquee>
        </>
      :
        <><span style={{ color: 'red', fontWeight: 'bold'}}>Details of this task are not yet available. Please check back on Monday of week {startWeek}.</span></>
      }    
      <Markdown remarkPlugins={[remarkGfm]}>{mdb}</Markdown>
      <marquee>Another surprise &lt;marquee&gt; just to remind you that you're a cool cucumber 🥒 </marquee>
    </>
  );
};

export default AssPrint;