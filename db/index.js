// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/princesszelda';
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
// HAHA HI KAITLYN - Sebastian was here

// database methods

// link table
async function getAllLinks() {
  try {
    const { rows: linkIds } = await client.query(`
    SELECT id
    FROM link;
    `);

    const links = await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));

    return links;
  } catch (error) {
    throw error;
  }
}

async function getLinkById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * 
    FROM link
    WHERE id = $1`,
      [id]
    );

    const { rows: tags } = await client.query(`
    SELECT tags.tag_name
    FROM tags
    JOIN link_tags ON tags.id=link_tags."tagId"
    WHERE link_tags."linkId"=$1;
    `, [id]);

    link.tags = tags;

    return link;
  } catch (error) {
    throw error;
  }
}

async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(`
    SELECT link.id
    FROM link
    JOIN link_tags ON link.id=link_tags."linkId"
    JOIN tags ON tags.id=link_tags."tagId"
    WHERE tags.tag_name=$1;
    `, [tagName]);

    return await Promise.all(linkIds.map(
      link => getLinkById(link.id)
    ));
  } catch (error) {
    throw error;
  }
}

async function createLink({ url, comment, tags = [] }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    INSERT INTO link (url, comment)
    VALUES($1, $2)
    RETURNING *;`,
      [url, comment]
    );

    const tagList = await createTags(tags);

    return await addTagsToLinks(link.id, tagList);
  } catch (error) {
    throw error;
  }
}

async function updateLink(linkId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  try {
    if (setString.length > 0) {
      await client.query(`
      UPDATE link
      SET ${ setString}
      WHERE id=${ linkId}
      RETURNING *;
      `, Object.values(fields));
    }

    if (tags === undefined) {
      return await getLinkById(linkId);
    }

    const tagList = await createTags(tags);

    const tagListIdString = tagList.map(
      tag => `${tag.id}`
    ).join(', ');

    await client.query(`
    DELETE FROM link_tags
    WHERE "tagId"
    NOT IN(${ tagListIdString})
    AND "linkId"=$1;
    `, [linkId]);

    await addTagsToLinks(linkId, tagList);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function deleteLink(id) {
  try {
    await client.query(`
    DELETE FROM link_tags
    WHERE "linkId"=$1;
    `, [id]);

    await client.query(`
    DELETE FROM link
    WHERE id=$1;
    `, [id]);

    return `Deleted Link: ${1}`;
  } catch (error) {
    throw error;
  }
}

// tag table

// I'm changing createTags to match the format of createTags from Juicebox

// async function createTag({ tag_name }) {
//   try {
//     const {
//       rows: [tags]
//     } = await client.query(
//       `
//     INSERT INTO tags (tag_name)
//     VALUES ($1)
//     RETURNING *;`,
//       [tag_name]
//     );

//     return tags;
//   } catch (error) {
//     throw error;
//   }
// }

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map(
    (_, index) => `$${index + 1}`
  ).join('), (');

  const selectValues = tagList.map(
    (_, index) => `$${index + 1}`
  ).join(', ');

  try {
    await client.query(`
      INSERT INTO tags(tag_name)
      VALUES (${ insertValues})
      ON CONFLICT (tag_name) DO NOTHING;
      `, tagList);

    const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE tag_name
      IN (${ selectValues});
      `, tagList);

    return rows
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM tags;`)

    return rows;
  } catch (error) {
    throw error
  }
}

// ADDING TAGS TO LINKS

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(`
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);
  } catch (error) {
    throw error;
  }
}

async function addTagsToLinks(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map(
      tag => createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function deleteTag(id) {
  try {
    const { rows: linkTags } = await client.query(`
    SELECT "tagId"
    FROM link_tags
    WHERE "tagId"=$1
    `, [id]);

    console.log("linkTags", linkTags);

    if (linkTags.length > 0) {
      throw Error('This tag is tied to an exisiting Link');
    } else {
      await client.query(`
      DELETE FROM tags
      WHERE id=$1
      `, [id]);

      return `Deleted Tag: ${id}`
    }
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
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
};
