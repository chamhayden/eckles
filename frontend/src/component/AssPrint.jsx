import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Context, useContext } from '../context';
import { omitSections, renumberSections } from '../util/markdown';
import config from '../config';

const AssPrint = ({ mda, mdb, assNumber, startWeek, omit, alwaysReleased }) => {
  const { getters } = useContext(Context);
  const readyFromWeek = (week) => {
    const weeks = getters.content?.weeks ?? [];
    const thisWeek = weeks.filter((w) => parseInt(w.week, 10) === week)[0];

    // A term that hasn't had its weeks filled in yet has nothing to compare
    // against, so treat the task as not released rather than blowing up.
    if (!thisWeek || !thisWeek.starts_on) {
      return false;
    }

    let readyDate = new Date(thisWeek.starts_on);
    readyDate = new Date(readyDate.getTime() + readyDate.getTimezoneOffset() * 60000);

    return new Date() >= readyDate;
  };

  // Only rewrite the spec when a term actually drops sections from it, so that
  // past terms render exactly as they always have.
  let topMd = mda;
  let bottomMd = mdb;
  let taskNumber = 2;
  if (omit && omit.length > 0) {
    const top = renumberSections(omitSections(mda, omit), 1);
    topMd = top.md;
    taskNumber = top.nextNumber;
    bottomMd = renumberSections(omitSections(mdb, omit), taskNumber + 1).md;
  }

  return (
    <>
      <h2 style={{ marginTop: '0' }}>{`Assignment ${assNumber}`}</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{topMd}</Markdown>
      <Markdown remarkPlugins={[remarkGfm]}>{`### ${taskNumber}. The Task 🔥🔥`}</Markdown>
      {alwaysReleased || readyFromWeek(assNumber) ? (
        <>
          <a
            target="_blank"
            href={`${config.BASE_URL}/gitlabredir/${getters.term}/${`ass${assNumber}`}`}
          >
            Please see details about the task here.
          </a>
          <marquee>
            The reluctant use of a generally-advised-against &lt;marquee&gt; HTML tag is being used
            here just to get your attention so you know to click this link above.
          </marquee>
        </>
      ) : (
        <>
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            Details of this task are not yet available. Please check back on Monday of week{' '}
            {startWeek}.
          </span>
        </>
      )}
      <Markdown remarkPlugins={[remarkGfm]}>{bottomMd}</Markdown>
      <marquee>
        Another surprise &lt;marquee&gt; just to remind you that you're a cool cucumber 🥒{' '}
      </marquee>
    </>
  );
};

export default AssPrint;
