router.put('/:id', function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var breed = req.body.breed;
  var color =  req.body.color;


  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error querying to the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE pets SET name=$1, breed=$2, color=$3 WHERE id=$4 RETURNING *;',
      [name, breed, color, id],
      function (err, result) {
        if (err) {
          console.log('Error querying database', err);
          res.sendStatus(500);

        } else {
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });

});
