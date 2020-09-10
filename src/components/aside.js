import React, { useState, useEffect } from 'react';

import './aside.css';

const Aside = () => {
	return (
		<div id="linkCreator">
			<h1>Create Link</h1>
			<form>
				<fieldset>
					{/* <label for=”makeURL”> URL:      */}
					<input
						type="text"
						className="makeURL"
						placeholder="Enter URL"
					></input>
					<input
						type="text"
						classname="makeComment"
						placeholder="Enter comments"
					></input>
					<input
						type="text"
						classname="makeTags"
						placeholder="Enter Tags"
					></input>
				</fieldset>
			</form>
		</div>
	);
};

export default Aside;
