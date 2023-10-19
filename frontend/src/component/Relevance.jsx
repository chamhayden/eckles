import { RELEVANCE } from "../util/content";

const Relevance = ({ category }) => {
	return (
		<div
			style={{
				background: RELEVANCE[category.toLowerCase()].colour,
				cursor: "pointer",
				textAlign: "center",
				fontWeight: "bold",
				padding: "3px 8px",
			}}
			onClick={() => {
				alert(RELEVANCE[category.toLowerCase()].alert);
			}}
		>
			{category}
		</div>
	);
};

export default Relevance;
