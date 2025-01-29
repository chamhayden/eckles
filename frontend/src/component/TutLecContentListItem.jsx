import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

// https://stackoverflow.com/questions/40958727/javascript-generate-unique-number-based-on-string
const hashCode = (str) => {
  var hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export default function TutLecContentListItem({
  name,
  contentKey,
  duration_mins,
  relevance,
  week,
  topicEmoji,
  topicName,
  live,
  lecture,
  thumbnail,
}) {
  const getRelevanceChip = (relevance) => {
    if (lecture) {
      switch (relevance) {
        case "Mandatory":
          return { label: "Mandatory", color: "success" };
        case "Catchup":
          return { label: "Catchup", color: "secondary" };
        case "Recommended":
          return { label: "Recommended", color: "info" };
        case "Extension":
          return { label: "Extension", color: "warning" };
        default:
          return { label: "Unknown", color: "default" };
      }
    } else {
      switch (relevance) {
        case "COMPULSORY":
          return { label: "Compulsory", color: "success" };
        case "REFINING":
          return { label: "Refining", color: "info" };
        case "EXTENDED":
          return { label: "Extended", color: "warning" };
        default:
          return { label: "Unknown", color: "default" };
      }
    }
  };

  const isLive = live === "🔴 NEW";
  const relevanceChip = getRelevanceChip(relevance);
  const fullWeek = "Week " + week;
  const topic = topicEmoji + " " + topicName;
  const hash = hashCode(contentKey) % 400;

  const cardLink = lecture
    ? `/NOW/content/lectures/${contentKey}`
    : `/NOW/content/tutorials/${contentKey}`;

  return (
    <Link to={cardLink}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "110px",
          width: "100%",
          "&:hover": {
            transform: "scale(1.025)",
            transition: "all .2s ease-in-out;",
          },
          boxShadow: "none", 
          borderBottom: "1px solid #ddd",
          borderRadius: "0px",
          paddingBottom: "10px",
        }}
      >
        <CardContent sx={{ padding: "0px !important" }}>
          <Stack direction="row" alignItems="left">
            <img
              src={
                thumbnail
                  ? thumbnail.url
                  : `https://picsum.photos/id/${hash}/200`
              }
              alt={name}
              style={{
                width: "150px",
                height: "auto",
                display: "block",
              }}
            />
            <Stack
              direction="column"
              alignItems="left"
              sx={{
                paddingLeft: 1,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#5b7edb",
                  },
                }}
              >
                {name}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {duration_mins} minutes
              </Typography>
              <Stack direction="row" gap={1} rowGap={1} flexWrap="wrap">
                <Chip label={topic} />
                <Chip label={fullWeek} />
                <Chip color={relevanceChip.color} label={relevanceChip.label} />
                {isLive && <Chip color="secondary" label={"Live"} />}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
