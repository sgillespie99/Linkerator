const apiRouter = require('express').Router();

const { getAllLinks,
  getLinkById,
  getLinksByTagName,
  createLink,
  updateLink,
  deleteLink,
  createTags,
  getAllTags,
  createLinkTag,
  addTagsToLinks,
  deleteTag} = require('../db')


apiRouter.get("/links", (req, res, next)=> {
  const links = await getAllLinks();

  res.send({
    links
  })
})

apiRouter.post('/links', async (req, res, next)=>{
  const { url, comment, tags = "" } = req.body;

  // This part is copied directly from Juicebox so I'm not 100% sure if its going to work
  const tagArr = tags.trim().split(/\s+/)


  const postData = {}

  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.url = url
    postData.comment = comment

    const newLink = await createLink(postData)

    if (newLink){
      res.send(newLink)
    } else {
      next ({
        name: 'Link Creation Error',
        message: 'Error creating your link'
      })
    }
  } catch (error) {
    throw error
  }
})

apiRouter.patch('/links/:id', async (req,res,next) => {
  const { id } = req.params
  const {url, comment, tags } = req.body;

  const updateFields = {}

  // all the tags stuff is copied so far
  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (url){
    updateFields.url = url
  }

  if (comment){
    updateFields.comment = comment
  }

  try {
    
    const updatedLink = await updateLink(id, updateFields)
    // need to check if this is correct?
    res.send({link: updatedLink})
  } catch (error) {
    throw error
  }

})


apiRouter.delete('/links/:id', async (res, res, next) => {
  
  const { id } = req.params;

  try {
    const deletedLink = await deleteLink(id)
    res.send(deletedLink)
  } catch (error) {
    throw error
  }
})



apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
