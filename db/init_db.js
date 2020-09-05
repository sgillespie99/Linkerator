// code to build and initialize DB goes here
const {
  client,
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
  deleteTag
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    console.log('dropping tables');
    // drop tables in correct order
    await client.query(`
    DROP TABLE if exists link_tags;
    DROP TABLE if exists tags;
    DROP TABLE if exists link;`);
    // build tables in correct order

    console.log("building tables");



    await client.query(`CREATE TABLE link(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE NOT NULL,
    comment TEXT NOT NULL,
    click_count INTEGER DEFAULT 0);`);

    console.log('finished building link')

    await client.query(`
    CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    tag_name varchar(255) UNIQUE NOT NULL);
    `);

    console.log('finished building tags');

    await client.query(`
    CREATE TABLE link_tags(
      id SERIAL PRIMARY KEY,
    "linkId" INTEGER REFERENCES link(id),
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("linkId", "tagId")
    );`);

    console.log('finished building link_tags');

    console.log("finished building tables");

  } catch (error) {
    console.log('Error building tables!');
    throw error;
  }
}


// Initial data functions:
async function createInitialLinks() {
  try {
    console.log('Creating Initial Links');
    await createLink({
      url: 'https://i.imgflip.com/2nh106.jpg',
      comment: 'Ohh the irony!!',
      tags: ["#meme", "#link", "#rupees"]
    });

    await createLink({
      url: 'https://i.imgflip.com/3sm7ym.jpg',
      comment: 'True Intentions',
      tags: ["#meme", "#link", "#zelda", "#pots"]
    });

    await createLink({
      url: 'https://static2.thegamerimages.com/wordpress/wp-content/uploads/2020/06/Legend-of-Zelda-Breath-of-the-Wild-Meme-Feature.jpg',
      comment: 'Gotta find em all!',
      tags: ["#meme", "#link", "#zelda", "#korok", "#goron"]
    });

    await createLink({
      url: 'https://i.ytimg.com/vi/Td_8eY7Zxls/maxresdefault.jpg',
      comment: '"You know nothing Jon Snow" -Ygrette, GoT',
      tags: ["#meme", "#link", "#zelda"]
    });

    await createLink({
      url: 'https://img.memecdn.com/legend-of-zelda_o_332484.jpg',
      comment: 'Sike',
      tags: ["#meme", "#link", "#rupees"]
    });

    console.log('Finished Initial Links');
  } catch (error) {
    console.log('Error Initial Links');
    throw error
  }
}

async function populateInitialData() {
  try {
    console.log("Creating Initial Data...");
    await createInitialLinks();

    console.log("Finished creating Initial Data!");
  } catch (error) {
    console.log("Error creating Initial Data");
    throw error;
  }
}

async function testDb() {
  try {
    console.log('Testing Database');

    console.log('calling getAllLinks')
    const links = await getAllLinks();
    console.log('getAllLinks:', links)

    console.log('calling getLinkById')
    const linkById = await getLinkById(1)
    console.log('getLinkById:', linkById)

    console.log("calling getLinksByTagName...");
    const linksWithZelda = await getLinksByTagName("#zelda");
    console.log("Finished getLinksByTagName:", linksWithZelda);

    console.log('updatingLink[1]...', links[0]);
    const updatedLink = await updateLink(links[0].id, {
      comment: "Shots Fired!",
      tags: ['#inventory', '#meme', '#link']
    });
    console.log('Successfully updatedLink[1]', updatedLink);

    console.log("Deleting Link[4].id (id: 5):", links[4]);
    const deletedLink = await deleteLink(links[4].id);
    console.log("Finished Deleting Link");

    console.log('calling getAllTags')
    const tags = await getAllTags();
    console.log('getAllTags:', tags)

    console.log("Deleting Tag : #rupees", tags[2]);
    const deletedTag = await deleteTag(tags[2].id);
    console.log("Finished Deleting Tag", deletedTag);

    console.log("Finished Testing Database");
  } catch (error) {
    console.log("Error testing Database!");
    throw error
  }
}

buildTables()
  .then(populateInitialData)
  .then(testDb)
  .catch(console.error)
  .finally(() => client.end());