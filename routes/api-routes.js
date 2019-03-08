var db = require("../models");

module.exports = function(app) {
    var findMovies = function(arr, dbRelation, callback) {
        console.log("find movies");
        console.log(dbRelation);
        var counter = 0;
        for (i=0; i < dbRelation.length; i++) {
            console.log("find all");
            db.movie.findOne({
                where: {
                    id: dbRelation[i].movieId
                }
            }).then(function(dbMovie) {
                console.log(dbMovie.movies);
                arr.push({
                    id: dbMovie.id,
                    title: dbMovie.movies,
                    year: dbMovie.year,
                    genre: dbMovie.genre,
                    image: dbMovie.image
                });
                counter++;
                if (counter === dbRelation.length) {
                    return callback(arr);
                }
            });
        }
    };
    app.get("/watchlist",function(req, res) {
        var userWatchList = [];
        db.relation.findAll({
            where: {
                userId: req.user.id
            }
        }).then(function(dbRelation) {
            console.log("The current user logged in has an ID of " + req.user.id);
            console.log("The response in the relation DB is:");
            console.log(dbRelation);

            findMovies(userWatchList, dbRelation, function(userWatchList) {
                console.log(userWatchList);
                res.json(userWatchList);
            });
        });
    });

    app.get("/api/movie/:movieTitle", function(req, res) {
        var movieTitle = req.params.movieTitle;
        db.movie.findAll({
            where: {
                movies: db.sequelize.where(db.sequelize.fn("LOWER", db.sequelize.col("movies")), "LIKE", "%" + movieTitle + "%")
            }
        }).then(function(dbMovies) {
            res.json(dbMovies);
        });
    });
};