const apiRouter = require('express').Router();

const {
	getAllLinks,
	getLinkById,
	getLinksByTagName,
	createLink,
	updateLink,
	deleteLink,
	createTags,
	getAllTags,
	createLinkTag,
	addTagsToLinks,
	deleteTag,
} = require('../db');

// LINKS

apiRouter.get('/links', async (req, res, next) => {
	try {
		// words
		const links = await getAllLinks();
		console.log('sebastian', links);

		res.send({
			links,
		});
	} catch ({ name, message }) {
		next({ name, message });
	}
});

apiRouter.post('/links', async (req, res, next) => {
	const { url, comment, tags = '' } = req.body;

	const tagArr = tags.trim().split(/\s+/);
	const linkData = {};

	if (tagArr.length) {
		linkData.tags = tagArr;
	}

	try {
		linkData.url = url;
		linkData.comment = comment;

		const newLink = await createLink(linkData);

		if (newLink) {
			res.send(newLink);
		} else {
			next({
				name: 'Link Creation Error',
				message: 'Error creating your link',
			});
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});

apiRouter.patch('/links/:id', async (req, res, next) => {
	const { id } = req.params;
	const { url, comment, tags } = req.body;

	const updateFields = {};

	if (tags && tags.length > 0) {
		updateFields.tags = tags.trim().split(/\s+/);
	}

	if (url) {
		updateFields.url = url;
	}

	if (comment) {
		updateFields.comment = comment;
	}

	try {
		const updatedLink = await updateLink(id, updateFields);
		if (updatedLink) {
			res.send({ link: updatedLink });
		} else {
			next({
				name: 'Link Update Error',
				message: ' An error occured while updating the link.',
			});
		}
	} catch ({ name, message }) {
		name({ name, message });
	}
});

apiRouter.delete('/links/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const link = await getLinkById(id);
		if (link) {
			const deletedLink = await deleteLink(link.id);

			res.send({
				message: deletedLink,
			});
		} else {
			next({
				name: 'Error deleting link',
				message: 'The link id does not exist!',
			});
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});

// TAGS

apiRouter.get('/tags', async (req, res, next) => {
	try {
		const tags = await getAllTags();

		res.send({ tags });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

apiRouter.get('/:tagName/links', async (req, res, next) => {
	const { tagName } = req.params;
	try {
		const links = await getLinksByTagName(tagName);

		res.send({ links });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

apiRouter.delete('/tags/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedTag = await deleteTag(id);

		res.send({ deletedTag });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

apiRouter.get('/', (req, res, next) => {
	res.send({
		message: 'API is under construction!',
	});
});

apiRouter.use((error, req, res, next) => {
	res.send(error);
});

module.exports = apiRouter;

// TESTING POSTS

// curl http://localhost:5000/api/links
// curl http://localhost:5000/api/links -H "Content-Type: application/json" -X POST -d '{"url": "https://memegenerator.net/img/instances/75987203/youve-followed-a-broken-link.jpg", "comment": "Broken Link", "tags": "#meme #link #broken"}'
// curl http://localhost:5000/api/links/14 -X PATCH -H 'Content-Type: application/json' -d '{"comment": "Broken Link", "tags": "#meme, #link, #broken, #funny"}'
// curl http://localhost:5000/api/links/14 -X DELETE

// TESTING TAGS

// curl http://localhost:5000/api/tags
// curl http://localhost:5000/api/%23zelda/links
// curl http://localhost:5000/api/tags/28 -X DELETE
