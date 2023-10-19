import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const Body = (props) => {
	return (
		<Typography {...props} variant="body1" style={{ padding: "10px 0" }}>
			{props.children}
		</Typography>
	);
};

export const H3 = (props) => {
	return (
		<Typography
			id={props.id}
			{...props}
			variant="h4"
			component="div"
			gutterBottom
		>
			{props.children}
		</Typography>
	);
};

export const H5 = (props) => {
	return (
		<Typography
			id={props.id}
			{...props}
			variant="h5"
			component="div"
			gutterBottom
		>
			{props.children}
		</Typography>
	);
};

export const HR = () => {
	return <Divider sx={{ mb: 3, mt: 3 }} />;
};

export const Code = (props) => {
	/*<div style={{ maxWidth: props.large ? '100%' : props.medium ? '800px' : '500px' }}>*/

	// All code elements in this div will have a background color of transparent
	return (
		<Box sx={{ maxWidth: "800px", code: { bgcolor: "transparent" } }}>
			<SyntaxHighlighter style={a11yDark} language={props.lang}>
				{props.children}
			</SyntaxHighlighter>
		</Box>
	);
};

export const Example = (props) => (
	<ExampleAccordionWrapper title={props.title}>
		{props.bads &&
			props.bads.map((bad, idx) => {
				return (
					<React.Fragment key={`bad-${idx}`}>
						<Body tyle={{ paddingTop: "20px" }} key={idx}>
							<b>🔴 Bad</b>
						</Body>
						<Code lang={props.lang} large={props.large} medium={props.medium}>
							{bad}
						</Code>
					</React.Fragment>
				);
			})}
		{props.goods &&
			props.goods.map((good, idx) => {
				return (
					<React.Fragment key={`good-${idx}`}>
						<Body style={{ paddingTop: "20px" }}>
							<b>🟢 Good</b>
						</Body>
						<Code lang={props.lang} large={props.large} medium={props.medium}>
							{good}
						</Code>
					</React.Fragment>
				);
			})}
	</ExampleAccordionWrapper>
);

export const ExampleImages = ({ title, srcArray = [] }) => (
	<ExampleAccordionWrapper title={title}>
		{srcArray.map((asset, idx) => (
			<CaptionedImage
				src={asset.src}
				alt={`Example #${idx + 1}`}
				caption={asset.caption}
				key={`Example #${idx + 1}`}
			/>
		))}
	</ExampleAccordionWrapper>
);

const ExampleAccordionWrapper = ({ children, title = "Example" }) => {
	const [expand, setExpand] = React.useState(false);

	return (
		<Box
			sx={{
				boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px",
				borderRadius: "15px",
			}}
			my={2}
		>
			<Box
				sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
				p={1}
				onClick={() => setExpand(!expand)}
			>
				<ExpandLessIcon
					style={{
						rotate: expand ? "180deg" : "0deg",
						transition: "rotate 0.1s ease-in-out",
					}}
				/>
				<Body>
					<b>{`💡 ${title}:`} </b>
				</Body>
			</Box>
			<Collapse in={expand} unmountOnExit>
				<Box component="hr" m={0} />
				<Box p={2} pl={3}>
					{children}
				</Box>
			</Collapse>
		</Box>
	);
};

const CaptionedImage = ({ src, alt, caption }) => (
	<Box component="figure" m={0} mb={4}>
		<Box component="img" src={src} alt={alt} maxWidth="700px" width="100%" />
		<Typography component="figcaption">
			<i>{caption ?? ""}</i>
		</Typography>
	</Box>
);
