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
			<h1>
				{' '}
				
				{linkList.map((link) => (
					<Link key={link.id} {...link} />
				))}
			</h1>
		</div>
	);
	// }
};

export default Results;
