
const { getCats, getCatById } = require('../models');
const catRouter = require('express').Router();

catRouter.get('/', (req, res) => {
    res.status(200).send(getCats);
});

catRouter.get('/:id', (req, res) => {
    res.status(200).send(`All OK from /api/cats/:id`);
})


module.exports = catRouter;