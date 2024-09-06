import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TutLecContentCard from '../../component/TutLecContentCard';
import SetOfTables from '../../component/SetOfTables';
import { Context, useContext } from '../../context';
import { isTinyMobileWidth } from '../../util/screen';
import YoutubePlaylistButton from '../../component/YoutubePlaylistButton';
import makePage from '../../component/makePage';
import { generateContent } from './ContentLectures.content';

const ContentLecturesByTopic = ({ }) => {
  const { getters } = useContext(Context);
  const boxes = generateContent(getters, 'topic');
  return (
    <>
      <TutLecContentCard/>
      <YoutubePlaylistButton />
      <SetOfTables boxes={boxes} />
    </>
  );
};


export default makePage(ContentLecturesByTopic, {
  loginRequired: true,
  title: 'Lecture Content (by topic)',
});