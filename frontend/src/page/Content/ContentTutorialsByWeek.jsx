import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import makePage from "../../component/makePage";
import SetOfTables from "../../component/SetOfTables";
import { Context, useContext } from "../../context";
import { isTinyMobileWidth } from "../../util/screen";
import { generateContent } from "./ContentTutorials.content";

const ContentTutorialsByWeek = ({}) => {
	const { getters } = useContext(Context);
	const boxes = generateContent(getters, "week");

	return <SetOfTables boxes={boxes} />;
};

export default makePage(ContentTutorialsByWeek, {
	loginRequired: true,
	title: "Tutorial Content (By Week)",
});
