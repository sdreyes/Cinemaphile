var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        if (req.user) {
            db.user.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function (dbUser) {
                var hbsObject = {
                    user: req.user,
                    username: dbUser.username
                };
                res.render("index", hbsObject);
            });
        }
        else {
            var hbsObject = {
                user: req.user
            };
            res.render("index", hbsObject);
        }
    });

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
                            id: req.user.id
                        }
                    }).then(function(dbUser) {
                        var hbsObject = {
                            movies: [],
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
                            id: req.user.id
                        }
                    }).then(function(dbUser) {
                        var hbsObject = {
                            movies: [],
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
};