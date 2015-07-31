var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI||process.env.movies);
var movies = db.get('movies');
var validator = require('../lib/validations.js');

router.get('/movies', function(req, res, next) {
  movies.find({}, function(err, info){
  res.render('movie', { title: 'Express' , info:info});
});
});

router.get('/movies/new', function(req, res, next){
  res.render("new", {title: 'Add a New Movie'});
});

router.post('/movies', function(req, res, next){
  var errorlist=(validator.validations(req.body.title, req.body.trailer, req.body.year));
if(errorlist.length>0){
  res.render("new", {errorlist:errorlist, title:req.body.title});
}else{
 movies.insert({title: req.body.title, url: req.body.trailer, year: req.body.year}, function(err, info){
  res.redirect("/movies");
});
}
});

router.get('/movies/:id', function(req, res, next){
  movies.findOne({_id:req.params.id},function(err, info){
  res.render("show", {info: info});
});
});

router.get('/movies/:id/edit', function(req, res, next){
  movies.findOne({_id:req.params.id},function(err, info){
    res.render("edit", {info:info});
});
});

router.post('/movies/:id/edit', function(req, res, next){
  movies.update({_id:req.params.id}, {title:req.body.title, url:req.body.trailer, year:req.body.year}, function(err, info){
    res.redirect("/movies/"+req.params.id);
});
});

router.post("/movies/:id/delete", function(req, res, next){
  movies.remove({_id:req.params.id}, function(err,info){
    res.redirect("/movies");
});
});

module.exports = router;

router.post('/articles', function(req, res, next){
  var errorlist=(validator.validations(req.body.title, req.body.trailer, req.body.year));
if(errorlist.length>0){
  res.render("new", {errorlist:errorlist, title:req.body.title});
}else{
 articles.insert({title: req.body.title, url: req.body.trailer, year: req.body.year}, function(err, info){
  res.redirect("/articles");
});
}
});



router.get('/articles/:id/edit', function(req, res, next){
  articles.findOne({_id:req.params.id},function(err, info){
    res.render("edit", {info:info});
});
});

router.post('/aricles/:id/edit', function(req, res, next){
  articles.update({_id:req.params.id}, function(err, info){
    res.redirect("/articles/"+req.params.id);
});
});

router.post("/articles/:id/articles", function(req, res, next){
  articles.remove({_id:req.params.id}, function(err,info){
    res.redirect("/articles");
});
});
