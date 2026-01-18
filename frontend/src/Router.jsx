import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Staff from './page/Staff';
import Site from './page/Site';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import TimetableBase from './page/Timetable/TimetableBase';
import TimetableLectures from './page/Timetable/TimetableLectures';
import TimetableTutorials from './page/Timetable/TimetableTutorials';
import TimetableHelpSessions from './page/Timetable/TimetableHelpSessions';
import CourseOutline from './page/CourseOutline';
import ContentBase from './page/Content/ContentBase';
import AssessmentsBase from './page/Assessments/AssessmentsBase';
import ContentLecturesSingle from './page/Content/ContentLecturesSingle';
import ContentLecturesSearch from './page/Content/ContentLecturesSearch';
import ContentTutorialsSingle from './page/Content/ContentTutorialsSingle';
import ContentTutorialsSearch from './page/Content/ContentTutorialsSearch';
import AssessmentsAssignments from './page/Assessments/AssessmentsAssignments';
import AssessmentsExam from './page/Assessments/AssessmentsExam';
import StyleBase from './page/Style/StyleBase';
import StyleHtml from './page/Style/StyleHtml';
import StyleCSS from './page/Style/StyleCSS';
import StyleJavascript from './page/Style/StyleJavascript';
import StyleReactJS from './page/Style/StyleReact';
import HelpBase from './page/Help/HelpBase';
import HelpStyle from './page/Help/HelpStyle';
import HelpInstallation from './page/Help/HelpInstallation';
import HelpResources from './page/Help/HelpResources';
import HelpResourcesPostgrad from './page/Help/HelpResourcesPostgrad';
import HelpResourcesNetwork from './page/Help/HelpResourcesNetwork';
import HelpResourcesHtmlCss from './page/Help/HelpResourcesHtmlCss';
import HelpResourcesJavascript from './page/Help/HelpResourcesJavascript';
import HelpResourcesCypress from './page/Help/HelpResourcesCypress';
import DueDateAdjustments from './page/DueDateAdjustments';
import HelpResourcesReact from './page/Help/HelpResourcesReact';
import CourseRoadmapDemo from './page/CourseRoadmapDemo';
import Grades from './page/Grades';

import { apiCall } from './util/api';
import { Context, useContext } from './context';

const Router = () => {
  const { getters, setters } = useContext(Context);
  React.useEffect(() => {
    apiCall('validterms', {}, 'GET').then((terms) => {
      setters.setValidTerms(terms);
    });
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Site />} />
      <Route path="/:term" element={<Site />}>
        <Route index element={<Dashboard />} />
        <Route path="timetable" element={<TimetableBase />}>
          <Route path="lectures" element={<TimetableLectures />} />
          <Route path="tutorials" element={<TimetableTutorials />} />
          <Route path="help-sessions" element={<TimetableHelpSessions />} />
        </Route>
        <Route path="content" element={<ContentBase />}>
          <Route path="lectures" element={<ContentBase />}>
            <Route path="search" element={<ContentLecturesSearch />} />
            <Route path=":lecid" element={<ContentLecturesSingle />} />
          </Route>
          <Route path="tutorials" element={<ContentBase />}>
            <Route path="search" element={<ContentTutorialsSearch />} />
            <Route path=":tutid" element={<ContentTutorialsSingle />} />
          </Route>
        </Route>
        <Route path="assessments" element={<AssessmentsBase />}>
          <Route path="assignments" element={<AssessmentsAssignments />}>
            <Route path=":ass" element={<AssessmentsAssignments />} />
          </Route>
          <Route path="exam" element={<AssessmentsExam />} />
        </Route>
        <Route path="help" element={<HelpBase />}>
          <Route path="style" element={<HelpStyle />} />
          <Route path="installation" element={<HelpInstallation />} />
          <Route path="resources" element={<HelpResources />}>
            <Route path="postgrad" element={<HelpResourcesPostgrad />} />
            <Route path="network" element={<HelpResourcesNetwork />} />
            <Route path="htmlcss" element={<HelpResourcesHtmlCss />} />
            <Route path="javascript" element={<HelpResourcesJavascript />} />
            <Route path="cypress" element={<HelpResourcesCypress />} />
            <Route path="reactjs" element={<HelpResourcesReact />} />
          </Route>
        </Route>
        <Route path="style" element={<StyleBase />}>
          <Route path="html" element={<StyleHtml />} />
          <Route path="css" element={<StyleCSS />} />
          <Route path="javascript" element={<StyleJavascript />} />
          <Route path="reactjs" element={<StyleReactJS />} />
        </Route>
        <Route path="course-outline" element={<CourseOutline />}></Route>
        <Route path="due-date-adjustments" element={<DueDateAdjustments />}></Route>
        <Route path="grades" element={<Grades />} />
        <Route path="course-roadmap-demo" element={<CourseRoadmapDemo />}></Route>
        <Route path="staff" element={<Staff />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
