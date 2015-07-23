var express = require('express');
var router = express.Router();


router.get('/movies', function(req, res, next) {
  res.render('movie', { title: 'Express' });
});

router.get('/movies/new', function(req, res, next){
  res.render("new", {title: 'Add a New Movie'});
});

router.post('/movies', function(req, res, next){
  res.redirect("/movies");
});

module.exports = router;
