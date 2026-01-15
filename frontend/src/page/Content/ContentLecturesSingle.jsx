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
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import UndoIcon from '@mui/icons-material/Undo';
const buildRelatedLectures = (lecture, allLectures, term) => {
  const relatedLectures = [
    ...(lecture.lectures_prereq ? lecture.lectures_prereq() : []).map((l) => ({
      ...l,
      label: "Watch first",
      labelBackground: "rgba(254, 32, 32, 0.4)",
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
        labelBackground: 'rgba(87, 242, 26, 0.4)',
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
          {/* Divider */}
        <Box sx={{ pt: 2, mt: 8, borderTop: "1px solid", borderColor: "divider" }} />
        <Typography variant="h4">Related Lectures</Typography>
        <ContentCards minHeight={220} data={relatedLectures} />
        
      </>
    )}

    {relatedTutes.length > 0 && (
      <>
          {/* Divider */}
        <Box sx={{ pt: 2, mt: 8, borderTop: "1px solid", borderColor: "divider" }} />
        <Typography variant="h4">Now you're ready for these exercises</Typography>
        <ContentCards minHeight={220} data={relatedTutes} />
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

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      {/* add a button back to last page */}
      <Button
        variant="none"
        onClick={() => window.history.back()}
        sx={{ mt: 2 }}
        startIcon={<UndoIcon />}
      >
        Back
      </Button>
    </Box>
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
