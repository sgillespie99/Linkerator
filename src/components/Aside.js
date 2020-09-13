import React, { useState } from 'react';

import { createLink } from '../api'

import './Aside.css';

const Aside = (props) => {

	const [comment, setComment] = useState(' ')
	const [url, setUrl] = useState(' ')
	const [tags, setTags] = useState(' ')

	function handleComment(event) {
		setComment(event.target.value)
	}

	function handleUrl(event) {
		setUrl(event.target.value)
	}

	function handleTags(event) {
		setTags(event.target.value)
	}

	async function setLink(event) {
		event.preventDefault()
		console.log('creating link')
		const newLink = await createLink({
			url, comment, tags
		})
		console.log("newLink", newLink);
		props.setNewLink(newLink)
	}

	return (
		<div id="linkCreator">
			<h1>Create Link</h1>
			<form>
				<fieldset>
					<label>URL:
					<input
							type="text"
							className="makeURL"
							placeholder="Enter URL"
							value={url}
							onChange={handleUrl}>

						</input>
					</label>
				</fieldset>
				<fieldset>
					<label>Comments:
					<textarea
							type="text"
							className="makeComment"
							placeholder="Enter comments"
							value={comment}
							onChange={handleComment}
						></textarea>
					</label>
				</fieldset>
				<fieldset>
					<label>Tags:
					<textarea
							type="text"
							className="makeTags"
							placeholder="Enter Tags"
							value={tags}
							onChange={handleTags}
						></textarea>
					</label>
				</fieldset>
				<div>
					<button className="formBut" onClick={setLink}>
						<img className="formBut" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/854871cc-dca1-4f59-b4e9-8a8c697d0dd2/dcag3u4-82a658bc-2321-434d-8bf0-114f4ec80756.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODU0ODcxY2MtZGNhMS00ZjU5LWI0ZTktOGE4YzY5N2QwZGQyXC9kY2FnM3U0LTgyYTY1OGJjLTIzMjEtNDM0ZC04YmYwLTExNGY0ZWM4MDc1Ni5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.m-ensK3n91aiMaApG2leu10h4Wzy-qAWiI8zX2dekAg" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Aside;
