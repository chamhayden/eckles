import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import config from "../../../config";
import Chip from "@mui/material/Chip";
const TutorialInfoPanel = ({ tutorial, term }) => {

const TimeStr = `${tutorial.duration} mins`;
return (
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

        <Typography variant="body2" color="text.secondary">
          {tutorial.topic().area().name} •{" "}
          <Link to={`/${term}/content/lectures/topic#${tutorial.topic().name}`}>
            {tutorial.topic().name}
          </Link>
        </Typography>

        <Box sx={{ my: 2, borderTop: "1px solid", borderColor: "divider" }} />
              {tutorial.name && (
            <Typography
              variant="body1"
              color="text"
              sx={{ mt: 2, lineHeight: 1.6, maxWidth: "80ch" }}
            >
              <Typography component="span" fontWeight={700}>
                Description:{" "}
              </Typography>
              {tutorial.name}
            </Typography>
          )}
        <Typography variant="body1" gutterBottom>
          This exercise is {tutorial.importance}
        </Typography>

          <Box sx={{ display: "flex", gap: 1.25, mt: 1.5, flexWrap: "wrap" }}>
            <Chip label={TimeStr} size="small" variant="outlined" color="secondary" />
            </Box>

        <Box sx={{ my: 2, borderTop: "1px solid", borderColor: "divider" }} />

            <Button
                component="a"
                href={`${config.BASE_URL}/gitlabredir/${term}/exercises/${tutorial.key}`}
                target="_blank"
                rel="noreferrer"
                variant="text"
                sx={{ textTransform: "none" }}
                startIcon={<GitHubIcon />}
              >
            View activity on gitlab
        </Button>
      </Box>
)
};

export default TutorialInfoPanel;
