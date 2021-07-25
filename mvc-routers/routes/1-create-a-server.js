// // const pets = require('./pets.json'); DON'T DO IT THIS WAY, because JSON file is subject to change
const http = require('http');
const fs = require('fs/promises');

const word1 = 'hello';
const word2 = 'world!';

Promise.all([word1, word2]).then((words) => {
    console.log(words);
}) 

const server = http.createServer((request, response) => {
    // const method = request.method && const url = request.url 
    const { method, url } = request; // ^^ shorthand for this (destructuring);
    console.log(method, '<--method')
    console.log(url, '<--url');

    if (url === '/api/pets') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.write(JSON.stringify({ msg: 'hello!' }));
    response.end();
    } else if ( url === '/api/pets' && method === 'GET') {
        // get pets
        // request for pets
        fs.readFile('./pets.json', 'utf8', (err, fileContents) => {
            if (err) console.log(err);
            else {
                const pets = JSON.parse(fileContents);
                 response.setHeader('Content-Type', 'application/json');
                 response.statusCode = 200;
                 
                                                                                                                            console.log(fileContents);
                                                                                                                            console.log(typeof fileContents);
                                                                                                                            
                                                                                                                            console.log(JSON.parse(fileContents));
                                                                                                                            console.log(typeof JSON.parse(fileContents))
                response.write(JSON.stringify({pets: pets}));
                response.end();
            }
        })
    } else if ( url === '/api/pets' && method === 'POST') {
        console.log('posting new pet')
        // get the NEW pet from client body
        // add new oet to the data
        // respond to client - with NEW pet
        
        let body = '';

        request.on('data', (packet) => {
            body += packet.toString();
            console.log(body)
        })
        request.on('end', () => {
            fs.readFile('./pets.json', 'utf-8', (err, fileContents) => {
                if (err) console.log(err);
                else {
                    const pets = JSON.parse(fileContents);
                    const newPet = JSON.parse(body);
                    pets.push(newPet);

                    fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
                        if (err) console.log(err);
                        else {
                            console.log('new pets written!');

                            response.setHeader('Content Type', 'application/json')
                            response.statusCode = 201;
                            response.write(JSON.stringify({pet: newPet}))
                            response.end()
                        }
                    })
                }
            })

        })
    }
});

// listening
server.listen(1, (err) => {
    if (err) console.log(err);
    else console.log('Server listening on port 1...');
}) 

