import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

export default function TutLecContentCard() {
  return (
    <Card sx={{ maxWidth: 300, paddingBottom: "10px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Title
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          60 mins
        </Typography>
        <Stack direction="row" gap={1} rowGap={1} flexWrap={"wrap"}>
          <Chip label="🛡️ Admin" />
          <Chip label="Week 1" />
          <Chip color="success" label="Mandatory" />
        </Stack>
      </CardContent>
      <CardActions sx={{ marginLeft: "7px" }}>
        <Button variant="outlined" size="small">
          Slides
        </Button>
      </CardActions>
    </Card>
  );
}
