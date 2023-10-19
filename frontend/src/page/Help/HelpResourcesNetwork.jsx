import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Youtube from "../../component/Youtube";
import makePage from "../../component/makePage";

const ResourcesNetwork = ({}) => {
	return (
		<>
			<Typography variant="h5" component="div" gutterBottom>
				JSON
			</Typography>
			<Typography variant="body1" gutterBottom>
				Learning about JSON as a transfer method and store of data is an
				important part of this course. If you have not completed COMP1531 at
				UNSW you may find the following lecture useful to give you the basics.
			</Typography>

			<Youtube code={"zzCxJZguxNA"} />

			<Divider sx={{ mb: 3, mt: 3 }} />

			<Typography variant="h5" component="div" gutterBottom>
				HTTP
			</Typography>
			<Typography variant="body1" gutterBottom>
				Learning about HTTP is critical for use in any assignments with
				networking components. The basics of transferring data via HTTP, in
				particular using JSON objects, is the essence of API services used in
				this course. If you haven't completed COMP1531 at UNSW, you may find the
				following lectures useful to develop your understanding. This lectures
				teach the fundamentals of HTTP and Restful APIs. Please note, these
				lectures focus on the building of the server side of networked
				applications, whereas what we learn in COMP6080 focuses on building
				frontends (the other side of the network).
			</Typography>

			<Youtube code={"MQUv0PwqjG0"} />

			<Youtube code={"JBeFZd0pIRM"} />
		</>
	);
};

export default makePage(ResourcesNetwork, {
	loginRequired: true,
	title: "Networking Resources",
});
