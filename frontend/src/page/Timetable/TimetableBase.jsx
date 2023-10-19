import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheatersIcon from "@mui/icons-material/Theaters";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Outlet } from "react-router-dom";

import SubNavWrapper from "../../component/SubNavWrapper";
import makePage from "../../component/makePage";

const Timetable = ({}) => {
	const menu = [
		{
			title: "Lectures",
			icon: <TheatersIcon />,
			subRoute: "lectures",
		},
		{
			title: "Tutorials",
			icon: <SchoolIcon />,
			subRoute: "tutorials",
		},
		{
			title: "Help Sessions",
			icon: <LocalHospitalIcon />,
			subRoute: "help-sessions",
		},
	];

	return (
		<SubNavWrapper baseUrl={"/timetable"} menu={menu}>
			<Outlet />
		</SubNavWrapper>
	);
};

export default makePage(Timetable, {
	loginRequired: false,
	title: "Timetable",
});
