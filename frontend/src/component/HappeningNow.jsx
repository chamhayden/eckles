import * as React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

export default function HappeningNow({
  ongoingLectures,
  ongoingHelpSessions,
  ongoingTutorials,
}) {
  console.log("in component");
  console.log(ongoingLectures);
  console.log(ongoingHelpSessions);
  console.log(ongoingTutorials);
  return (
    <>
      {(ongoingLectures.length > 0 ||
        ongoingHelpSessions.length > 0 ||
        ongoingTutorials.length > 0) && (
        <Box
          sx={{
            width: "100%",
            borderRadius: 1,
            border: (theme) => `3px solid ${theme.palette.primary.main}`,
            padding: "20px",
            margin: "20px 0",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          {/* Live Lectures */}
          {ongoingLectures.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Lecture Happening NOW!
              </Typography>
              {ongoingLectures.map((lecture, index) => (
                <Box key={index} sx={{ marginBottom: "15px" }}>
                  <Typography variant="body1">
                    <strong>Time:</strong> {lecture.time} |{" "}
                    <strong>Location:</strong> {lecture.location}
                  </Typography>
                  {lecture.call_url_h && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={lecture.call_url_h}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: "100%",
                        marginTop: "5px",
                        color: "#FFF !important",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      Join Live Stream
                    </Button>
                  )}
                </Box>
              ))}
            </>
          )}

          {/* Live Help Sessions */}
          {ongoingHelpSessions.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Help Session Happening NOW!
              </Typography>
              {ongoingHelpSessions.map((session, index) => (
                <Box key={index} sx={{ marginBottom: "15px" }}>
                  <Typography variant="body1">
                    <strong>Time:</strong> {session.times}
                  </Typography>
                  {session.call_url_h && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={session.call_url_h}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: "100%",
                        marginTop: "5px",
                        color: "#FFF !important",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      Join Help Session
                    </Button>
                  )}
                </Box>
              ))}
            </>
          )}

          {/* Live Tutorials */}
          {ongoingTutorials.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tutorial(s) Happening NOW!
              </Typography>
              {ongoingTutorials.map((tutorial, index) => {
                const match = tutorial.times.match(/\((.*?)\)$/); // Extracts text inside parentheses
                const className = match ? match[1] : "Unknown"; // Gets class name or defaults to "Unknown"

                return (
                  <Card key={index} sx={{ marginBottom: "15px" }}>
                    <CardContent>
                      <Box key={index} sx={{ marginBottom: "15px" }}>
                        <>{className}</>
                        <Typography variant="body1">
                          <strong>Time:</strong> {tutorial.times}
                        </Typography>
                        {tutorial.call_url_h.includes("http") ? (
                          // Online tutorial (has a Teams link)
                          <Button
                            variant="contained"
                            color="primary"
                            href={tutorial.call_url_h}
                            target="_blank"
                            rel="noopener noreferrer"
                            disableElevation
                            sx={{
                              width: "100%",
                              marginTop: "5px",
                              color: "#FFF !important",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                            }}
                          >
                            Join Online Tutorial
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            sx={{
                              width: "100%",
                              marginTop: "5px",
                              color: "#FFF !important",
                            }}
                          >
                            {tutorial.call_url_h}
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
        </Box>
      )}
    </>
  );
}
