import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ContentCards from "../../component/ContentCards";
import makePage from "../../component/makePage";
import { Context, useContext } from "../../context";
import { getYoutubeCodeFromUrl } from "../../util/content";
import SectionHeader from "../../component/SectionHeader";
import { apiCall } from "../../util/api";
import LectureInfoPanel from "./component/LectureInfoPanel";
import LectureRating from "./component/LectureRating";
import LectureVideo from "./component/LectureVideo";

const buildRelatedLectures = (lecture, allLectures, term) => {
  const relatedLectures = [
    ...(lecture.lectures_prereq ? lecture.lectures_prereq() : []).map((l) => ({
      ...l,
      label: "Watch first",
      labelBackground: "rgb(248,139,139)",
    })),
    ...allLectures
      .filter(
        (l) =>
          l.lectures_prereq &&
          l
            .lectures_prereq()
            .map((lp) => lp.key)
            .includes(lecture.key)
      )
      .map((l) => ({
        ...l,
        label: "Up Next",
        labelBackground: "rgb(175,239,148)",
      })),
  ];

  return relatedLectures.map((lec) => ({
    title: lec.name,
    linkUrl: `/${term}/content/lectures/${lec.key}`,
    imageUrl: `https://img.youtube.com/vi/${
      lec.video ? getYoutubeCodeFromUrl(lec.video) : ""
    }/hqdefault.jpg`,
    description: lec.description,
    staff: lec
      .staff()
      .map((s) => s.name)
      .join(", "),
    weektopic: `${
      lec.week().week === 11 ? "Extra" : "Week " + lec.week().week
    } ${lec.topic().emoji} - ${lec.topic().name}`,
    duration: lec.duration_mins,
    label: lec.label,
    labelBackground: lec.labelBackground,
  }));
};

const buildRelatedTutes = (lecture, term) => {
  if (!lecture.content_tutorials) {
    return [];
  }

  return lecture.content_tutorials().map((tutorial) => ({
    title: tutorial.key,
    description: tutorial.name,
    linkUrl: `/${term}/content/tutorials/${tutorial.key}`,
  }));
};

const RelatedContent = ({ relatedLectures, relatedTutes }) => (
  <>
    {relatedLectures.length > 0 && (
      <>
        <SectionHeader>Related Lectures</SectionHeader>
        <ContentCards minHeight={330} data={relatedLectures} />
      </>
    )}

    {relatedTutes.length > 0 && (
      <>
        <SectionHeader>Now you're ready for these exercises</SectionHeader>
        <ContentCards minHeight={250} data={relatedTutes} />
      </>
    )}
  </>
);

const ContentLecturesSingle = ({}) => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [lecture, setLecture] = React.useState(null);
  const [relatedLectures, setRelatedLectures] = React.useState([]);
  const [relatedTutes, setRelatedTutes] = React.useState([]);
  const [savedRating, setSavedRating] = React.useState(0);
  const [savedRatingComments, setSavedRatingComments] = React.useState("");
  const params = useParams();

  React.useEffect(() => {
    if (params.lecid) {
      apiCall(`${getters.term}/rating/${params.lecid}`, {}, "GET").then(
        (data) => {
          console.log(data);
          setSavedRating(data.rating ?? 0);
          setSavedRatingComments(data.comment ?? "");
        }
      );
    }
  }, [params.lecid]);

  React.useEffect(() => {
    const candidates = getters.content.content_lectures.filter(
      (c) => c.key === params.lecid
    );
    if (candidates.length === 1) {
      setLecture(candidates[0]);
    }
  }, [params.lecid]);

  React.useEffect(() => {
    if (lecture !== null) {
      setters.setTitle(`Lecture: ${lecture.name}`);
      setRelatedLectures(
        buildRelatedLectures(
          lecture,
          getters.content.content_lectures,
          getters.term
        )
      );
      setRelatedTutes(buildRelatedTutes(lecture, getters.term));
    }
  }, [lecture]);

  if (!lecture) {
    return <></>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: "3 1 0%", minWidth: 0 }}>
          <LectureVideo lecture={lecture} />
          <LectureRating
            term={getters.term}
            lectureId={params.lecid}
            initialRating={savedRating}
            initialComment={savedRatingComments}
          />
      
        </Box>
        <Box sx={{ flex: "2 1 0%", minWidth: 0}}>
          <LectureInfoPanel lecture={lecture} term={getters.term} />
        </Box>
      </Box>
      <RelatedContent
        relatedLectures={relatedLectures}
        relatedTutes={relatedTutes}
      />
    </>
  );
};

export default makePage(ContentLecturesSingle, {
  loginRequired: true,
  title: "",
});
