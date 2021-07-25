const apiRouter = require('express').Router();
const catRouter = require('./cats-router');

apiRouter.use('/cats', catRouter);

module.exports = apiRouter;