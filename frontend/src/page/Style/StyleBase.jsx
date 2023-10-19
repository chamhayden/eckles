import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoopIcon from "@mui/icons-material/Loop";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import PaletteIcon from "@mui/icons-material/Palette";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";

import SubNavWrapper from "../../component/SubNavWrapper";
import makePage from "../../component/makePage";

import { Context, useContext } from "../../context";

const HelpResources = ({}) => {
	const { getters } = useContext(Context);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (pathname.endsWith("/style")) {
			navigate(`/${getters.term}/style/html`);
		}
	}, []);

	const menu = [
		{
			title: "HTML",
			icon: <CodeIcon />,
			subRoute: "html",
		},
		{
			title: "CSS",
			icon: <PaletteIcon />,
			subRoute: "css",
		},
		{
			title: "Javascript",
			icon: <BuildIcon />,
			subRoute: "javascript",
		},
		{
			title: "ReactJS",
			icon: <LoopIcon />,
			subRoute: "reactjs",
		},
	];

	return (
		<SubNavWrapper baseUrl={"/style"} menu={menu}>
			<Outlet />
		</SubNavWrapper>
	);
};

export default HelpResources;
