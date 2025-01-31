import React, { useState, useMemo, useEffect } from "react";
import { Context, useContext } from "../../context";
import TutLecContentCard from "../../component/TutLecContentCard";
import TutLecContentListItem from "../../component/TutLecContentListItem";
import makePage from "../../component/makePage";
import {
  Box,
  Button,
  Modal,
  Input,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  Stack,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";

const ContentTutorialsSearch = () => {
  const { getters, setters } = useContext(Context);
  const { content_tutorials, weeks, topics } = getters.content;
  const [searchQuery, setSearchQuery] = useState("");
  const [tutWeek, setTutWeek] = useState("All");
  const [isTutFiltered, setIsTutFiltered] = useState(false);
  const [filtersTutOpen, setFiltersTutOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [tutFilters, setTutFilters] = useState({
    selectedTopic: "All",
    selectedRelevance: "workHard",
  });
  const [tempFilters, setTempFilters] = useState({
    selectedTopic: "All",
    selectedRelevance: "workHard",
  });

  useEffect(() => {
    localStorage.getItem("viewMode") &&
      setViewMode(localStorage.getItem("viewMode"));
    const storedFilters = localStorage.getItem("tutFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setTutFilters(parsedFilters);
      setTempFilters(parsedFilters);
      setIsTutFiltered(
        parsedFilters.selectedRelevance !== "workHard" ||
          parsedFilters.selectedTopic !== "All"
      );
    }
    const storedWeek = localStorage.getItem("tutWeek");
    if (storedWeek) {
      setTutWeek(storedWeek === "All" ? "All" : parseInt(storedWeek, 10));
    }
  }, []);

  const toggleFilters = () => {
    setFiltersTutOpen(!filtersTutOpen);
  };

  const resetFilters = () => {
    setTutFilters({
      selectedTopic: "All",
      selectedRelevance: "workHard",
    });
    setTempFilters({
      selectedTopic: "All",
      selectedRelevance: "workHard",
    });
    setIsTutFiltered(false);
    setFiltersTutOpen(false);
    localStorage.removeItem("tutFilters");
  };

  const applyFilters = () => {
    const newFilters = { ...tutFilters, ...tempFilters };
    setTutFilters(newFilters);
    setFiltersTutOpen(false);
    setIsTutFiltered(
      newFilters.selectedRelevance !== "" || newFilters.selectedTopic !== "All"
    );
    localStorage.setItem("tutFilters", JSON.stringify(newFilters));
  };

  const filteredTutorials = useMemo(() => {
    const getRelevanceOptions = () => {
      switch (tutFilters.selectedRelevance) {
        case "bareMinimum":
          return ["🟢 COMPULSORY"];
        case "workHard":
          return ["🟢 COMPULSORY", "🔵 REFINING"];
        case "learnEverything":
          return ["🟢 COMPULSORY", "🔵 REFINING", "🟠 EXTENDED"];
        default:
          return [];
      }
    };

    const relevanceOptions = getRelevanceOptions();
    return content_tutorials.filter((tutorial) => {
      const nameMatch = tutorial.name
        ? tutorial.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
      const topic =
        tutFilters.selectedTopic === "All" ? "" : tutFilters.selectedTopic;
      let selectedWeek = tutWeek === "All" ? "" : tutWeek;

      const weekMatch = !selectedWeek || tutorial.week().week === selectedWeek;
      const topicMatch = !topic || tutorial.topic().name === topic;
      const relevanceMatch = relevanceOptions.includes(tutorial.importance);

      setIsTutFiltered(
        tutFilters.selectedRelevance !== "workHard" ||
          tutFilters.selectedTopic !== "All"
      );

      return nameMatch && weekMatch && topicMatch && relevanceMatch;
    });
  }, [content_tutorials, tutFilters, searchQuery, tutWeek]);

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
            labelId="week-select-label2"
            value={tutWeek}
            onChange={(event) => {
              setTutWeek(event.target.value);
              localStorage.setItem("tutWeek", event.target.value);
            }}
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
            variant={isTutFiltered ? "contained" : "outlined"}
            size="small"
            onClick={toggleFilters}
          >
            Filter
          </Button>
        </FormControl>
        <FormControl>
          <IconButton color="primary">
            {viewMode === "grid" ? (
              <GridViewIcon
                onClick={() => {
                  setViewMode("list");
                  localStorage.setItem("viewMode", "list");
                }}
              />
            ) : (
              <ReorderIcon
                onClick={() => {
                  setViewMode("grid");
                  localStorage.setItem("viewMode", "grid");
                }}
              />
            )}
          </IconButton>
        </FormControl>
      </Stack>

      <Modal
        open={filtersTutOpen}
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
                  {" "}
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
                  {tutorialsForWeek.map((tutorial) => (
                    <TutLecContentCard
                      contentKey={tutorial.key}
                      name={tutorial.name}
                      duration_mins={tutorial.duration}
                      relevance={tutorial.importance.split(" ")[1]}
                      week={tutorial.week().week}
                      topicEmoji={tutorial.topic().emoji}
                      topicName={tutorial.topic().name}
                      live={""}
                      lecture={false}
                      thumbnail={
                        tutorial.thumbnail && tutorial.thumbnail.length > 0
                          ? tutorial.thumbnail[0]
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
                  {tutorialsForWeek.map((tutorial) => (
                    <TutLecContentListItem
                    contentKey={tutorial.key}
                    name={tutorial.name}
                    duration_mins={tutorial.duration}
                    relevance={tutorial.importance.split(" ")[1]}
                    week={tutorial.week().week}
                    topicEmoji={tutorial.topic().emoji}
                    topicName={tutorial.topic().name}
                    live={""}
                    lecture={false}
                    thumbnail={
                      tutorial.thumbnail && tutorial.thumbnail.length > 0
                        ? tutorial.thumbnail[0]
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

export default makePage(ContentTutorialsSearch, {
  loginRequired: true,
  title: "",
});
