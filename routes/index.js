const apiRouter = require('express').Router();

const { getAllLinks,
  getLinkById,
  createLink,
  createTag } = require('../db')

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

module.exports = apiRouter;
