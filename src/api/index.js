import axios from 'axios';

const { getAllLinks,
  getLinkById,
  createLink,
  createTag } = require('../db')

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

