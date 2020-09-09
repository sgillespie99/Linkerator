import axios from 'axios';
  
// can use local host to start before deploying to heroku: http://localhost:3000/api/
const client = '/'

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks(){
  try {
    const { data } = await axios.get(`${ client }/links`)
    return data
  } catch (error) {
    throw error
  }
}

export async function getTags(){
  try {
    const { data } = await axios.get(`${client}/tags`)
    return data
  } catch (error) {
    throw error
  }
}


export async function getLinksById(id){
  try {
    const { data } = await axios.get(`${client}/links/${ id }`)
  } catch (error) {
    
  }
}


