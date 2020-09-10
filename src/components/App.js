import React, { useState, useEffect } from 'react';

import { getSomething, getLinks } from '../api';

import './App.css';

import Aside from './aside';
import Header from './Headers';
import Results from './results';

const App = () => {
	const [message, setMessage] = useState('');

	useEffect(() => {
		getLinks()
			.then((response) => {
				console.log(response);
				setMessage(response.message);
			})
			.catch((error) => {
				setMessage(error.message);
			});
	});

	return (
		<div className="App">
			
			<Header />
			{/* <Results /> */}
			<Aside />
			{/* <h2>{message}</h2> */}
		</div>
	);
};

export default App;
