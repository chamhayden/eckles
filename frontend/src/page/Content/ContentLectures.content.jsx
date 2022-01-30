import Button from '@mui/material/Button';

import { isHalfScreenWidth, isTinyMobileWidth } from '../../util/screen';

export const generateContent = (getters, by) => {
  const opposingPageType = (by === 'week') ? 'topic' : 'week';
  const secondColumnName = (by === 'week') ? 'Topic' : 'Week';
  const boxName = (by === 'week')
    ? grouping => grouping.week === 11 ? 'Extra Content' : `Week ${grouping.week}`
    : grouping => `${grouping.emoji} ${grouping.area().name}: ${grouping.name}`;
  const boxKey = (by === 'week')
    ? grouping => grouping.week
    : grouping => grouping.name;
  const secondColumnValue = (by === 'week')
    ? lecture => lecture.topic ? `${lecture.topic().emoji} ${lecture.topic().name}` : ''
    : lecture => `📅 ${lecture.week().week === 11 ? 'Extra' : lecture.week().week}`;
  const outerList = (by === 'week')
    ? getters.content.weeks.filter(w => w.week != 6)
    : getters.content.topics.filter(t => t.name !== 'Admin');
  const secondColumnAnchor = (by === 'week')
    ? lecture => lecture.topic().name
    : lecture => lecture.week().week;

  const boxes = [];
  outerList.forEach(grouping => {
    const table = [];
    if (grouping.content_lectures) {
      grouping.content_lectures().sort((a, b) => a.order - b.order).forEach(lecture => {
        if (lecture) {
          table.push([
            { value: lecture.name, link: `/${getters.term}/content/lectures/${lecture.key}`, buttonProps: { variant: 'contained', color: 'info', sx: { textTransform: 'unset !important' } }, },
            { value: secondColumnValue(lecture), link: `/${getters.term}/content/lectures/${opposingPageType}#${secondColumnAnchor(lecture)}` },
            { value: lecture.duration_mins ? `⏱️ ${lecture.duration_mins} mins` : 'TBD', },
            { Raw: () => {
                if (lecture.visible === true) {
                  return <a href={`/raw/lectures/${lecture.key}.pdf`} target="_blank"><Button variant="outlined" color="warning">PDF</Button></a>;
                } else {
                  return <Button onClick={() => alert('Lecture is coming soon! Check back later')} variant="outlined" color="warning">PDF</Button>;
                }
              }
            }
          ]);
        }
      });
    }
    boxes.push({
      title: boxName(grouping),
      key: boxKey(grouping),
      maxWidth: 800,
      headers: [
        { name: 'Name', width: 40, },
        { name: secondColumnName, width: 20, },
        { name: 'Duration', width: 20, showFn: () => !isHalfScreenWidth(), },
        { name: 'Links', width: 20, showFn: () => !isTinyMobileWidth(), },
      ],
      table,
    });
  });
  return boxes;
};