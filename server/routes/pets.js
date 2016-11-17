var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.put('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if(err) {
      console.log('Database connection error:', err);
      res.sendStatus(500);
    }

    client.put(
      'INSERT INTO pets (name, breed, color, owner_id)' +
      ' VALUES ($1, $2, $3, $4)',
      [newPet.name, newPet.breed, newPet.color, newPet.owner_id],
      function (err, result) {
        done();

        if(err) {
          console.log('insert query error:',err)
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
    );
  });
});
module.exports = router;
