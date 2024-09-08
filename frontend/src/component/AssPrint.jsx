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
    return new Date() >= new Date(thisWeek.starts_on);
  }
  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{`# Assessment ${assNumber}`}</Markdown>
      <Markdown remarkPlugins={[remarkGfm]}>{mda}</Markdown>
      <Markdown remarkPlugins={[remarkGfm]}>{`## 2. The Task 🔥🔥`}</Markdown>
      {readyFromWeek(assNumber) ? 
        <a target="_blank" href={`${config.BASE_URL}/gitlabredir/${getters.term}/${`ass${assNumber}`}`}>Please see details about the task here.</a>
      :
        <><span style={{ color: 'red', fontWeight: 'bold'}}>Details of this task are not yet available. Please check back on Monday of week {startWeek}.</span></>
      }    
      <Markdown remarkPlugins={[remarkGfm]}>{mdb}</Markdown>
    </>
  );
};

export default AssPrint;