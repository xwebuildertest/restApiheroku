var express = require('express');
var router = express.Router();

const Moovie = require('../model/Moovie');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// POST Create a new movie
router.post('/', function(req, res, next) {
  const movie = new Moovie(req.body)
  const promise = movie.save()

  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err);
  })

});



// GET List all movies 
router.get('/', function(req, res, next) {

  const promise = Moovie.find({});

  promise.then(movie => {
    res.json(movie)
  })
  .catch(err => console.log(err))

});

// GET List all movies 
router.get('/:movie_id', function(req, res, next) {

  const promise = Moovie.findById(req.params.movie_id);

  promise.then(movie => {
    if(!movie) {
      next({message: 'Bunaqa id yoq tekshirib korgin', code: 404})
    }

    res.json(movie)
  })
  .catch(err => console.log(err))

});


// PUT Update a movie with new info 
router.put('/:movie_id', function(req, res, next) {

  const promise = Moovie.findByIdAndUpdate(
    req.params.movie_id,
    req.body
    );
  promise.then(movie => {

    if(!movie)
      next({message: 'Bunaqa id yoq tekshirib korgin', code: 404})
      
    res.json(movie)
  })
  .catch(err => console.log(err))

});

// Delete
router.delete('/:movie_id', function(req, res, next) {
  const promise = Moovie.findByIdAndRemove(req.params.movie_id);
  promise.then(movie => {
    res.json(movie)
  })
  .catch(err => console.log(err))

});


// //api/movies/top10 
router.get('/top/top10', function(req, res, next) {
  const promise = Moovie.find({}).limit(10).sort({imdb_score: -1});

  promise.then(movie => {
    res.json(movie)
  })
  .catch(err => console.log(err))

});

// //Movies between two dates 
router.get('/between/:start_year/:end_year', function(req, res, next) {

  const {start_year, end_year} = req.params
  //greater then equal(gte) 

  const promise = Moovie.find({
      year: {"$gte" : parseInt(start_year),   "$lte" : parseInt(end_year)    }
  })

  promise.then(movie => {
    res.json(movie)
  })
  .catch(err => console.log(err))

});




module.exports = router;
