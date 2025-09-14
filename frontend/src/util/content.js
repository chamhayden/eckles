import { apiCall } from "./api";
import { joinSchema } from "../config";
import { useState, useMemo, useCallback, useEffect } from "react";

/* Genius or madness */
// Join content from Airtable
const joinContent = (content) => {
  const forum = content.forum; // HACK
  content.forum = undefined;
  const newContent = {};
  for (const table in content) {
    newContent[table] = [];
    for (const recordKey in content[table]) {
      newContent[table].push(content[table][recordKey]);
    }
    for (const row of newContent[table]) {
      for (const cellKey in row) {
        const joinInfo = joinSchema[table]["joins"][cellKey];
        if (joinInfo) {
          const [otherTable, atomic] = joinInfo;
          row[cellKey] = ((thisCell, otherTable, atomic) => {
            return () => {
              if (atomic) {
                return content[otherTable][thisCell[0]];
              } else {
                return thisCell.map((cell) => content[otherTable][cell]);
              }
            };
          })(row[cellKey], otherTable, atomic);
        }
      }
    }
  }
  newContent.weeks = newContent.weeks.sort((a, b) =>
    parseInt(a.week) > parseInt(b.week)
      ? 1
      : parseInt(b.week) > parseInt(a.week)
      ? -1
      : 0
  );
  return {
    ...newContent,
    forum: forum,
  };
};

// Load content from Airtable
export const loadContent = (term, loggedIn = false) => {
  return apiCall("content/" + (loggedIn ? "full" : "public"), { term })
    .then((rawContent) => joinContent(rawContent))
    .catch((err) => {
      console.log(err);
    });
};

// Get Youtube code from URL
export const getYoutubeCodeFromUrl = (code) => code.slice(code.length - 11);

// Relevance options
export const RELEVANCE = {
  mandatory: {
    colour: "rgb(200,255,200)",
    alert: "We require that you watch this lecture.",
    select: "I want to do the bare minimum",
  },
  catchup: {
    colour: "rgb(200,200,255)",
    alert:
      "These are COMP1531 lectures for postgrads who want to catch up on some core assumed content.",
  },
  recommended: {
    colour: "rgb(255,200,255)",
    alert:
      "You will survive without watching this, but we recommend that a typical student should watch.",
    select: "I want to work hard but not go over the top",
  },
  extension: {
    colour: "rgb(255,200,200)",
    alert:
      "You will be completely fine without watching this - no issues at all! This is just for the keen beans with spare time or a lot curiosity",
    select: "I want to learn everything",
  },
};

// Dark relevance options
export const DARK_RELEVANCE = {
  mandatory: {
    colour: "rgb(85,148,85)",
  },
  catchup: {
    colour: "rgb(123, 123, 181)",
  },
  recommended: {
    colour: "rgb(142, 82, 142)",
  },
  extension: {
    colour: "rgb(187,129,129)",
  },
};

// ====================
// Search Utilities
// ====================

// Search filter constants
export const DEFAULT_LECTURE_FILTERS = {
  selectedTopic: "All",
  selectedRelevance: "workHard",
  completedCOMP1531: true,
  showLiveLectures: false,
  showPastWeeks: false,
};

export const DEFAULT_TUTORIAL_FILTERS = {
  selectedTopic: "All",
  selectedRelevance: "workHard",
  showPastWeeks: false,
};

// Relevance mappings
export const RELEVANCE_MAPPINGS = {
  lectures: {
    with_comp1531: {
      bareMinimum: ["Mandatory"],
      workHard: ["Mandatory", "Recommended"],
      learnEverything: ["Mandatory", "Recommended", "Extension"],
    },
    without_comp1531: {
      bareMinimum: ["Catchup", "Mandatory"],
      workHard: ["Catchup", "Mandatory", "Recommended"],
      learnEverything: ["Catchup", "Mandatory", "Recommended", "Extension"],
    },
  },
  tutorials: {
    bareMinimum: ["🟢 COMPULSORY"],
    workHard: ["🟢 COMPULSORY", "🔵 REFINING"],
    learnEverything: ["🟢 COMPULSORY", "🔵 REFINING", "🟠 EXTENDED"],
  },
};

