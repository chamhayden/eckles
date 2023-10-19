import React from "react";
import Typography from "@mui/material/Typography";

import makePage from "../../component/makePage";

const ResourcesReact = ({}) => {
	return (
		<>
			<Typography variant="h5" component="div" gutterBottom>
				ReactJS General
			</Typography>
			<Typography variant="body1" gutterBottom>
				<ul>
					<li>
						<a
							target="_blank"
							href="https://github.com/airbnb/javascript/tree/master/react"
						>
							Airbnb Style Guide
						</a>
						. This is a great introductory style guide to ReactJS due to it's
						very strict nature. This can help develop good practices (source:
						Hayden Smith).
					</li>
					<li>
						<a target="_blank" href="https://scrimba.com/course/glearnreact">
							Scrimba Learn React
						</a>
						. Another product out there helping you teach yourself how to build
						apps with ReactJS (source: Unknown).
					</li>
					<li>
						LinkedIn learning is available to UNSW students for free and has
						great courses involving ReactJS (source: Hayden Smith).
					</li>
				</ul>
			</Typography>
			<Typography variant="h5" component="div" gutterBottom>
				ReactJS If Hot Reload is not working
			</Typography>
			<Typography variant="h6" component="div" gutterBottom>
				Solution 1
			</Typography>
			<Typography variant="body1" gutterBottom>
				As mentioned by Soorria, try running the React project from a directory
				that is not /mnt. For simplicity, you can move the project to a common
				area such as ~ (run cd ~ to get here). Restart the terminal and then try
				to install and run the project.
			</Typography>
			<Typography variant="h6" component="div" gutterBottom>
				Solution 2
			</Typography>
			<Typography variant="body1" gutterBottom>
				If solution 1 does not work you can try the following:
				<ul>
					<li>
						Open another terminal such as Windows Powershell as Administrator.
					</li>
					<li>
						Ensure that node is installed with <code>node -v</code>.
					</li>
					<li>
						If the node command was not found, then install node{" "}
						<a href="https://nodejs.org/en/download/" target="_blank">
							here
						</a>
						.
					</li>
					<li>
						After successfully installing node and npm, ensure that yarn is
						intalled with <code>yarn -v</code>.
					</li>
					<li>
						If the yarn command was not found, then install yarn with{" "}
						<code>npm install --global yarn</code>.
					</li>
					<li>
						Navigate to the frontend directory and do <code>yarn install</code>{" "}
						then do <code>yarn start</code>.
					</li>
				</ul>
			</Typography>
		</>
	);
};

export default makePage(ResourcesReact, {
	loginRequired: true,
	title: "ReactJS Resources",
});
