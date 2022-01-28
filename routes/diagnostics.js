const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
  //Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  console.log(req.body);

  const { errors } = req.body;
  const time = Date.now();

  if (req.body) {
    const newDiag = {
      time,
      errors,
      error_id: uuidv4(),
    };

    readAndAppend(newDiag, './db/diagnostics.json');
    res.json('Diagnostic added successfully');
  } else {
    res.error('Error in adding diagnostic')
  }
});
  //  Logic for appending data to the db/diagnostics.json file

module.exports = diagnostics;