// Custom hook for localStorage state management
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeStoredValue = useCallback(() => {
    try {
      setValue(defaultValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, removeStoredValue];
};

// Helper function to check if filters are active
export const checkIfFiltered = (filters, defaultFilters) => {
  return Object.keys(defaultFilters).some(
    (key) => filters[key] !== defaultFilters[key]
  );
};

// Helper function to get relevance options for lectures
export const getLectureRelevanceOptions = (
  completedCOMP1531,
  selectedRelevance
) => {
  const mapping = completedCOMP1531
    ? RELEVANCE_MAPPINGS.lectures.with_comp1531
    : RELEVANCE_MAPPINGS.lectures.without_comp1531;

  return mapping[selectedRelevance] || mapping.workHard;
};

// Helper function to get relevance options for tutorials
export const getTutorialRelevanceOptions = (selectedRelevance) => {
  return (
    RELEVANCE_MAPPINGS.tutorials[selectedRelevance] ||
    RELEVANCE_MAPPINGS.tutorials.workHard
  );
};

// Generic filtering function for lectures
export const filterLectures = (
  lectures,
  filters,
  searchQuery,
  selectedWeek,
  currentWeek
) => {
  const relevanceOptions = getLectureRelevanceOptions(
    filters.completedCOMP1531,
    filters.selectedRelevance
  );

  return lectures.filter((lecture) => {
    // Name/search filtering
    const nameMatch = lecture.name
      ? lecture.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    // Week filtering
    const lectureWeek = lecture.week().week;
    const weekMatch = (() => {
      if (selectedWeek !== "All") return lectureWeek === selectedWeek;
      if (filters.showPastWeeks) return true;
      return lectureWeek >= currentWeek - 1;
    })();

    // Topic filtering
    const topicMatch =
      filters.selectedTopic === "All" ||
      lecture.topic().name === filters.selectedTopic;

    // Relevance filtering
    const relevanceMatch = relevanceOptions.includes(lecture.relevance);

    // Live lecture filtering
    const liveLectureMatch =
      !filters.showLiveLectures || lecture.status === "🔴 NEW";

    return (
      nameMatch && weekMatch && topicMatch && relevanceMatch && liveLectureMatch
    );
  });
};

// Generic filtering function for tutorials
export const filterTutorials = (
  tutorials,
  filters,
  searchQuery,
  selectedWeek,
  currentWeek
) => {
  const relevanceOptions = getTutorialRelevanceOptions(
    filters.selectedRelevance
  );

  return tutorials.filter((tutorial) => {
    // Name/search filtering
    const nameMatch = tutorial.name
      ? tutorial.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    // Week filtering
    const tutorialWeek = tutorial.week().week;
    const weekMatch = (() => {
      if (selectedWeek !== "All") return tutorialWeek === selectedWeek;
      if (filters.showPastWeeks) return true;
      return tutorialWeek >= currentWeek - 1;
    })();

    // Topic filtering
    const topicMatch =
      filters.selectedTopic === "All" ||
      tutorial.topic().name === filters.selectedTopic;

    // Relevance filtering
    const relevanceMatch = relevanceOptions.includes(tutorial.importance);

    return nameMatch && weekMatch && topicMatch && relevanceMatch;
  });
};

// Custom hook for search functionality
export const useSearchFilters = (type, storagePrefix = "") => {
  const defaultFilters =
    type === "lectures" ? DEFAULT_LECTURE_FILTERS : DEFAULT_TUTORIAL_FILTERS;

  // State management with localStorage hooks
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useLocalStorage(
    `${storagePrefix}Week`,
    "All"
  );
  const [viewMode, setViewMode] = useLocalStorage("viewMode", "list");
  const [filters, setFilters, resetStoredFilters] = useLocalStorage(
    `${storagePrefix}Filters`,
    defaultFilters
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync tempFilters when filters change (e.g., when loaded from localStorage)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // Computed values
  const isFiltered = useMemo(
    () => checkIfFiltered(filters, defaultFilters),
    [filters, defaultFilters]
  );

  // Event handlers
  const toggleFilters = useCallback(() => {
    setFiltersOpen(!filtersOpen);
  }, [filtersOpen]);

  const handleResetFilters = useCallback(() => {
    resetStoredFilters();
    setTempFilters(defaultFilters);
    setFiltersOpen(false);
  }, [resetStoredFilters, defaultFilters]);

  const handleApplyFilters = useCallback(() => {
    setFilters(tempFilters);
    setFiltersOpen(false);
  }, [tempFilters, setFilters]);

  const handleWeekChange = useCallback(
    (event) => {
      const value = event.target.value;
      setSelectedWeek(value === "All" ? "All" : parseInt(value, 10));
    },
    [setSelectedWeek]
  );

  const handleViewModeToggle = useCallback(() => {
    const newMode = viewMode === "grid" ? "list" : "grid";
    setViewMode(newMode);
  }, [viewMode, setViewMode]);

  return {
    // State
    searchQuery,
    setSearchQuery,
    selectedWeek,
    viewMode,
    filters,
    filtersOpen,
    tempFilters,
    setTempFilters,
    isFiltered,

    // Handlers
    toggleFilters,
    handleResetFilters,
    handleApplyFilters,
    handleWeekChange,
    handleViewModeToggle,
  };
};

// Common modal styles
export const MODAL_STYLES = {
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
};
