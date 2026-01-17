import React, { useMemo } from 'react';
import { Context, useContext } from '../../context';
import TutLecContentCard from '../../component/TutLecContentCard';
import TutLecContentListItem from '../../component/TutLecContentListItem';
import makePage from '../../component/makePage';
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Modal,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Tooltip,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import { getCurrentWeek } from '../../util/date';
import { useSearchFilters, filterLectures, MODAL_STYLES } from '../../util/content';

import THUMBNAIL_URL from '../../asset/thumbnail.jpg'

const ContentLecturesSearch = () => {
  const { getters } = useContext(Context);
  const { content_lectures, weeks, topics, meta } = getters.content;
  const currentWeek = getCurrentWeek(meta[0].value);

  const {
    searchQuery,
    setSearchQuery,
    selectedWeek,
    viewMode,
    filters,
    filtersOpen,
    tempFilters,
    setTempFilters,
    isFiltered,
    toggleFilters,
    handleResetFilters,
    handleApplyFilters,
    handleWeekChange,
    handleViewModeToggle,
  } = useSearchFilters('lectures', 'lec');

  // Filtered lectures computation
  const filteredLectures = useMemo(() => {
    return filterLectures(content_lectures, filters, searchQuery, selectedWeek, currentWeek);
  }, [content_lectures, filters, searchQuery, selectedWeek, currentWeek]);

  return (
    <>
      <Box
        sx={{
          background:
            'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1.5}>
          <FormControl sx={{ flex: 2, minWidth: '250px' }}>
            <OutlinedInput
              placeholder="Search lectures..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              startAdornment={<SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              sx={{
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'background.paper',
                '& .MuiOutlinedInput-input': {
                  padding: '0 12px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '1px',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel
              id="week-select-label2"
              sx={{ backgroundColor: 'background.paper', px: 0.5 }}
            >
              Week
            </InputLabel>
            <Select
              labelId="week-select-label"
              value={selectedWeek}
              onChange={handleWeekChange}
              label="Week"
              sx={{
                height: '40px',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="All">All Weeks</MenuItem>
              {weeks
                .filter((week) => week.week !== 6)
                .map((week) => (
                  <MenuItem key={week.week} value={week.week}>
                    Week {week.week}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            startIcon={<FilterListIcon />}
            variant={isFiltered ? 'contained' : 'outlined'}
            onClick={toggleFilters}
            sx={{
              borderRadius: '8px',
              height: '40px',
              minHeight: '40px',
              padding: '0 16px',
              fontWeight: 600,
              textTransform: 'none',
              borderWidth: isFiltered ? 1 : 2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              lineHeight: 1,
              '&:hover': {
                borderWidth: isFiltered ? 1 : 2,
              },
            }}
          >
            {isFiltered ? 'Filtered' : 'Filter'}
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              (window.location.href =
                'https://www.youtube.com/watch?v=kU1lGsUqqIE&list=PLi2pCZz5m6GH_-23-LKG7ZgfE5TbbFdQK&index=1')
            }
            sx={{
              borderRadius: '8px',
              height: '40px',
              minHeight: '40px',
              padding: '0 16px',
              fontWeight: 600,
              textTransform: 'none',
              borderWidth: 2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              marginBottom: '12px',
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            📺 YouTube
          </Button>
          <IconButton
            color="primary"
            onClick={handleViewModeToggle}
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              marginBottom: '12px',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
              },
            }}
          >
            {viewMode === 'grid' ? <GridViewIcon /> : <ReorderIcon />}
          </IconButton>
        </Stack>
      </Box>

      <Modal
        open={filtersOpen}
        onClose={toggleFilters}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...MODAL_STYLES,
            width: 500,
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            🔍 Filter Lectures
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel
                id="topic-select-label"
                sx={{ backgroundColor: 'background.paper', px: 0.5 }}
              >
                Topic
              </InputLabel>
              <Select
                labelId="topic-select-label"
                value={tempFilters.selectedTopic}
                onChange={(event) =>
                  setTempFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedTopic: event.target.value,
                  }))
                }
                label="Topic"
                sx={{
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="All">All Topics</MenuItem>
                {topics.map((topic) => (
                  <MenuItem key={topic.name} value={topic.name}>
                    {topic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                id="relevance-select-label"
                sx={{ backgroundColor: 'background.paper', px: 0.5 }}
              >
                Study Level
              </InputLabel>
              <Select
                labelId="relevance-select-label"
                value={tempFilters.selectedRelevance}
                onChange={(event) =>
                  setTempFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedRelevance: event.target.value,
                  }))
                }
                label="Study Level"
                sx={{
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="bareMinimum">🎯 Bare Minimum</MenuItem>
                <MenuItem value="workHard">💪 Work Hard</MenuItem>
                <MenuItem value="learnEverything">🚀 Learn Everything</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: 'rgba(37, 99, 235, 0.03)',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 1.5, fontWeight: 600, color: 'text.primary' }}
              >
                Filter Options
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction={'row'} alignItems="center" spacing={0}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tempFilters.completedCOMP1531}
                        onChange={(event) =>
                          setTempFilters((prevFilters) => ({
                            ...prevFilters,
                            completedCOMP1531: event.target.checked,
                          }))
                        }
                      />
                    }
                    label="I completed COMP1531"
                    sx={{ mr: 0, flex: 1 }}
                  />
                  <Tooltip title="If you uncheck this box, we will show all COMP1531 lectures that are relevant to this course. You won't necessarily need to watch every catch up lecture, because you may already have that knowledge.">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <FormControlLabel
                  sx={{ mr: 0 }}
                  control={
                    <Checkbox
                      checked={tempFilters.showLiveLectures}
                      onChange={(event) =>
                        setTempFilters((prevFilters) => ({
                          ...prevFilters,
                          showLiveLectures: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Show only live lectures"
                />
                <FormControlLabel
                  sx={{ mr: 0 }}
                  control={
                    <Checkbox
                      checked={tempFilters.showPastWeeks}
                      onChange={(event) =>
                        setTempFilters((prevFilters) => ({
                          ...prevFilters,
                          showPastWeeks: event.target.checked,
                        }))
                      }
                    />
                  }
                  label="Show past weeks"
                />
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={toggleFilters}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '8px 24px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                }}
              >
                Apply Filters
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ mt: 3 }}>
        {weeks.map((weekObj) => {
          const lecturesForWeek = filteredLectures.filter(
            (lecture) => lecture.week().week === weekObj.week
          );

          if (lecturesForWeek.length === 0) return null;

          return (
            <React.Fragment key={weekObj.week}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  mt: 4,
                  mb: 2,
                }}
              >
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: '1px solid #ccc',
                    margin: 0,
                  }}
                />
                <Box
                  sx={{
                    px: 2,
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'primary.main',
                    padding: '5px 20px',
                    color: 'primary.main',
                  }}
                >
                  Week {weekObj.week}
                </Box>
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: '1px solid #ccc',
                    margin: 0,
                  }}
                />
              </Box>
              {viewMode === 'grid' ? (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                  gap={2}
                >
                  {lecturesForWeek.map((lecture) => (
                    <TutLecContentCard
                      key={lecture.key}
                      contentKey={lecture.key}
                      name={lecture.name}
                      duration_mins={lecture.duration_mins}
                      relevance={lecture.relevance}
                      week={lecture.week().week}
                      topicEmoji={lecture.topic().emoji}
                      topicName={lecture.topic().name}
                      live={lecture.status}
                      lecture={true}
                      thumbnail={THUMBNAIL_URL}
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                  }}
                >
                  {lecturesForWeek.map((lecture) => (
                    <TutLecContentListItem
                      key={lecture.key}
                      contentKey={lecture.key}
                      name={lecture.name}
                      duration_mins={lecture.duration_mins}
                      relevance={lecture.relevance}
                      week={lecture.week().week}
                      topicEmoji={lecture.topic().emoji}
                      topicName={lecture.topic().name}
                      live={lecture.status}
                      lecture={true}
                      thumbnail={THUMBNAIL_URL}
                    />
                  ))}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
};

export default makePage(ContentLecturesSearch, {
  loginRequired: true,
  title: '',
});
