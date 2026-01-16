import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Rating } from "react-simple-star-rating";
import { apiCall } from "../../../util/api";

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

const LectureRating = ({ term, lectureId, initialRating, initialComment }) => {
  const [draftRating, setDraftRating] = React.useState(initialRating ?? 0);
  const [draftComment, setDraftComment] = React.useState(initialComment ?? "");
  const [submitState, setSubmitState] = React.useState({
    isSubmitting: false,
    error: "",
    success: false,
  });
  const [ratingPopoverOpen, setRatingPopoverOpen] = React.useState(false);

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
    if (submitState.success || submitState.error) {
      setSubmitState((prev) => ({ ...prev, success: false, error: "" }));
    }
  };

  const handleCommentChange = (event) => {
    setDraftComment(event.target.value);
    if (submitState.success || submitState.error) {
      setSubmitState((prev) => ({ ...prev, success: false, error: "" }));
    }
  };

  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitState((prev) => ({ ...prev, success: false, error: "" }));
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

  const showAlert = submitState.success || Boolean(submitState.error);
  const alertMessage = submitState.error || "Rating submitted.";
  const alertSeverity = submitState.error ? "error" : "success";

  return (
    <Box
      sx={{
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTop: "1px solid",
        borderColor: "primary.main",
        bgcolor: "background.paper",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        overflow: "visible",
      }}
    >
      <Box sx={{ px: 2.5, py: 1 }}>
        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
  }}
>
<TextField
  value={draftComment}
  onChange={handleCommentChange}
  placeholder="Add a comment here…"
  minLength={MIN_COMMENT_LENGTH}
  required
  fullWidth
  minRows={1}
  variant="standard"
  InputProps={{ disableUnderline: true }}
  helperText={
    commentTooShort
      ? `Comment must be at least ${MIN_COMMENT_LENGTH} characters, you have ${trimmedComment.length}.`
      : " Comment is sufficient."
  }
  sx={{
    flex: 1,
    "& .MuiInputBase-root": {
      padding: 0,        // 去掉根元素 padding
      alignItems: "center",
      margin: 0,
    },
    "& .MuiInputBase-input": {
      fontSize: "1rem",
      padding: 0,        // 去掉 input 的 padding
    },
    "& input::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
    "& .MuiFormHelperText-root": {
          marginTop: "4px",
          fontSize: "0.75rem", 
      }}
  }

/>
  <Box
    sx={{
      px: 1,
      display: "flex",      // 关键
      alignItems: "center", // 关键
      height: "100%",       // 可选，确保占满高度
    }}
  >
    <Rating onClick={handleRating} initialValue={draftRating} size={20} />
  </Box>
  <Button
    variant="contained"
    onClick={handleSubmit}
    disabled={commentTooShort || submitState.isSubmitting}
    aria-label="Submit rating"
    sx={{
      fontSize: "0.75rem",
    }}
  >
    {submitState.isSubmitting ? (
      <CircularProgress size={12} color="inherit" />
    ) : (
      "Send"
    )}
  </Button>
</Box>
      </Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LectureRating;
