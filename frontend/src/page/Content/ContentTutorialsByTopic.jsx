import React from 'react';

import makePage from '../../component/makePage';
import SetOfTables from '../../component/SetOfTables';
import { Context, useContext } from '../../context';
import { isTinyMobileWidth } from '../../util/screen';
import { generateContent } from './ContentTutorials.content';

const ContentTutorialsByTopic = ({ }) => {
  const { getters } = useContext(Context);
  const boxes = generateContent(getters, 'topic');
  return <SetOfTables boxes={boxes} />;
};

export default makePage(ContentTutorialsByTopic, {
  loginRequired: true,
  title: 'Tutorial Content (By Topic)',
});