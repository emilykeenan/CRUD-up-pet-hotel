var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.put('/in/:id', function(req, res) {
  
});

router.put('/out');

module.exports = router;
