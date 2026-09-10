// Matches a numbered markdown heading, e.g. "### 5. Marking Criteria",
// "#### 5.1a. Compliance", or "##### 1.3.0 IMPORTANT setup".
const NUMBERED_HEADING = /^(#{2,6})\s+(\d+)(\.\S*)?\s+(.*)$/;

// A heading is a top level section when it carries no sub-numbering (e.g. "3."
// rather than "3.1." or "1.3.0").
const isTopLevel = (match) => !match[3] || match[3] === '.';

/**
 * Removes whole top level sections (heading and body) from an assignment spec.
 * Titles are matched exactly, so 'Submission' will not take out
 * 'Late Submission Policy'.
 */
export const omitSections = (md, titles) => {
  if (!titles || titles.length === 0) {
    return md;
  }
  let skipping = false;
  return md
    .split('\n')
    .filter((line) => {
      const match = line.match(NUMBERED_HEADING);
      if (match && isTopLevel(match)) {
        skipping = titles.includes(match[4].trim());
      }
      return !skipping;
    })
    .join('\n');
};

/**
 * The number a new top level section would take if appended to this markdown.
 */
export const nextSectionNumber = (md) => {
  let last = 0;
  md.split('\n').forEach((line) => {
    const match = line.match(NUMBERED_HEADING);
    if (match && isTopLevel(match)) {
      last = parseInt(match[2], 10);
    }
  });
  return last + 1;
};

/**
 * Renumbers top level sections sequentially from startNumber, closing the gaps
 * left by omitSections. Sub-headings keep their own numbering and are simply
 * re-pointed at their (possibly renumbered) parent section.
 *
 * Returns the rewritten markdown along with the number the next chunk of the
 * spec should continue from.
 */
export const renumberSections = (md, startNumber) => {
  let current = startNumber - 1;
  const renumbered = md.split('\n').map((line) => {
    const match = line.match(NUMBERED_HEADING);
    if (!match) {
      return line;
    }
    const [, hashes, , subNumbering, title] = match;
    if (isTopLevel(match)) {
      current += 1;
      return `${hashes} ${current}. ${title}`;
    }
    return `${hashes} ${current}${subNumbering} ${title}`;
  });
  return { md: renumbered.join('\n'), nextNumber: current + 1 };
};
