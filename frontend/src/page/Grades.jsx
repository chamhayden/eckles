import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { apiCall } from "../util/api";
import makePage from "../component/makePage";
import { Context, useContext } from "../context";

const Grades = ({}) => {
	const { getters, setters } = useContext(Context);
	const [grades, setGrades] = React.useState(null);
	React.useEffect(() => {
		apiCall("grades", {
			term: getters.term,
		}).then(setGrades);
	}, []);
	if (!grades) {
		return <>Loading...</>;
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 200 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Assessment</TableCell>
						<TableCell>Mark</TableCell>
						<TableCell>Out of</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(grades).map((ass, key) => (
						<TableRow key={key}>
							<TableCell>{ass}</TableCell>
							<TableCell>{grades[ass].mark ?? "Unreleased"}</TableCell>
							<TableCell>{grades[ass].outof}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default makePage(Grades, {
	loginRequired: true,
	title: "Grades",
});
