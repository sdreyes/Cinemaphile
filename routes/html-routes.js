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
};