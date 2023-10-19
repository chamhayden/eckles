import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const TitleCard = ({ children }) => {
	return (
		<Accordion
			sx={{
				marginTop: "20px !important",
				marginLeft: "auto !important",
				marginRight: "auto !important",
				minWidth: 100,
			}}
			expanded={true}
		>
			<AccordionSummary
				//expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography variant="h6">{children}</Typography>
			</AccordionSummary>
		</Accordion>
	);
};

export default TitleCard;
