import React, { useState, useEffect } from 'react';

import { getLinks } from '../api';

import './App.css';

import Aside from './Aside';
import Header from './Headers';
import Results from './Results';

const App = () => {
	const [linkList, setLinkList] = useState([]);
	const [results, setResults] = useState([]);
	const [newLink, setNewLink] = useState([])

	useEffect(() => {
		getLinks()
			.then(links => {
				setLinkList(links);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<div className="App">

			<Header />
			<div className="feature">
				<Results linkList={linkList}
					results={results} />
				<Aside setNewLink={setNewLink}
					setLinkList={setLinkList} />
			</div>
			{/* <h2>{message}</h2> */}
		</div>
	);
};

export default App;
