var db = require("../models");

module.exports = function(app) {
    app.get("/watchlist",function(req, res) {
        db.relation.findAll({
            where: {
                userId: req.user.id
            }
        }).then(function(dbRelation) {
            res.json(dbRelation);
        });
    });

    app.get("/api/movie/:movieTitle", function(req, res) {
        var movieTitle = req.params.movieTitle;
        db.movie.findAll({
            where: {
                title: db.sequelize.where(db.sequelize.fn("LOWER", db.sequelize.col("title")), "LIKE", "%" + movieTitle + "%")
            }
        }).then(function(dbMovies) {
            res.json(dbMovies);
        });
    });
};