var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.put('/in/:id', function(req, res) {
  pg.connect(connectionString, function (err, client, done) {

    if(err) {
      console.log('Database connection error:', err);
      res.sendStatus(500);
    }

    var date = new Date();
    client.query(
      'UPDATE visits SET check_in=$1 WHERE pet_id=$2',
      [date.toLocaleDateString(), req.params.id],
      function (err, result) {
        done();

        if(err) {
          console.log('insert query error:',err)
          res.sendStatus(500);
        } else {
          console.log('pet visit updated');
          res.sendStatus(200);
        }
      }
    );
  });
});

router.put('/out');

module.exports = router;
