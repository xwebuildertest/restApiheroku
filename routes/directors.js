const express = require('express');
const router = express.Router();
const mongoogse = require('mongoose')
const Director = require('../model/Directors')




/* post # Directors */
// Create a new director 
router.post('/', (req, res, next) =>  {
    const director = new Director(req.body);

    const promise = director.save();

    promise.then(data => res.json(data) )
        .catch(err => console.log(err))
});


// Get a director // lookup // agregat 
router.get('/', (req, res, next) =>  {
    const promise = Director.aggregate([  
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'moovies'
            }
        },
        {
            $unwind: {
                path: '$moovies'            // faqat shu movies borlarni ko'rsatadi
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$moovies'
                }
            }
        },
        { // qisqartirish uslubi 
            $project:{
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                moovies: '$moovies',
            }
        }

     ]);
    
    promise.then(data => res.json(data) )
           .catch(err => console.log(err))
});

// Get a director // lookup // agregat 
router.get('/:director_id', (req, res, next) =>  {
    const promise = Director.aggregate([  
        {
            $match: {
                '_id' : mongoogse.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'moovies'
            }
        },
        {
            $unwind: {
                path: '$moovies'            // faqat shu movies borlarni ko'rsatadi
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$moovies'
                }
            }
        },
        { // qisqartirish uslubi 
            $project:{
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                moovies: '$moovies',
            }
        }

     ]);
    
    promise.then(data => res.json(data) )
           .catch(err => console.log(err))
});



// Get a director // lookup // agregat 
router.put('/:director_id', (req, res, next) =>  {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
        new: true
    });
    
    promise.then(data => res.json(data) )
           .catch(err => console.log(err))
});

// Get a director // lookup // agregat 
router.delete('/:director_id', (req, res, next) =>  {
    const promise = Director.findByIdAndRemove(req.params.director_id);
    
    promise.then(data => res.json(data) )
           .catch(err => console.log(err))
});

router.get('/:director_id/best10movie', (req, res, next) =>  {
    const promise = Director.aggregate([  
        {
            $match: {
                '_id' : mongoogse.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies' // Masiv
            }
        },
        {
            $unwind: {
                path: '$movies'            // faqat shu movies borlarni ko'rsatadi
            }
        },
        {
            $sort:{
                'movies.imdb_score': -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        { // qisqartirish uslubi 
            $project:{
                _id: false,
                movies: '$movies',
            }
        }

     ]);
    
    promise.then(data => res.json(data) )
           .catch(err => console.log(err))
});



module.exports = router;
