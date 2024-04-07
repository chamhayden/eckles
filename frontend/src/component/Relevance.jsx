import { RELEVANCE, DARK_RELEVANCE } from '../util/content';
import { Context, useContext } from '../context';
import React from 'react';

const Relevance = ({ category }) => {

	const { getters, setters } = useContext(Context);

	return <div
		style={{
			background: getters.isDark ? DARK_RELEVANCE[category.toLowerCase()].colour : RELEVANCE[category.toLowerCase()].colour,
			cursor: 'pointer',
			textAlign: 'center',
			fontWeight: 'bold',
			padding: '3px 8px'
		}}
		onClick={() => {
			alert(RELEVANCE[category.toLowerCase()].alert)
		}}
	>
		{category}
	</div>;
}

export default Relevance;