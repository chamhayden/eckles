import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import SetOfTables from "../../component/SetOfTables";
import { Context, useContext } from "../../context";
import { isHalfScreenWidth, isTinyMobileWidth } from "../../util/screen";
import YoutubePlaylistButton from "../../component/YoutubePlaylistButton";
import makePage from "../../component/makePage";
import { generateContent } from "./ContentLectures.content";

const ContentLecturesByWeek = ({}) => {
	const { getters } = useContext(Context);
	const boxes = generateContent(getters, "week");

	return (
		<>
			<YoutubePlaylistButton />
			<SetOfTables boxes={boxes} lectures />
		</>
	);
};

export default makePage(ContentLecturesByWeek, {
	loginRequired: true,
	title: "Lecture Content (by week)",
});
