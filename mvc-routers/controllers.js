const { selectCatById, readCats } = require('./models');
const fs = require('fs')

function getCatById(req, res) {
    const regex = /[^\D]/g;
    const catId  = (req.url.match(regex)).join('');
    console.log(catId);
    selectCatById(catId, (err, cat) => {
        res.status(200).send({ cat });
    })
};

function getCats(req, res) {
    const dir = `./cats`
    readCats(dir, (err, cats) => {
        if (err) console.log(err);
        else {
        fs.writeFile('cats.json', `${cats}`, (err) => {
            if (err) console.log(err);
            else console.log('Cat added to file!')   
            })
        }
    })
}

module.exports = { getCatById, getCats };
