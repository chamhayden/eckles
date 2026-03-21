import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const LectureInfoPanel = ({ lecture, term }) => {
  const storageKey = `lecture-study-status:${term}:${lecture.key}`;
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [hasLoadedStatus, setHasLoadedStatus] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === 'completed') {
        setIsCompleted(true);
      }
      if (saved === 'incomplete') {
        setIsCompleted(false);
      }
    } catch (error) {
      setIsCompleted(true);
    }
    setHasLoadedStatus(true);
  }, [storageKey]);

  React.useEffect(() => {
    if (!hasLoadedStatus) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(storageKey, isCompleted ? 'completed' : 'incomplete');
    } catch (error) {
      // Ignore storage failures (e.g., private mode or quota exceeded).
    }
  }, [storageKey, isCompleted, hasLoadedStatus]);

  const handleToggleStatus = () => {
    setIsCompleted((prev) => !prev);
  };
  const authorNames = lecture
    .staff()
    .map((s) => s.name)
    .join(', ');
  const hasSlides = lecture.pdf_url !== 'null';
  const pdfUrl =
    lecture.pdf_url === undefined ? `/~cs6080/raw/lectures/${lecture.key}.pdf` : lecture.pdf_url;
  const TimeStr = `${lecture.duration_mins} mins`;
  const slides = hasSlides ? 'Available' : 'Not available';

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 3,
        bgcolor: 'background.paper',
        mb: 2,
      }}
    >
      {/* Title row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.15, marginBottom: 0 }}>
          {lecture.name}
        </Typography>
      </Box>

      {/* Divider */}
      <Box sx={{ my: 2, borderTop: '1px solid', borderColor: 'divider' }} />

      {/* Meta line */}
      <Typography variant="body2" color="text.secondary">
        {lecture.topic().area().name} •{' '}
        <Link to={`/${term}/content/lectures/topic#${lecture.topic().name}`}>
          {lecture.topic().name}
        </Link>
        {' • '}
        {authorNames}
      </Typography>

   

      <Typography variant="body1" color="text" sx={{ mt: 2, lineHeight: 1.6, maxWidth: '80ch' }}>
        <Typography component="span" fontWeight={700}>
          Deadline:{' '}
        </Typography>
        Should watch no later than end of{' '}
        <Link to={`/${term}/content/lectures/week#${lecture.week().week}`}>
          week {lecture.week().week}
        </Link>
      </Typography>

      {/* Description / status */}
      {lecture.description && (
        <Typography variant="body1" color="text" sx={{ mt: 2, lineHeight: 1.6, maxWidth: '80ch' }}>
          <Typography component="span" fontWeight={700}>
            Description:{' '}
          </Typography>
          {lecture.description}
        </Typography>
      )}


      {/* Pills */}
      <Box sx={{ display: 'flex', gap: 1.25, mt: 1.5, flexWrap: 'wrap' }}>
        <Chip label={TimeStr} size="small" variant="outlined" color="secondary" />
        <Chip
          label={`Slides: ${slides}`}
          size="small"
          variant="outlined"
          color={hasSlides ? 'error' : 'default'}
        />
      </Box>


         <Typography variant="body1" color="text" sx={{ mt: 2, lineHeight: 1.6, maxWidth: '80ch' }}>
        <Typography component="span" fontWeight={700}>
          Study Status:{' '}
        </Typography>
        <Button
          onClick={handleToggleStatus}
          variant="contained"
          size="small"
          aria-pressed={isCompleted}
          sx={{
            padding: '1px 7px',
            borderRadius: '2px',
            textTransform: 'none',
            backgroundColor: isCompleted ? 'success.main' : 'error.main',
            '&:hover': {
              backgroundColor: isCompleted ? 'success.dark' : 'error.dark',
            },
          }}
        >
          {isCompleted ? ' ✓ Completed' : ' Mark as Completed'}
        </Button>
      </Typography>

      {/* Divider */}
      <Box sx={{ my: 2, borderTop: '1px solid', borderColor: 'divider' }} />

      {/* Action bar */}
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        {/* PDF */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {hasSlides ? (
            lecture.visible ? (
              <Button
                component="a"
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                variant="text"
                sx={{ textTransform: 'none' }}
                startIcon={<ContactPageIcon />}
              >
                Lecture Slides
              </Button>
            ) : (
              <Button
                onClick={() => alert('Lecture is coming soon! Check back later')}
                variant="text"
                sx={{ textTransform: 'none' }}
                startIcon={<ContactPageIcon />}
              >
                Lecture Slides
              </Button>
            )
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
              Lecture Slides
            </Typography>
          )}
        </Box>

        {/* vertical divider */}
        <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }} />

        {/* Code */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            component="a"
            href={`/~cs6080/raw/lectures/${lecture.key}/`}
            target="_blank"
            rel="noreferrer"
            variant="text"
            sx={{ textTransform: 'none' }}
            startIcon={<GitHubIcon />}
          >
            Lecture Code
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LectureInfoPanel;
