var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.get('/', function(req, res) {
  //console.log('get request');
  // get books from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT pets.id as unique_pet, * FROM pets LEFT JOIN visits ON pets.id = visits.pet_id LEFT JOIN owners ON pets.owner_id = owners.id;', function(err, result) {
      done(); // close the connection.

      //console.log('the client!:', client);

      if(err) {
        //console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);

    });

  });
});

router.put('/:id', function(req, res){
  petID = req.params.id;
  pet = req.body;
  console.log("pet id to edit: ", pet);
  pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('connection error: ', err);
        res.sendStatus(500);
    }
    client.query(
      'UPDATE pets SET name=$1, breed=$2, color=$3' +
      ' WHERE id=$4',
      //array of values to use in the query above
      [pet.name, pet.breed, pet.color, petID ],
      function(err, result){
        if(err){
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
        }
      });


      });
  });

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

router.delete('/:id', function(req, res) {
  petID = req.params.id;

  //console.log('pet id to delete: ', petID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM visits WHERE pet_id = $1',
      [petID],
      function(err, result) {
        if(err) {
          res.sendStatus(500);
        } else {
          // res.sendStatus(200);
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
