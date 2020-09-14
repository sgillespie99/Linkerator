import React from 'react';

import './Link.css';

const Link = ({ url, comment, click_count, tags }) => {
	return (
		<div id="Link">
			<div className="linkHead">
				<h4>URL:
					<span> </span>
					<a href={url} className="urlName">{url}</a>
				</h4>
				<span className="visited">
					<h4>Visited:</h4>
					<p className="clickCount">{click_count}</p>
				</span>
			</div>
			<div className="linkContain">
				<div className="linkBody">
					<div className="commentsBody">
						<h4>Comments:</h4>
						<p className="linkComment">{comment}</p>
					</div>
					<div className="tagsBody">
						<h4>Tags:</h4>
						<p className="linkTags">{tags.map((t) => t.tag_name).join(' ')}</p>
					</div>
				</div>
				<div className="linkUtils">
					<button className="editBut">EDIT</button>
					<button className="deleteBut">DELETE</button>
				</div>
			</div>
		</div>
	);
};

export default Link;
