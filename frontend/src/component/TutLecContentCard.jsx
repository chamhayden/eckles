import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function TutLecContentCard({
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

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxShadow: "lg",
        paddingBottom: "10px",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "all .2s ease-in-out;",
        },
      }}
    >
      <CardContent
        sx={{
          flex: "1 0 auto",
        }}
      >
        <Typography variant="h6" component="div">
          {lecture ? (
            <Link to={`/NOW/content/lectures/${contentKey}`}>{name}</Link>
          ) : (
            <Link to={`/NOW/content/tutorials/${contentKey}`}>{name}</Link>
          )}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {duration_mins} minutes
        </Typography>
      </CardContent>

      {thumbnail && (
        <img
          src={thumbnail.url}
          alt={name}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
        />
      )}

      <Stack
        direction="row"
        gap={1}
        rowGap={1}
        flexWrap="wrap"
        sx={{
          padding: 1,
          height: lecture ? "80px" : "auto",
        }}
      >
        <Chip label={topic} />
        <Chip label={fullWeek} />
        <Chip color={relevanceChip.color} label={relevanceChip.label} />
        {isLive && <Chip color="secondary" label={"Live"} />}
      </Stack>
    </Card>
  );
}