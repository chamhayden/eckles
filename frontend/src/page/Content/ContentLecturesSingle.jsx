import { HashLink as Link } from "react-router-hash-link";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import SubNavWrapper from "../../component/SubNavWrapper";
import ContentCards from "../../component/ContentCards";
import makePage from "../../component/makePage";
import { Context, useContext } from "../../context";
import Youtube from "../../component/Youtube";
import { getYoutubeCodeFromUrl } from "../../util/content";
import TitleCard from "../../component/TitleCard";
import SectionHeader from "../../component/SectionHeader";
import { Rating } from 'react-simple-star-rating'
import { apiCall } from '../../util/api';

let ratingCommentsTimeout = null;

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
      apiCall(`${getters.term}/rating/${params.lecid}`, {}, 'GET')
        .then(data => {
          console.log(data);
          setRating(data.rating);
          setRatingComments(data.comment);
        })
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

      const rl = [
        ...(lecture.lectures_prereq ? lecture.lectures_prereq() : []).map(
          (l) => ({
            ...l,
            label: "Watch first",
            labelBackground: "rgb(248,139,139)",
          })
        ),
        ...getters.content.content_lectures
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

      setRelatedLectures(
        rl.map((lec) => ({
          title: lec.name,
          linkUrl: `/${getters.term}/content/lectures/${lec.key}`,
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
        }))
      );

      if (lecture.content_tutorials) {
        setRelatedTutes(
          lecture.content_tutorials().map((tutorial, key) => ({
            title: tutorial.key,
            description: tutorial.name,
            linkUrl: `/${getters.term}/content/tutorials/${tutorial.key}`,
          }))
        );
      } else {
        setRelatedTutes([]);
      }
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
      <SectionHeader>
        {lecture.topic().emoji} <b>{lecture.name}</b> &nbsp; (part of{" "}
        <Link
          to={`/${getters.term}/content/lectures/topic#${lecture.topic().name}`}
        >
          {lecture.topic().name}
        </Link>{" "}
        in {lecture.topic().area().name})
      </SectionHeader>
      <Box sx={{ ml: 1 }}>
        <Typography variant="body1" gutterBottom>
          Duration: {lecture.duration_mins} minutes ⏱️
        </Typography>
        <Typography variant="body1" gutterBottom>
          Author(s):{" "}
          {lecture
            .staff()
            .map((s) => s.name)
            .join(", ")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {lecture.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <a target="_blank" href={`/~cs6080/raw/lectures/${lecture.key}/`}>
            Access the code used in the lecture here (may be blank).
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Should watch no later than end of{" "}
          <Link
            to={`/${getters.term}/content/lectures/week#${lecture.week().week}`}
          >
            week {lecture.week().week}
          </Link>
        </Typography>
        {lecture.schedule_lectures && (
          <Typography variant="body1" gutterBottom>
            {lecture.schedule_lectures().map((r) => (
              <>
                This lecture is a live lecture. Join the lecture{" "}
                <a target="_blank" href={r.call_url_h}>
                  here
                </a>{" "}
                at {r.time} {r.day} in week {r.week().week}
              </>
            ))}
          </Typography>
        )}
      </Box>

      {lecture.pdf_url !== 'null' ? (
        <>
          {lecture.visible ? (
            <a
              href={
                lecture.pdf_url === undefined
                  ? `/~cs6080/raw/lectures/${lecture.key}.pdf`
                  : lecture.pdf_url
              }
              target="_blank"
            >
              <Button variant="outlined" color="warning">
                View/Download PDF
              </Button>
            </a>
          ) : (
            <Button
              onClick={() => alert("Lecture is coming soon! Check back later")}
              variant="outlined"
              color="warning"
            >
              View/Download PDF
            </Button>
          )}
        </>
      ) : (
        <>There are no slides for this lecture</>
      )}

       {['22T1', '22T3', '23T1', '23T3', '24T1', '24T3', '25T1'].indexOf(getters.term) === -1 && (
        <>
          <h2>Please rate after watching!</h2>
          <Rating
            onClick={handleRating}
            initialValue={rating}
          />
          &nbsp;&nbsp;<input value={ratingComments} onChange={handleRatingComments} placeholder="Any comments? This will auto-save" style={{ height: '20px', width: '300px' }}/>
        </>
      )}

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
};

export default makePage(ContentLecturesSingle, {
  loginRequired: true,
  title: "",
});
