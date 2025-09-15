import React, { useMemo } from "react";
import { Context, useContext } from "../../context";
import TutLecContentCard from "../../component/TutLecContentCard";
import TutLecContentListItem from "../../component/TutLecContentListItem";
import makePage from "../../component/makePage";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Modal,
  Input,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Tooltip,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import InfoIcon from "@mui/icons-material/Info";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";
import { getCurrentWeek } from "../../util/date";
import {
  useSearchFilters,
  filterLectures,
  MODAL_STYLES,
} from "../../util/content";

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
  } = useSearchFilters("lectures", "lec");

  // Filtered lectures computation
  const filteredLectures = useMemo(() => {
    return filterLectures(
      content_lectures,
      filters,
      searchQuery,
      selectedWeek,
      currentWeek
    );
  }, [content_lectures, filters, searchQuery, selectedWeek, currentWeek]);

  return (
    <>
      <Stack
        alignItems="flex-end"
        direction="row"
        flexWrap="wrap"
        gap={2}
        borderRadius="sm"
      >
        <FormControl sx={{ flex: 2 }}>
          <Input
            size="small"
            placeholder="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 80 }}>
          <InputLabel id="week-select-label2">Week</InputLabel>
          <Select
            labelId="week-select-label"
            value={selectedWeek}
            onChange={handleWeekChange}
            label="Week"
          >
            <MenuItem value="All">All</MenuItem>
            {weeks
              .filter((week) => week.week !== 6)
              .map((week) => (
                <MenuItem key={week.week} value={week.week}>
                  {week.week}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <Button
            startIcon={<FilterListIcon />}
            variant={isFiltered ? "contained" : "outlined"}
            size="small"
            onClick={toggleFilters}
          >
            Filter
          </Button>
        </FormControl>
        <FormControl>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              (window.location.href =
                "https://www.youtube.com/watch?v=kU1lGsUqqIE&list=PLi2pCZz5m6GH_-23-LKG7ZgfE5TbbFdQK&index=1")
            }
          >
            View all on YouTube
          </Button>
        </FormControl>
        <FormControl>
          <IconButton color="primary" onClick={handleViewModeToggle}>
            {viewMode === "grid" ? <GridViewIcon /> : <ReorderIcon />}
          </IconButton>
        </FormControl>
      </Stack>

      <Modal
        open={filtersOpen}
        onClose={toggleFilters}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLES}>
          <h2>Filter Content</h2>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="topic-select-label">Topic</InputLabel>
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
              >
                <MenuItem value="All">All</MenuItem>
                {topics.map((topic) => (
                  <MenuItem key={topic.name} value={topic.name}>
                    {topic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="relevance-select-label">Relevance</InputLabel>
              <Select
                labelId="relevance-select-label"
                value={tempFilters.selectedRelevance}
                onChange={(event) =>
                  setTempFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedRelevance: event.target.value,
                  }))
                }
                label="Relevance"
              >
                <MenuItem value="bareMinimum">
                  I want to do the bare minimum
                </MenuItem>
                <MenuItem value="workHard">
                  I want to work hard but not go over the top
                </MenuItem>
                <MenuItem value="learnEverything">
                  I want to learn everything
                </MenuItem>
              </Select>
            </FormControl>
            <Stack direction={"row"} spacing={0}>
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
                sx={{ mr: 0 }}
              />
              <Tooltip title="If you uncheck this box, we will show all COMP1531 lectures that are relevant to this course. You won't necessarily need to watch every catch up lecture, because you may already have that knowledge.">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack>
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
            </Stack>
            <Stack>
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
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={toggleFilters}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button variant="contained" onClick={handleApplyFilters}>
                Apply
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
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mt: 4,
                  mb: 2,
                }}
              >
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: "1px solid #ccc",
                    margin: 0,
                  }}
                />
                <Box
                  sx={{
                    px: 2,
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "primary.main",
                    padding: "5px 20px",
                    color: "primary.main",
                  }}
                >
                  Week {weekObj.week}
                </Box>
                <hr
                  style={{
                    flexGrow: 1,
                    borderTop: "1px solid #ccc",
                    margin: 0,
                  }}
                />
              </Box>
              {viewMode === "grid" ? (
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
                      thumbnail={
                        lecture.thumbnail && lecture.thumbnail.length > 0
                          ? lecture.thumbnail[0]
                          : null
                      }
                    />
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
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
                      thumbnail={
                        lecture.thumbnail && lecture.thumbnail.length > 0
                          ? lecture.thumbnail[0]
                          : null
                      }
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
  title: "",
});
