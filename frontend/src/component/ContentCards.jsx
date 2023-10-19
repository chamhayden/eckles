import gradient from "random-gradient";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

// https://stackoverflow.com/questions/40958727/javascript-generate-unique-number-based-on-string
const hashCode = (str) => {
	var hash = 0,
		i,
		chr,
		len;
	if (str.length === 0) return hash;
	for (i = 0, len = str.length; i < len; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
};

const ContentCards = ({ data, minHeight }) => {
	return (
		<Box sx={{ display: "flex", gap: "20px 20px", flexWrap: "wrap" }}>
			{data.map(
				(
					{
						linkUrl,
						imageUrl,
						imageBackground,
						title,
						description,
						duration,
						staff,
						weektopic,
						label,
						labelBackground,
					},
					key,
				) => {
					const hash = hashCode(description) % 400;
					return (
						<Box
							sx={{ minWidth: "220px", flex: 1, maxWidth: "400px" }}
							key={key}
						>
							<Card sx={{ minHeight }}>
								<Link to={linkUrl}>
									{label && (
										<div
											style={{
												position: "absolute",
												width: "120px",
												height: "40px",
											}}
										>
											<div
												style={{
													padding: "5px",
													margin: "15px 0 0 15px",
													background: labelBackground,
													borderRadius: "0",
													textAlign: "center",
													boxShadow: "#333 1px 1px 3px",
												}}
											>
												{label}
											</div>
										</div>
									)}
									<CardMedia
										component="img"
										height="140"
										sx={{
											borderBottom: "1px solid #ccc",
											background: imageBackground ?? "#ccc" /*gradient(title)*/,
										}}
										image={
											imageUrl ?? `https://picsum.photos/id/${hash}/400/300`
										}
									/>
									<CardContent>
										{weektopic && (
											<Box style={{ float: "left" }}>
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ fontSize: "9pt" }}
												>
													{weektopic}
												</Typography>
											</Box>
										)}
										{duration && (
											<Box style={{ float: "right" }}>
												<Typography variant="body2" color="text.secondary">
													⏱️ {duration} mins
												</Typography>
											</Box>
										)}
										<Typography
											gutterBottom
											variant="h7"
											component="div"
											sx={{ clear: "both", paddingTop: "8px" }}
										>
											<b>{title}</b>
										</Typography>
										{staff && (
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ fontSize: "9pt", marginTop: "10px" }}
											>
												By {staff}
											</Typography>
										)}
										{description && (
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{
													fontSize: "9pt",
													marginTop: "15px",
													fontStyle: "italic",
												}}
											>
												{description}
											</Typography>
										)}
									</CardContent>
								</Link>
							</Card>
						</Box>
					);
				},
			)}
		</Box>
	);
};

export default ContentCards;
