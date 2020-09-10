import React, { useState, useEffect } from 'react';

import './Headers.css';

let Header = () => {
	return (
		<div className="headerBlock">
			<div className="title">
				<h1>Link's Awakening!</h1>
			</div>
			<div className="searchBlock">
				<fieldset>
					<input type="text" placeholder="Search by Tag"></input>
				</fieldset>
				<button>Search</button>
			</div>
		</div>
	);
};

export default Header;
