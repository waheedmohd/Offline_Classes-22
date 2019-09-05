const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// get db connection Object
const mongodb = require('../database/dbOperations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

/* GET Raise Complaints page. */
router.get('/raise', function(req, res, next) {
  res.render('raise-complaints.ejs');
});

/* GET List of Complaints page. */
router.get('/list', function(req, res, next) {
  // READ complaints data from database
  let db = mongodb.getDB();
  db.collection('complaints').find().toArray((err, complaints) => {
    res.render('list-of-complaints.ejs' , {complaints : complaints});
  });
});

/* POST Raise Complaints Form */
router.post('/complain', urlencodedParser, function(req, res, next) {
  let complaint = req.body;
  // Insert a Record to the Database
  let db = mongodb.getDB();
  db.collection('complaints').insertOne(complaint , (err , r) => {
     console.log('Record is Inserted to Database....');
     res.render('raise-complaints-success.ejs' , {complaint : complaint});
  });

});


module.exports = router;
