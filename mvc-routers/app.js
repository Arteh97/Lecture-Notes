const {getCats, getCatById } = require('./controllers');
const apiRouter = require('./routes/api-router');
const express = require('express')

const app = express();

// app.use('/api', apiRouter);

app.get('/api/cats', getCats)

app.get('/api/cats/:id', getCatById);

app.listen(9090, (err) => {
    if (err) console.log(err);
    else console.log('server is listening on port 9090');
})