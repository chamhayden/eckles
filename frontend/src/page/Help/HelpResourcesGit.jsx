import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Youtube from "../../component/Youtube";
import makePage from "../../component/makePage";

const ResourcesGit = ({}) => {
	return (
		<>
			<Typography variant="h5" component="div" gutterBottom>
				Git
			</Typography>
			<Typography variant="body1" gutterBottom>
				COMP6080 uses git as a method of working on and submitting assessment
				tasks. If you are not familiar with the basics of git, you are required
				to learn them.
			</Typography>
			<Typography variant="body1" gutterBottom>
				Two more in depth resources include:
				<ul>
					<li>
						<a
							target="_blank"
							href="https://www.youtube.com/playlist?list=PLbSaCpDlfd6rseEvuy6DhnuIRXjB9UHK5"
						>
							Atlassian's learn git guide
						</a>
					</li>
					<li>
						<a target="_blank" href="https://www.atlassian.com/git">
							UNSW's learn git guide
						</a>
					</li>
				</ul>
			</Typography>
			<Typography variant="body1" gutterBottom>
				If you'd like a short crash course on git, you can watch the
				introduction to git lecture from COMP1531.
			</Typography>

			<Youtube code={"A46dQSmse0g"} />
		</>
	);
};

export default makePage(ResourcesGit, {
	loginRequired: true,
	title: "Git Resources",
});
