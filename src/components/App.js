import React, { useState, useEffect } from 'react';

import { getSomething, getLinks } from '../api';

import './App.css';

import Aside from './Aside';
import Header from './Headers';
import Results from './Results';

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
			<div className="feature">
				<Results />
				<Aside />
			</div>
			{/* <h2>{message}</h2> */}
		</div>
	);
};

export default App;
