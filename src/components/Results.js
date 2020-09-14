import React from 'react';

import './Results.css';

import Link from './Link';


const Results = ({ results, linkList }) => {
	return (
		<div className="resultsBlock">

			<div className="scrollBar">
				{linkList.map((link) => (
					<Link key={link.id} {...link} />
				))}
			</div>
		</div>
	);
};

export default Results;
