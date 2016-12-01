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
            console.log("pet checked in:", date.toLocaleDateString());
          res.sendStatus(200);
        }
      }
    );
  });
});


router.put('/out/:id', function(req, res){
  petID = req.params.id;
  date = req.body;
  console.log("pet id to edit: ", petID);
  console.log("pet checkout date: ", date);
  pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('connection error: ', err);
        res.sendStatus(500);
    }
    client.query(
      'UPDATE visits SET check_out = $1 WHERE pet_id = $2',
      //array of values to use in the query above
      [date, petID],
      function(err, result){
        if(err){
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          console.log("Checked out pet");
          res.sendStatus(200);
        }
      });


      });
  });

module.exports = router;
