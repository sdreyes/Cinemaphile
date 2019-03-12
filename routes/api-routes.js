var db = require("../models");

module.exports = function (app) {
    app.put("/api/completedlist", function(req, res) {
        db.relation.update({
            watched: false
        }, {
            where: {
                movieId: req.body.id,
                userId: req.user.id
            }
        }).then(function(dbRelation) {
            res.json(dbRelation);
        });
    });

    app.put("/api/watchlist", function(req, res) {
        db.relation.update({
            watched: true
        }, {
            where: {
                movieId: req.body.id,
                userId: req.user.id
            }
        }).then(function(dbRelation) {
            res.json(dbRelation);
        });
    });

    app.get("/api/movie/:movieTitle", function (req, res) {
        var movieTitle = req.params.movieTitle;
        var searchedMovies = [];
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
        db.movie.create(newMovies).then(function(dbMovies) {
            res.json(dbMovies);
        });
    });
    app.post("/addRelation", function (req, res) {
        if (req.user) {
            db.relation.findOne({
                where: {
                    userId: req.user.id,
                    movieId: req.body.movieId
                }
            }).then(function (dbRelation) {
                if (dbRelation) {
                    res.json({
                        code: "This movie is already in a list"
                    });
                }
                else {
                    var newRelation = {
                        userId: req.user.id,
                        movieId: req.body.movieId,
                        watched: req.body.watched
                    };
                    db.relation.create(newRelation).then(function(dbRelation) {
                        console.log("Relationship added");
                        res.json({
                            code: "Successfully added"
                        });
                    });
                }
            });
        }
        else {
            res.json({
                code: "You must be logged in"
            });
        }
    });
    app.delete("/relation/:id", function(req, res) {
        db.relation/destroy({
            where: {
                userId: req.user.id,
                movieId: req.params.id
            }
        }).then(function(dbRelation) {
            res.json({
                code: "Movie deleted from your lists"
            });
        });
    });
};