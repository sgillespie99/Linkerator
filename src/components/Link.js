import React from 'react';

import './Link.css';

const Link = ({
    url,
    comment,
    click_count,
    tags
}) => {
    return (
        <div id="Link">
            <div className="linkHead">
                <p className="urlName">{url}</p>
                <p className="clickCount">{click_count}</p>
            </div>
            <div className="linkBody">
                <p className="linkComment">{comment}</p>
                <p className="linkTags">{tags}</p>
            </div>
            <div className="linkUtils">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Link;