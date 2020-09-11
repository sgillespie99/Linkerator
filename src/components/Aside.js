import React, { useState, useEffect } from 'react';

import './Aside.css';

const Aside = () => {
	return (
		<div id="linkCreator">
			<h1>Create Link</h1>
			<form>
				<fieldset>
					<label for="makeUrl">URL:
					<input
							type="text"
							className="makeURL"
							placeholder="Enter URL">
						</input>
					</label>
				</fieldset>
				<fieldset>
					<label for="makeComment">Comments:
					<textarea
							type="text"
							className="makeComment"
							placeholder="Enter comments"
						></textarea>
					</label>
				</fieldset>
				<fieldset>
					<label for="makeTags">Tags:
					<textarea
							type="text"
							className="makeTags"
							placeholder="Enter Tags"
						></textarea>
					</label>
				</fieldset>
				<div>
					<button class="formBut">
						<img class="formBut" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/854871cc-dca1-4f59-b4e9-8a8c697d0dd2/dcag3u4-82a658bc-2321-434d-8bf0-114f4ec80756.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODU0ODcxY2MtZGNhMS00ZjU5LWI0ZTktOGE4YzY5N2QwZGQyXC9kY2FnM3U0LTgyYTY1OGJjLTIzMjEtNDM0ZC04YmYwLTExNGY0ZWM4MDc1Ni5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.m-ensK3n91aiMaApG2leu10h4Wzy-qAWiI8zX2dekAg" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Aside;
