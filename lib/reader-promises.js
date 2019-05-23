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

  readOne(paths[0], (err, data) => {
    return new Promise((resolve, reject) => {
      if (data) {
        if (err) {
          resolve(callback(err));
        }
        else {
          console.log(paths[0]);
          resolve(contents.push(data.toString().trim()));
        }
      } else {
        reject('bad');
      }
    });
  });

  readOne(paths[1], (err, data) => {
    return new Promise((resolve, reject) => {
      if (data) {
        if (err) {
          resolve(callback(err));
        }
        else {
          console.log(paths[1]);
          resolve(contents.push(data.toString().trim()));
        }
      } else {
        reject('bad');
      }
    });
  });

  readOne(paths[2], (err, data) => {
    return new Promise((resolve, reject) => {
      if (data) {
        if (err) {
          resolve(callback(err));
        }
        else {
          console.log(paths[2]);
          resolve(contents.push(data.toString().trim()));
        }
      } else {
        reject('bad');
      }
    });
  });

  callback(undefined, contents);
};

