import axios from 'axios';

const {   getAllLinks,
  getLinkById,
  getLinksByTagName,
  createLink,
  updateLink,
  deleteLink,
  createTags,
  getAllTags,
  createLinkTag,
  addTagsToLinks,
  deleteTag } = require('../db')

  

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

