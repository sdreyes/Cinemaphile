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
                    title: dbMovie.title,
                    year: dbMovie.year,
                    genre: dbMovie.genre.replace(/\|/g, ", "),
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
        if (req.user) {
            var userWatchList = [];
            db.relation.findAll({
                where: {
                    userId: req.user.id,
                    watched: false
                }
            }).then(function (dbRelation) {
                if (dbRelation.length === 0) {
                    db.user.findOne({
                        where: {
                            id: req.useer.id
                        }
                    }).then(function(dbUser) {
                        var hbsObject = {
                            movies: [{}],
                            user: req.user,
                            username: dbUser.username
                        };
                        res.render("watchlist", hbsObject);
                    });
                }
                else {
                    findMovies(userWatchList, dbRelation, function (userWatchList) {
                        db.user.findOne({
                            where: {
                                id: req.user.id
                            }
                        }). then(function(dbUser) {
                            var hbsObject = {
                                movies: userWatchList,
                                user: req.user,
                                username: dbUser.username
                            };
                            console.log(hbsObject);
                            res.render("watchlist", hbsObject);
                        });
                    });
                }
            });
        }
        else {
            res.render("index");
        }
    });

    app.get("/completedlist", function (req, res) {
        if (req.user) {
            var userCompletedList = [];
            db.relation.findAll({
                where: {
                    userId: req.user.id,
                    watched: true
                }
            }).then(function(dbRelation) {
                if (dbRelation.length === 0) {
                    db.user.findOne({
                        where: {
                            id: req.useer.id
                        }
                    }).then(function(dbUser) {
                        var hbsObject = {
                            movies: [{}],
                            user: req.user,
                            username: dbUser.username
                        };
                        res.render("completedlist", hbsObject);
                    });
                }
                else {
                    findMovies(userCompletedList, dbRelation, function (userCompletedList) {
                        db.user.findOne({
                            where: {
                                id: req.user.id
                            }
                        }).then(function (dbUser) {
                            var hbsObject = {
                                movies: userCompletedList,
                                user: req.user,
                                username: dbUser.username
                            };
                            console.log(hbsObject);
                            res.render("completedlist", hbsObject);
                        });
                    });
                }
            });
        }
        else {
            res.render("index");
        }
    });

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
        else {
            res.json({
                code: "You must be logged in"
            });
        }
    });
};