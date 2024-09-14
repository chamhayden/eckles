import React, { useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Outlet } from "react-router-dom";
import { Context, useContext } from "../../context";
import TutLecContentCard from "../../component/TutLecContentCard";
import SubNavWrapper from "../../component/SubNavWrapper";
import makePage from "../../component/makePage";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Modal from "@mui/material/Modal";

const ContentLecturesSearch = ({}) => {
  const { getters, setters } = useContext(Context);
  const { content_lectures, content_tutorials, weeks, topics } =
    getters.content;
  console.log(
    "content_lectures",
    content_lectures,
    "content_tutorials",
    content_tutorials,
    "weeks",
    weeks,
    "topics",
    topics
  );

  // const week1 = weeks[0];
  // console.log("week1", week1);
  // console.log(week1.emoji);
  // console.log(week1.kla);
  // console.log(week1.week);
  // console.log(week1.starts_on);
  // console.log("schedule lectures", week1.schedule_lectures());
  // console.log("schedule help_sessions", week1.schedule_help_sessions());
  // console.log("content lectures", week1.content_lectures());
  // console.log("content tutorials", week1.content_tutorials());
  // console.log(
  //   "content tutorials first one name",
  //   week1.content_tutorials()[0].name
  // );
  // console.log(
  //   "content tutorials first one relevant lectures",
  //   week1.content_tutorials()[0].content_lectures()[0].name
  // );
  // console.log("All lectures", content_lectures[1]);

  // return (
  //   <>
  //     <TutLecContentCard
  //       name={content_lectures[1].name}
  //       duration_mins={content_lectures[1].duration_mins}
  //       relevance={content_lectures[1].relevance}
  //     />
  //   </>
  // );
  console.log(topics);

  const lectures = content_lectures.slice(1);
  const originalLen = lectures.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedRelevance, setSelectedRelevance] = useState("");

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const applyFilters = () => {
    setFiltersOpen(false);
    if (filteredLectures.length !== originalLen) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  };

  const filteredLectures = useMemo(() => {
    return content_lectures.filter((lecture) => {
      const nameMatch = lecture.name
        ? lecture.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
      const weekMatch = !selectedWeek || lecture.week().week === selectedWeek;
      const topicMatch =
        !selectedTopic || lecture.topic().name === selectedTopic;
      const relevanceMatch =
        !selectedRelevance || lecture.relevance === selectedRelevance;

      return nameMatch && weekMatch && topicMatch && relevanceMatch;
    });
  }, [
    searchQuery,
    selectedWeek,
    selectedTopic,
    selectedRelevance,
    content_lectures,
  ]);

  return (
    <>
      <Stack
        alignItems="flex-end"
        direction="row"
        flexWrap="wrap"
        gap={2}
        borderRadius="sm"
      >
        <FormControl sx={{ flex: 2 }} size="sm">
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            startDecorator={<FilterListIcon />}
            variant={isFiltered ? "contained" : "outlined"}
            size="sm"
            onClick={toggleFilters}
          >
            Filter
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
              <InputLabel id="week-select-label">Week</InputLabel>
              <Select
                labelId="week-select-label"
                value={selectedWeek}
                onChange={(event) => setSelectedWeek(event.target.value)}
                label="Week"
              >
                <MenuItem value="">None</MenuItem>
                {weeks.map((week) => (
                  <MenuItem key={week.week} value={week.week}>
                    {week.week}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="topic-select-label">Topic</InputLabel>
              <Select
                labelId="topic-select-label"
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                label="Topic"
              >
                <MenuItem value="">None</MenuItem>
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
                value={selectedRelevance}
                onChange={(event) => setSelectedRelevance(event.target.value)}
                label="Relevance"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Mandatory">Mandatory</MenuItem>
                <MenuItem value="Catchup">Catchup</MenuItem>
                <MenuItem value="Recommended">Recommended</MenuItem>
                <MenuItem value="Extension">Extension</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={toggleFilters}>
                Cancel
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
