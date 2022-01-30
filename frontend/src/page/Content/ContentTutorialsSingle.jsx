import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';

import makePage from '../../component/makePage';
import { Context, useContext } from '../../context';
import { getYoutubeCodeFromUrl } from '../../util/content';
import RelatedTutorials from './component/RelatedTutorials';
import TutorialInfoPanel from './component/TutorialInfoPanel';
import TutorialVideoPanel from './component/TutorialVideoPanel';

const buildRelatedTutorials = (tutorial, allTutorials, term) => {
  if (!tutorial || !allTutorials) {
    return [];
  }

  const topicName = tutorial.topic ? tutorial.topic().name : null;
  const weekNumber = tutorial.week ? tutorial.week().week : null;

  const sameTopic = topicName
    ? allTutorials.filter((t) => t.key !== tutorial.key && t.topic && t.topic().name === topicName)
    : [];
  const sameWeek = weekNumber
    ? allTutorials.filter((t) => t.key !== tutorial.key && t.week && t.week().week === weekNumber)
    : [];

  const related = [...sameTopic, ...sameWeek].filter(
    (item, index, all) => all.findIndex((candidate) => candidate.key === item.key) === index
  );

  const relatedWithVideo = related.filter((item) => item.video_url);
  const list = relatedWithVideo.slice(0, 6);

  return list.map((item) => {
    const topic = item.topic ? item.topic() : null;
    const week = item.week ? item.week().week : null;
    const weekLabel =
      week === null || week === undefined ? '' : week === 11 ? 'Extra' : `Week ${week}`;
    const weekTopic =
      weekLabel && topic
        ? `${weekLabel} ${topic.emoji} - ${topic.name}`
        : topic
          ? `${topic.emoji} - ${topic.name}`
          : weekLabel;

    return {
      title: item.key,
      linkUrl: `/~cs6080/${term}/content/tutorials/${item.key}`,
      imageUrl: item.video_url
        ? `https://img.youtube.com/vi/${getYoutubeCodeFromUrl(item.video_url)}/hqdefault.jpg`
        : undefined,
      description: item.name,
      duration: item.duration,
      weektopic: weekTopic || undefined,
    };
  });
};

const ContentTutorialsSingle = () => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [tutorial, setTutorial] = React.useState(null);
  const [relatedTutorials, setRelatedTutorials] = React.useState([]);
  const params = useParams();

  React.useEffect(() => {
    const candidates = getters.content.content_tutorials.filter((c) => c.key === params.tutid);
    if (candidates.length === 1) {
      setTutorial(candidates[0]);
    }
  }, [params.tutid]);

  React.useEffect(() => {
    if (tutorial !== null) {
      setters.setTitle(`Tutorial: ${tutorial.key}`);
      setRelatedTutorials(
        buildRelatedTutorials(tutorial, getters.content.content_tutorials, getters.term)
      );
    }
  }, [tutorial]);

  if (!tutorial) {
    return <></>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button variant="none" onClick={() => navigate(-1)} sx={{ mt: 2 }} startIcon={<UndoIcon />}>
          Back
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: '3 1 0%', minWidth: 0 }}>
          <TutorialVideoPanel tutorial={tutorial} />
        </Box>
        <Box sx={{ flex: '2 1 0%', minWidth: 0 }}>
          <TutorialInfoPanel tutorial={tutorial} term={getters.term} />
        </Box>
      </Box>
      <RelatedTutorials relatedTutorials={relatedTutorials} />
    </>
  );
};

export default makePage(ContentTutorialsSingle, {
  loginRequired: true,
  title: '',
});
