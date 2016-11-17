var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.post('/', function (req, res) {
  var newPet = req.body;
  console.log(newPet);

  pg.connect(connectionString, function (err, client, done) {

    if(err) {
      console.log('Database connection error:', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO pets (name, breed, color, owner_id)' +
      ' VALUES ($1, $2, $3, $4)',
      [newPet.name, newPet.breed, newPet.color, newPet.owner_id],
      function (err, result) {
        done();

        if(err) {
          console.log('insert query error:',err)
          res.sendStatus(500);
        } else {
          console.log('pet added');
          res.sendStatus(201);
        }
      }
    );
  });
});

module.exports = router;
