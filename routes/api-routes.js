var db = require("../models");

module.exports = function (app) {
    var findMovies = function (arr, dbRelation, callback) {
        var counter = 0;
        for (i = 0; i < dbRelation.length; i++) {
            db.movie.findOne({
                where: {
                    id: dbRelation[i].movieId
                }
            }).then(function (dbMovie) {
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

    app.get("/watchlist", function (req, res) {
        var userWatchList = [];
        db.relation.findAll({
            where: {
                userId: req.user.id,
                watched: false
            }
        }).then(function (dbRelation) {
            findMovies(userWatchList, dbRelation, function (userWatchList) {
                res.json(userWatchList);
            });
        });
    });

    app.get("/completedlist", function (req, res) {
        var userCompletedList = [];
        db.relation.findAll({
            where: {
                userId: req.user.id,
                watched: true
            }
        }).then(function (dbRelation) {
            findMovies(userCompletedList, dbRelation, function (userWatchList) {
                res.json(userCompletedList);
            });
        });
    });

    app.get("/api/movie/:movieTitle", function (req, res) {
        var movieTitle = req.params.movieTitle;
        db.movie.findAll({
            where: {
                title: db.sequelize.where(db.sequelize.fn("LOWER", db.sequelize.col("title")), "LIKE", "%" + movieTitle + "%")
            }
        }).then(function (dbMovies) {
            res.json(dbMovies);
        });
    });

    // adding new movie to movie database
    app.post("/addMovie", function (req, res) {
        var newMovies = {
            title: req.body.title,
            year: req.body.year,
            genre: req.body.genre,
            image: req.body.image
        };
        db.movie.create(newMovies).then(function (dbMovies) {
            res.json(dbMovies);
        });
    });
};