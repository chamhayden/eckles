import React, { useMemo } from 'react';
import { Context, useContext } from '../../context';
import TutLecContentCard from '../../component/TutLecContentCard';
import TutLecContentListItem from '../../component/TutLecContentListItem';
import makePage from '../../component/makePage';
import THUMBNAIL_URL from '../../asset/thumbnail.jpg'
import {
  Box,
  Button,
  Modal,
  OutlinedInput,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import { getCurrentWeek } from '../../util/date';
import { useSearchFilters, filterTutorials, MODAL_STYLES } from '../../util/content';

const ContentTutorialsSearch = () => {
  const { getters } = useContext(Context);
  const { content_tutorials, weeks, topics, meta } = getters.content;
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
  } = useSearchFilters('tutorials', 'tut');

  // Filtered tutorials computation
  const filteredTutorials = useMemo(() => {
    return filterTutorials(content_tutorials, filters, searchQuery, selectedWeek, currentWeek);
  }, [content_tutorials, filters, searchQuery, selectedWeek, currentWeek]);

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
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          <FormControl sx={{ flex: 2, minWidth: '250px' }}>
            <OutlinedInput
              placeholder="Search tutorials..."
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
              labelId="week-select-label2"
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
              lineHeight: 1,
              '&:hover': {
                borderWidth: isFiltered ? 1 : 2,
              },
            }}
          >
            {isFiltered ? 'Filtered' : 'Filter'}
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
            Filter Tutorials
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
              {/* TODO ALIGHEN CHECKBOX AND LABEL BETTER */}
              <FormControlLabel
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
                componentsProps={{
                  typography: { sx: { lineHeight: 1, margin: 0 } },
                }}
              />
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
          const tutorialsForWeek = filteredTutorials.filter(
            (tutorial) => tutorial.week().week === weekObj.week
          );

          if (tutorialsForWeek.length === 0) return null;

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
                  {' '}
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
                  {tutorialsForWeek.map((tutorial) => (
                    <TutLecContentCard
                      contentKey={tutorial.key}
                      name={tutorial.name}
                      duration_mins={tutorial.duration}
                      relevance={tutorial.importance.split(' ')[1]}
                      week={tutorial.week().week}
                      topicEmoji={tutorial.topic().emoji}
                      topicName={tutorial.topic().name}
                      live={''}
                      lecture={false}
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
                  {tutorialsForWeek.map((tutorial) => (
                    <TutLecContentListItem
                      contentKey={tutorial.key}
                      name={tutorial.name}
                      duration_mins={tutorial.duration}
                      relevance={tutorial.importance.split(' ')[1]}
                      week={tutorial.week().week}
                      topicEmoji={tutorial.topic().emoji}
                      topicName={tutorial.topic().name}
                      live={''}
                      lecture={false}
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

export default makePage(ContentTutorialsSearch, {
  loginRequired: true,
  title: '',
});
