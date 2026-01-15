import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Youtube from "../../../component/Youtube";

const LectureVideo = ({ lecture }) => (
  <Accordion
    sx={{
      minWidth: 100,
      width: "100%",
      background: "rgb(0,0,0)",
      "&.Mui-expanded": { margin: 0 },
      "& .MuiAccordionDetails-root": { padding: 0 },
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      overflow: "hidden",
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

export default LectureVideo;
