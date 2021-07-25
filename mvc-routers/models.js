const fs = require('fs');
const promise = require('fs/promises');


function selectCatById(catId, callback) {
    fs.readFile(`./cats/${catId}.json`, 'utf8' , (err, catString) => {
        if (err) callback(err);
        else {
            const parsedCat = JSON.parse(catString);
            callback(null, parsedCat);
        }
    })
}


function readCats(dir, callback) {
    fs.readdir(`${dir}`, 'utf-8', (err, fileIds) => {
        let body = [];
        if (err) callback(err);
        else {
             let parsed = fileIds.forEach(function(fileId) {
                fs.readFile(`./cats/${fileId}`, 'utf-8', (err, catObj) => {
                    if (err)  callback(err);
                    else {
                        body += catObj.toString()
                        const resolved = JSON.parse(body);
                        return resolved;
                    }
                })
            })
            callback(null, parsed)
        }
    })
}


// const myPromise = fs.readdir(`./cats`, 'utf-8', (err, fileIds) => {
    //     if (err) callback(err);
    //     else {
        //         let body = [];
        //         fileIds.forEach(function(fileId) {
            //             fs.readFile(`./cats/${fileId}`, 'utf-8', (err, catObj) => {
                //                 if (err)  console.log(err);
                //                 else {
                    //                     body += catObj;
                    
                    //                 }
                    //             })                 
                    //         })
                    //     }
                    // })
                    
                    // const promiseToReadDir = (catObj) => {
                        //     return new Promise((resolve, reject) => {
                            //         setTimeout(() => {
                                //             console.log(catObj)
                                //             if (catObj) reject(new Error ('No Cats found here!'));
                                //             return resolve(catObj);
                                //         }, 100)
                                //     })
                                // }
                                
                                // // readCats = promiseToReadDir(myPromise);
                                
                                // // readCats
                                // // .then((body) => {
                                    // //     fs.writeFile('cats.json', `${body}`, (err) => {
                                        // //         if (err) console.log(err);
                                        // //         else console.log('Cat Added to body')
                                        // //     })
                                        // // })
                                        // // .catch((err) => {
                                            // //     console.log('There was an error!')
                                            // //     console.log(err);
                                            // // });
                                            
                                            // const myDir = promiseToReadDir(promise);
                                            
                                            // myDir
                                            // .then((cats) => {
                                                //     console.log(cats)
                                                // })
                                                // .catch((err) => {
                                                    //     console.log('There was an error!')
                                                    //     console.log(err)
                                                    // })
                                                    
                                            module.exports = { readCats, selectCatById };
                                            