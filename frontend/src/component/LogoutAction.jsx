import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Context, useContext } from "../context";

const LogoutAction = () => {
	const { getters, setters } = useContext(Context);
	const [cookies, setCookie, removeCookie] = useCookies();
	const navigate = useNavigate();
	React.useEffect(() => {
		removeCookie("eckles_loggedin", { path: "/" });
		removeCookie("eckles_jwt", { path: "/" });
		localStorage.removeItem("eckles_content");
		localStorage.removeItem("eckles_expiry");
		localStorage.removeItem("eckles_term");
		setters.setLoggedIn(false);
		navigate("/");
	});
	return <></>;
};

export default LogoutAction;
