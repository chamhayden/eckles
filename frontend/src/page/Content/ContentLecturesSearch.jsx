import React, { useEffect, useState, useMemo } from "react";
import { Context, useContext } from "../../context";
import TutLecContentCard from "../../component/TutLecContentCard";
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

const ContentLecturesSearch = () => {
  const { getters, setters } = useContext(Context);
  const { content_lectures, weeks, topics } = getters.content;

  const [searchQuery, setSearchQuery] = useState("");
  const [week, setWeek] = useState("All");
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    selectedTopic: "All",
    selectedRelevance: "workHard",
    completedCOMP1531: true,
  });
  const [tempFilters, setTempFilters] = useState({
    selectedTopic: "All",
    selectedRelevance: "workHard",
    completedCOMP1531: true,
  });
  console.log(content_lectures);
  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setFilters(parsedFilters);
      setTempFilters(parsedFilters);
      setIsFiltered(
        parsedFilters.selectedRelevance !== "workHard" ||
          parsedFilters.selectedTopic !== "All"
      );
    }
  }, []);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const resetFilters = () => {
    setFilters({
      selectedTopic: "All",
      selectedRelevance: "workHard",
      completedCOMP1531: true,
    });
    setTempFilters({
      selectedTopic: "All",
      selectedRelevance: "workHard",
      completedCOMP1531: true,
    });
    setIsFiltered(false);
    setFiltersOpen(false);
    localStorage.removeItem("filters");
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setFiltersOpen(false);
    setIsFiltered(
      tempFilters.selectedRelevance !== "workHard" ||
        tempFilters.selectedTopic !== "All"
    );
    localStorage.setItem("filters", JSON.stringify(tempFilters));
  };

  const filteredLectures = useMemo(() => {
    const getRelevanceOptions = () => {
      if (!filters.completedCOMP1531) {
        return ["Mandatory", "Catchup"];
      }
      switch (filters.selectedRelevance) {
        case "bareMinimum":
          return ["Mandatory"];
        case "workHard":
          return ["Mandatory", "Recommended"];
        case "learnEverything":
          return ["Mandatory", "Recommended", "Extension"];
        default:
          return [];
      }
    };

    const relevanceOptions = getRelevanceOptions();
    return content_lectures.filter((lecture) => {
      const nameMatch = lecture.name
        ? lecture.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
      let selectedWeek = week === "All" ? "" : week;
      const weekMatch = !selectedWeek || lecture.week().week === selectedWeek;
      let selectedTopic =
        filters.selectedTopic === "All" ? "" : filters.selectedTopic;
      const topicMatch =
        !selectedTopic || lecture.topic().name === selectedTopic;
      const relevanceMatch = relevanceOptions.includes(lecture.relevance);

      setIsFiltered(
        filters.selectedRelevance !== "workHard" ||
          filters.selectedTopic !== "All"
      );

      return nameMatch && weekMatch && topicMatch && relevanceMatch;
    });
  }, [content_lectures, filters, searchQuery, week]);

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
            value={week}
            onChange={(event) => setWeek(event.target.value)}
            label="Week"
          >
            <MenuItem value="All">All</MenuItem>
            {weeks.map((week) => (
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
      </Stack>

      <Modal
        open={filtersOpen}
        onClose={toggleFilters}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
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
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={toggleFilters}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={resetFilters}>
                Reset
              </Button>
              <Button variant="contained" onClick={applyFilters}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
          mt: 3,
        }}
      >
        {filteredLectures.map((lecture, index) => (
          <div key={index}>
            <TutLecContentCard
              contentKey={lecture.key}
              name={lecture.name}
              duration_mins={lecture.duration_mins}
              relevance={lecture.relevance}
              week={lecture.week().week}
              topicEmoji={lecture.topic().emoji}
              topicName={lecture.topic().name}
              live={lecture.status}
              lecture={true}
            />
          </div>
        ))}
      </Box>
    </>
  );
};

export default makePage(ContentLecturesSearch, {
  loginRequired: true,
  title: "",
});
