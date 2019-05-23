'use strict';

const fs = require('fs');
const util = require('util');

let contents = [];
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files, callback) => {
  readAll([...files],callback);
  contents = [];
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file, callback) => {
  fs.readFile( file, (err, data) => {
    if(err) { callback(err); }
    else { callback(undefined, data); }
  });
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {
  let contents = [];
  let readOnePromise = util.promisify(readOne);

  readOnePromise(paths[0])
    .then(data => {
      console.log(paths[0]);
      contents.push(data.toString().trim());
    })
    .then(() => {
      readOnePromise(paths[1])
        .then(data => {
          console.log(paths[1]);
          contents.push(data.toString().trim());
        })
        .then(() => {
          readOnePromise(paths[2])
            .then(data => {
              console.log(paths[2]);
              contents.push(data.toString().trim());

              callback(undefined, contents);
            })
            .catch(e => callback(e));
        })
        .catch(e => callback(e));
    })
    .catch(e => callback(e));
};

