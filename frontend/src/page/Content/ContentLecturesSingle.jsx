import React from "react";
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
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import GitHubIcon from '@mui/icons-material/GitHub';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const RATING_DISABLED_TERMS = new Set([
  "22T1",
  "22T3",
  "23T1",
  "23T3",
  "24T1",
  "24T3",
  "25T1",
]);
const MIN_COMMENT_LENGTH = 20;

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

const LectureInfoPanel = ({ lecture, term }) => {
  const authorNames = lecture
    .staff()
    .map((s) => s.name)
    .join(", ");
  const hasSlides = lecture.pdf_url !== "null";
  const pdfUrl =
    lecture.pdf_url === undefined
      ? `/~cs6080/raw/lectures/${lecture.key}.pdf`
      : lecture.pdf_url;
  const TimeStr = `${lecture.duration_mins} mins`;
  const slides  = hasSlides ? "Available" : "Not available";

  return (
<Box
  sx={{
    borderRadius: 1,
    p: 3,
    bgcolor: "background.paper",
  }}
>
  {/* Title row */}
  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
    <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.15,marginBottom: 0 }}>
      {lecture.name}
    </Typography>
  </Box>

  {/* Meta line */}
  <Typography variant="body2" color="text.secondary">
    {lecture.topic().area().name} •{" "}
    <Link to={`/${term}/content/lectures/topic#${lecture.topic().name}`}>
      {lecture.topic().name}
    </Link>
    {" • "}
    {authorNames}
  </Typography>

    {/* Description / status */}
  {lecture.description && (
    <Typography variant="body1" color="text" sx={{ mt: 2, lineHeight: 1.6, maxWidth: "80ch" }}>
      <Typography component="span" fontWeight={700} >Description: </Typography>
      {lecture.description}
    </Typography>
  )}


  {/* Pills */}
  <Box sx={{ display: "flex", gap: 1.25, mt: 1.5, flexWrap: "wrap" }}>
    <Chip label={TimeStr}  size="small" variant="outlined" color="secondary"/>
    <Chip label={`Slides: ${slides}`}  size="small" variant="outlined" color={ hasSlides ? "success" : "default"}/>
  </Box>


  {/* Divider */}
  <Box sx={{ my: 2, borderTop: "1px solid", borderColor: "divider" }} />

  {/* Action bar */}
  <Box sx={{ display: "flex", alignItems: "stretch" }}>
    {/* PDF */}
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      {hasSlides ? (
        lecture.visible ? (
          <Button
            component="a"
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            variant="text"
            sx={{ textTransform: "none" }}
            startIcon={<ContactPageIcon />}
          >
            Lecture Slides
          </Button>
        ) : (
          <Button
            onClick={() => alert("Lecture is coming soon! Check back later")}
            variant="text"
            sx={{ textTransform: "none" }}
            startIcon={<ContactPageIcon />}
          >
            Lecture Slides
          </Button>
        )
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
          Lecture Slides
        </Typography>
      )}
    </Box>

    {/* vertical divider */}
    <Box sx={{ borderLeft: "1px solid", borderColor: "divider" }} />


    {/* Code */}
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Button
        component="a"
        href={`/~cs6080/raw/lectures/${lecture.key}/`}
        target="_blank"
        rel="noreferrer"
        variant="text"
        sx={{ textTransform: "none" }}
        startIcon={<GitHubIcon />}
      >
        LectureCode
      </Button>
    </Box>
  </Box>
</Box>


  );
};

const LectureRating = ({
  term,
  lectureId,
  initialRating,
  initialComment,
}) => {
  const [draftRating, setDraftRating] = React.useState(initialRating ?? 0);
  const [draftComment, setDraftComment] = React.useState(initialComment ?? "");
  const [submitState, setSubmitState] = React.useState({
    isSubmitting: false,
    error: "",
    success: false,
  });

  React.useEffect(() => {
    setDraftRating(initialRating ?? 0);
    setDraftComment(initialComment ?? "");
    setSubmitState({
      isSubmitting: false,
      error: "",
      success: false,
    });
  }, [initialRating, initialComment, lectureId]);

  if (RATING_DISABLED_TERMS.has(term)) {
    return null;
  }

  const trimmedComment = draftComment.trim();
  const commentTooShort = trimmedComment.length < MIN_COMMENT_LENGTH;

  const handleRating = (rate) => {
    setDraftRating(rate);
    if (submitState.success) {
      setSubmitState((prev) => ({ ...prev, success: false }));
    }
  };

  const handleCommentChange = (event) => {
    setDraftComment(event.target.value);
    if (submitState.success) {
      setSubmitState((prev) => ({ ...prev, success: false }));
    }
  };

  const handleSubmit = () => {
    if (commentTooShort || submitState.isSubmitting || !lectureId) {
      return;
    }

    setSubmitState({
      isSubmitting: true,
      error: "",
      success: false,
    });

    apiCall(
      `${term}/rating`,
      {
        lectureslug: lectureId,
        rating: draftRating,
        comment: draftComment,
      },
      "POST"
    )
      .then(() => {
        setSubmitState({
          isSubmitting: false,
          error: "",
          success: true,
        });
      })
      .catch(() => {
        setSubmitState({
          isSubmitting: false,
          error: "Rating submission failed.",
          success: false,
        });
      });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Please rate after watching!
      </Typography>
      <Rating onClick={handleRating} initialValue={draftRating} />
      <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}>
        <input
          value={draftComment}
          onChange={handleCommentChange}
          placeholder="Comment (min 20 characters)"
          minLength={MIN_COMMENT_LENGTH}
          required
          style={{ height: "20px", width: "300px" }}
        />
        <Typography
          variant="caption"
          color={commentTooShort ? "error" : "text.secondary"}
        >
          {commentTooShort
            ? `Comment must be at least ${MIN_COMMENT_LENGTH} characters.`
            : "Comment length looks good."}
        </Typography>
      </Box>
      <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={commentTooShort || submitState.isSubmitting}
        >
          {submitState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {submitState.success && (
          <Typography variant="caption" color="success.main">
            Rating submitted.
          </Typography>
        )}
        {submitState.error && (
          <Typography variant="caption" color="error">
            {submitState.error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const LectureVideo = ({ lecture }) => (
  <Accordion
    sx={{
      minWidth: 100,
      width: "100%",
      background: "rgb(0,0,0)",
    }}
    expanded={true}
  >
    <AccordionDetails>
      {lecture.video && lecture.visible ? (
        <Box
          sx={{
            width: "100%",
            "& iframe": {
              width: "100%",
              height: "auto",
              aspectRatio: "16 / 9",
              margin: "0 !important",
              display: "block",
            },
          }}
        >
          <Youtube code={lecture.video} />
        </Box>
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
      
        </Box>
        <Box sx={{ flex: "2 1 0%", minWidth: 0}}>
          <LectureInfoPanel lecture={lecture} term={getters.term} />
          <LectureRating
            term={getters.term}
            lectureId={params.lecid}
            initialRating={savedRating}
            initialComment={savedRatingComments}
          />
        </Box>
      </Box>
      {/* <RelatedContent
        relatedLectures={relatedLectures}
        relatedTutes={relatedTutes}
      /> */}
    </>
  );
};

export default makePage(ContentLecturesSingle, {
  loginRequired: true,
  title: "",
});
