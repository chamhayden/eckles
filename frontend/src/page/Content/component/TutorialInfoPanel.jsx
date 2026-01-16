import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import config from "../../../config";

const TutorialInfoPanel = ({ tutorial, term }) => (
  <Box
    sx={{
      borderRadius: 1,
      p: 3,
      bgcolor: "background.paper",
      mb: 2,
    }}
  >
    <Typography
      variant="h4"
      sx={{ fontWeight: 800, lineHeight: 1.15, marginBottom: 0 }}
    >
      {tutorial.topic().emoji} {tutorial.key}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
      Part of{" "}
      <Link to={`/~cs6080/${term}/content/tutorials/topic#${tutorial.topic().name}`}>
        {tutorial.topic().name}
      </Link>{" "}
      in {tutorial.topic().area().name}
    </Typography>

    <Box sx={{ my: 2, borderTop: "1px solid", borderColor: "divider" }} />

    <Typography variant="body1" gutterBottom>
      {tutorial.name}
    </Typography>
    <Typography variant="body1" gutterBottom>
      This exercise is {tutorial.importance}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Duration: {tutorial.duration} minutes {"\u23f1\uFE0F"}
    </Typography>

    <Box sx={{ my: 2, borderTop: "1px solid", borderColor: "divider" }} />

    <Button variant="contained" size="large">
      <a
        style={{ color: "#fff" }}
        target="_blank"
        rel="noreferrer"
        href={`${config.BASE_URL}/gitlabredir/${term}/exercises/${tutorial.key}`}
      >
        View activity on gitlab
      </a>
    </Button>
  </Box>
);

export default TutorialInfoPanel;
