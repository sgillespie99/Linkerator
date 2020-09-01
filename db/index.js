// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/princesszelda'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// link table
async function getAllLinks (){
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM link;
    `)

    return rows
  } catch (error) {
    throw error
  }
}

async function getLinkById(id){
  try {
    const {rows: [ link ] } = await client.query(`
    SELECT * 
    FROM link
    WHERE id = $1`, [ id ])

    return activity
  } catch (error) {
    throw error
  }
}

async function createLink ({url, comment}){
  try {
    const { rows: [ link ]} = await client.query(`
    INSERT INTO link (url, comment)
    VALUES($1, $2)
    RETURNING *;`, [url, comment])

    return link
  } catch (error) {
    throw error
  }
}

// tag table



// export
module.exports = {
  client,
  // db methods
}