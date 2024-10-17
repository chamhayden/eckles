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

const ContentTutorials = ({}) => {
  const menu = [
    {
      title: "By Week",
      icon: <TheatersIcon />,
      subRoute: "week",
    },
    {
      title: "By Topic",
      icon: <SchoolIcon />,
      subRoute: "topic",
    },
  ];

  return (
    <SubNavWrapper baseUrl={"/content/tutorials"} menu={menu}>
      <Outlet />
    </SubNavWrapper>
  );
};

export default ContentTutorials;
