import React from 'react';

import './Link.css';

const Link = ({ url, comment, click_count, tags }) => {
	return (
		<div id="Link">
			<div className="linkHead">
				<a href={url} className="urlName">{url}</a>
				<p className="clickCount">{click_count}</p>
			</div>
			<div className="linkBody">
				<p className="linkComment">{comment}</p>
				<p className="linkTags">{tags.map((t) => t.tag_name).join(' ')}</p>
			</div>
			<div className="linkUtils">
				<button>Edit</button>
				<button>Delete</button>
			</div>
		</div>
	);
};

export default Link;
