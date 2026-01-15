import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Rating } from "react-simple-star-rating";
import ContentCards from "../../component/ContentCards";
import makePage from "../../component/makePage";
import { Context, useContext } from "../../context";
import Youtube from "../../component/Youtube";
import { getYoutubeCodeFromUrl } from "../../util/content";
import SectionHeader from "../../component/SectionHeader";
import { apiCall } from "../../util/api";

const RATING_DISABLED_TERMS = new Set([
  "22T1",
  "22T3",
  "23T1",
  "23T3",
  "24T1",
  "24T3",
  "25T1",
]);

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

const LectureHeader = ({ lecture, term }) => (
  <SectionHeader>
    {lecture.topic().emoji} <b>{lecture.name}</b> &nbsp; (part of{" "}
    <Link to={`/${term}/content/lectures/topic#${lecture.topic().name}`}>
      {lecture.topic().name}
    </Link>{" "}
    in {lecture.topic().area().name})
  </SectionHeader>
);

const LectureMeta = ({ lecture, term }) => {
  const authorNames = lecture
    .staff()
    .map((s) => s.name)
    .join(", ");

  return (
    <Box sx={{ ml: 1 }}>
      <Typography variant="body1" gutterBottom>
        Duration: {lecture.duration_mins} minutes ⏱️
      </Typography>
      <Typography variant="body1" gutterBottom>
        Author(s): {authorNames}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {lecture.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <a
          target="_blank"
          rel="noreferrer"
          href={`/~cs6080/raw/lectures/${lecture.key}/`}
        >
          Access the code used in the lecture here (may be blank).
        </a>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Should watch no later than end of{" "}
        <Link to={`/${term}/content/lectures/week#${lecture.week().week}`}>
          week {lecture.week().week}
        </Link>
      </Typography>
      {lecture.schedule_lectures && (
        <Typography variant="body1" gutterBottom>
          {lecture.schedule_lectures().map((r, index) => (
            <React.Fragment
              key={`${lecture.key}-${r.week().week}-${r.day}-${r.time}`}
            >
              {index > 0 && <br />}
              This lecture is a live lecture. Join the lecture{" "}
              <a target="_blank" rel="noreferrer" href={r.call_url_h}>
                here
              </a>{" "}
              at {r.time} {r.day} in week {r.week().week}
            </React.Fragment>
          ))}
        </Typography>
      )}
    </Box>
  );
};

const LectureSlides = ({ lecture }) => {
  if (lecture.pdf_url === "null") {
    return <>There are no slides for this lecture</>;
  }

  if (!lecture.visible) {
    return (
      <Button
        onClick={() => alert("Lecture is coming soon! Check back later")}
        variant="outlined"
        color="warning"
      >
        View/Download PDF
      </Button>
    );
  }

  return (
    <a
      href={
        lecture.pdf_url === undefined
          ? `/~cs6080/raw/lectures/${lecture.key}.pdf`
          : lecture.pdf_url
      }
      target="_blank"
      rel="noreferrer"
    >
      <Button variant="outlined" color="warning">
        View/Download PDF
      </Button>
    </a>
  );
};

const LectureRating = ({
  term,
  rating,
  ratingComments,
  onRating,
  onRatingCommentsChange,
}) => {
  if (RATING_DISABLED_TERMS.has(term)) {
    return null;
  }

  return (
    <>
      <h2>Please rate after watching!</h2>
      <Rating onClick={onRating} initialValue={rating} />
      &nbsp;&nbsp;
      <input
        value={ratingComments}
        onChange={onRatingCommentsChange}
        placeholder="Any comments? This will auto-save"
        style={{ height: "20px", width: "300px" }}
      />
    </>
  );
};

const LectureVideo = ({ lecture }) => (
  <Accordion
    sx={{
      marginTop: "35px !important",
      marginLeft: "auto !important",
      marginRight: "auto !important",
      minWidth: 100,
      background: "rgb(0,0,0)",
    }}
    expanded={true}
  >
    <AccordionDetails>
      {lecture.video && lecture.visible ? (
        <Youtube code={lecture.video} />
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "100px 20px",
            fontSize: "2em",
            color: "#fff",
          }}
        >
          Check back later!
        </div>
      )}
    </AccordionDetails>
  </Accordion>
);

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
  const [rating, setRating] = React.useState(0);
  const [ratingComments, setRatingComments] = React.useState('');
  const params = useParams();

  React.useEffect(() => {
    if (params.lecid) {
      apiCall(`${getters.term}/rating/${params.lecid}`, {}, "GET").then(
        (data) => {
          console.log(data);
          setRating(data.rating);
          setRatingComments(data.comment);
        }
      );
    }
  }, [params.lecid]);

  // This is the API call to set the rating
  // apiCall(`${getters.term}/rating`, { lectureslug: params.lecid, rating: rating, comment: ratingComments, }, 'POST').then();

  const handleRatingComments = (e) => {
    setRatingComments(e.target.value);
  }

  const handleRating = (rate) => {
    setRating(rate);
  }

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
      <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <br />
      <LectureHeader lecture={lecture} term={getters.term} />
      <LectureMeta lecture={lecture} term={getters.term} />
      <LectureSlides lecture={lecture} />
      <LectureRating
        term={getters.term}
        rating={rating}
        ratingComments={ratingComments}
        onRating={handleRating}
        onRatingCommentsChange={handleRatingComments}
      />
      <LectureVideo lecture={lecture} />
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
