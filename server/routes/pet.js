var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.delete('/:id', function(req, res) {
  petID = req.params.id;

  console.log('pet id to delete: ', petID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM visits WHERE pet_id = $2',
      [petID],
      function(err, result) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    //delete pet query
    client.query(
      'DELETE FROM pets WHERE id = $1',
      [petID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});



module.exports = router;
