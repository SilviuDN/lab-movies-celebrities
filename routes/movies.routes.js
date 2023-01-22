const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

// all your routes here

router.get("/", (req, res, next) => {
    // what if the list if empty?
        Movie
        .find({})
        .populate('cast') //not necessary
        .then( movies => {
            res.render('movies/movies', {movies})
        })
        .catch( err => console.log(err))
    });

router.get("/create", (req, res, next) => {
    Celebrity
        .find()
        .then( (celebrities) => res.render("movies/movie-new", {celebrities}) )
        .catch( (err) => res.send(`There was an error accessing the celebrities list: ${err}`) )    
});

router.post('/create', (req, res, next) => {
    let movie = req.body
    let {title, genre, plot, cast, image} = movie
    const validation =  title && genre && plot && image

    if( !validation ){
        res.render('movies/movie-new', {errorMessage: `All fields are mandatory. Refresh page.`})
        return
    }  
    Movie
        .findOne({title})
        .then( foundMovie => {
            if(foundMovie){
                res.render('movies/movie-new', {errorMessage: `${movie} already registered.`})
                return
            }
        })

    Movie
        .create( movie)
        .then( () => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/:movieId', (req, res, next) => {
    const {movieId} = req.params
    Movie
        .findById(movieId)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
})

router.post('/:movieId/delete', (req, res, next) => {
    const {movieId} = req.params
    Movie   
        .findByIdAndRemove(movieId)
        .then(deleted => {
            res.redirect('/movies')
        })
        .catch(err => res.send("Error. Can't delete, can't programm."))
})


router.get("/:id/edit", async (req, res, next) => {
    const {id} = req.params
    const celebs = await Celebrity.find({})

    Movie
        .findById(id)
        .populate('cast')  
        .then( movie => {

            movie.oldCastList = movie.cast
            movie.cast = celebs
            movie.cast.forEach( actor => {
                actor.selected = movie.oldCastList.some(oldActor => oldActor.name == actor.name)
            })
            res.render('movies/movie-edit', movie )

        }   )
});

router.post('/:id/edit', (req, res, next) => {
    const {id} = req.params
    const {title, genre, image, plot, cast} = req.body
    Movie
        .findByIdAndUpdate(id, {title, genre, image, plot, cast})
        .then( () => res.redirect('/movies'))
        .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
})

module.exports = router;