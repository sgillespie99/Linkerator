import React from 'react';

import { getLinks } from '../api';

import './Results.css';

import Link from './Link';



// const resultLinks = await getLinks({
//     url,
//     comment
// })

const Results = ({ results, linkList }) => {
	// if (results) {
	//     return (
	//         <div className='resultsBlock'>
	//             {
	//                 results.map(result => (
	//                     <Link key={result.id} {...result} />
	//                 ))
	//             }
	//         </div>
	//     )
	// } else {
	console.log(linkList);

	return (
		<div className="resultsBlock">
			<div className="scrollBar">
				{linkList.map((link) => (
					<Link key={link.id} {...link} />
				))}
			</div>
		</div>
	);
	// }
};

export default Results;
