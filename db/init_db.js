// code to build and initialize DB goes here
const {
  client,
  getAllLinks,
  getLinkById,
  createLink,
  createTag,
  getAllTags
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    console.log('dropping tables')
    // drop tables in correct order
    await client.query(`
    DROP TABLE if exists link_tags;
    DROP TABLE if exists tags;
    DROP TABLE if exists link;`)
    // build tables in correct order

    console.log("building tables")

    

    await client.query(`CREATE TABLE link(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE NOT NULL,
    comment TEXT NOT NULL,
    click_count INTEGER DEFAULT 0);`)

    console.log('finished building link')

    await client.query(`
    CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    tag_name varchar(255) UNIQUE NOT NULL);
    `)

    console.log('finished building tags')

    await client.query(`
    CREATE TABLE link_tags(
    "linkId" INTEGER REFERENCES link(id),
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("linkId", "tagId")
    );`)

    console.log('finished building link_tags')

    console.log("finished building tables")

  } catch (error) {
    throw error;
  }
}


// Initial data functions:
async function createInitialLinks (){
  try {
    console.log('creating initial links')
    await createLink({ 
      url: 'https://www.google.com/',
      comment: 'the Search spot'
    })


  } catch (error) {
    throw error
  }
}

async function createInitialTags (){
  try{
    console.log('creating initial tags')
    await createTag({
      tag_name: 'words'
    })
  } catch (error){
    throw error
  }
}


async function populateInitialData() {
  try {
   await createInitialLinks()
   await createInitialTags()
  } catch (error) {
    throw error;
  }
}


async function testDb(){
try {
  console.log('testing Database')

  console.log('calling getAllLinks')
  const links = await getAllLinks();
  console.log('getAllLinks:', links)

  console.log('calling getLinkById')
  const linkById = await getLinkById(1)
  console.log('getLinkById:', linkById)

  console.log('calling getAllTags')
  const tags = await getAllTags();
  console.log('getAllTags:', tags)


} catch (error) {
  throw error
}
}

buildTables()
  .then(populateInitialData)
  .then(testDb)
  .catch(console.error)
  .finally(() => client.end());