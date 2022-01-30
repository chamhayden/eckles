import Button from '@mui/material/Button';
import config from '../../config';

import {
  isHalfScreenWidth,
  isTinyMobileWidth,
  isMobileWidth,
  isBigDesktopWidth,
  isDesktopWidth,
} from '../../util/screen';

export const generateContent = (getters, by) => {
  const opposingPageType = by === 'week' ? 'topic' : 'week';
  const secondColumnName = by === 'week' ? 'Topic' : 'Week';
  const boxName =
    by === 'week'
      ? (grouping) => `Week ${grouping.week}`
      : (grouping) => `${grouping.emoji} ${grouping.area().name}: ${grouping.name}`;
  const boxKey = by === 'week' ? (grouping) => grouping.week : (grouping) => grouping.name;
  const secondColumnValue =
    by === 'week'
      ? (tutorial) => (tutorial.topic ? `${tutorial.topic().emoji} ${tutorial.topic().name}` : '')
      : (tutorial) => `📅 ${tutorial.week().week === 11 ? 'Extra' : tutorial.week().week}`;
  const outerList =
    by === 'week'
      ? getters.content.weeks.filter((w) => w.week != 6 && w.week <= 10)
      : getters.content.topics.filter((t) => t.name !== 'Admin');
  const secondColumnAnchor =
    by === 'week' ? (tutorial) => tutorial.topic().name : (tutorial) => tutorial.week().week;

  const boxes = [];
  outerList.forEach((grouping) => {
    const table = [];
    if (grouping.content_tutorials) {
      grouping
        .content_tutorials()
        .sort((a, b) => a.order - b.order)
        .forEach((tutorial) => {
          table.push([
            {
              value: tutorial.key,
              link: `/${getters.term}/content/tutorials/${tutorial.key}`,
              buttonProps: {
                variant: 'contained',
                color: 'info',
                sx: { textTransform: 'unset !important' },
              },
            },
            {
              value: secondColumnValue(tutorial),
              link: `/${getters.term}/content/tutorials/${opposingPageType}#${secondColumnAnchor(tutorial)}`,
            },
            {
              value: tutorial.duration ? `⏱️ ${tutorial.duration} mins` : 'TBD',
            },
            { value: tutorial.stream.join(', ') },
            { value: tutorial.importance },
            {
              Raw: () => (
                <a
                  href={`${config.BASE_URL}/gitlabredir/${getters.term}/exercises/${tutorial.key}`}
                  target="_blank"
                >
                  <Button variant="contained" color="info">
                    Git
                  </Button>
                </a>
              ),
            },
          ]);
        });
    }
    boxes.push({
      title: boxName(grouping),
      key: boxKey(grouping),
      maxWidth: 1100,
      headers: [
        { name: 'Name', width: 32 },
        { name: secondColumnName, width: 15 },
        { name: 'Duration', width: 11, showFn: () => isDesktopWidth() },
        { name: 'Stream', width: 10, showFn: () => isBigDesktopWidth() },
        { name: 'Importance', width: 22, showFn: () => !isMobileWidth() },
        { name: 'Activity', width: 10 },
      ],
      table,
    });
  });
  return boxes;
};

/*const boxes = [];
  getters.content.topics.filter(t => t.name !== 'Admin').forEach(topic => {
    const table = [];
    if (topic.content_tutorials) {
      topic.content_tutorials().forEach(tutorial => {
        table.push([
          { value: tutorial.name, },
          { value: tutorial.week().week, },
          { value: tutorial.duration, },
          { value: tutorial.stream, },
          { value: tutorial.importance, },
        ]);
      });
    }
    boxes.push({
      title: `${topic.emoji} ${topic.name}`,
      headers: [
        { name: 'Day', },
        { name: 'Week', },
        { name: 'Duration', showFn: () => !isTinyMobileWidth() },
        { name: 'Stream', showFn: () => !isTinyMobileWidth() },
        { name: 'Staff', },
      ],
      table,
    });
  });


  const boxes = [];
  getters.content.weeks.filter(w => w.week <= 10 && w.week != 6).forEach(week => {
    const table = [];
    if (week.content_tutorials) {
      week.content_tutorials().forEach(tutorial => {
        table.push([
          { value: tutorial.name, },
          { value: tutorial.topic ? `${tutorial.topic().emoji} ${tutorial.topic().name}` : '', },
          { value: tutorial.duration, },
          { value: tutorial.stream, },
          { value: tutorial.importance, },
        ]);
      });
    }
    boxes.push({
      title: `Week ${week.week}`,
      headers: [
        { name: 'Day', },
        { name: 'Topic', },
        { name: 'Duration', showFn: () => !isTinyMobileWidth(), },
        { name: 'Stream', showFn: () => !isTinyMobileWidth(), },
        { name: 'Staff', },
      ],
      table,
    });
  });*/
