import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

export default function TutLecContentCard(content) {
  return (
    <Card sx={{ maxWidth: 300, paddingBottom: "10px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          <a href="/content/lectures/single">{content.name}</a>
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {content.duration_mins} minutes
        </Typography>
        <Stack direction="row" gap={1} rowGap={1} flexWrap={"wrap"}>
          <Chip label="🛡️ Admin" />
          <Chip label="Week 1" />
          <Chip color="success" label={content.relevance} />
        </Stack>
      </CardContent>
      {/* <CardActions sx={{ marginLeft: "7px" }}>
        <Button variant="outlined" size="small">
          Watch
        </Button>
      </CardActions> */}
    </Card>
  );
}