import axios from 'axios';

// can use local host to start before deploying to heroku: http://localhost:3000/api/
const client = 'http://localhost:5000/api';

export async function getSomething() {
	try {
		const { data } = await axios.get(client);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getLinks() {
	try {
		const { data } = await axios.get(`${client}/links`);
		console.log(data);
		return data.links;
	} catch (error) {
		throw error;
	}
}

export async function getTags() {
	try {
		const { data } = await axios.get(`${client}/tags`);
		return data.tags;
	} catch (error) {
		throw error;
	}
}


export async function getLinksById(id) {
	try {
		const { data } = await axios.get(`${client}/links/${id}`);
	} catch (error) { }
}


export async function createLink({ url, comment, tags = [] }) {
	try {
		const { data } = await axios.post(`${client}/links`, {
			url: url, comment: comment, tags: tags
		})
		return data
	} catch (error) {
		throw error
	}
}