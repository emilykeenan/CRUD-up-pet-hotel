var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function (req, res) {
  console.log('get owners');

  pg.connect(connectionString, function (err, client, done) {

    if(err) {
      console.log('Database connection error:', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM owners',
      function (err, result) {
        done();

        if(err) {
          console.log('insert query error:',err)
          res.sendStatus(500);
        } else {
          console.log('pet added');
          res.send(result.rows);
        }
      }
    );
  });
});

module.exports = router;
