var exports = module.exports = {};
 
exports.dashboard = function(req, res) {
    res.render("index");
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        console.log("Logged out");
    });
    res.redirect("/");
};

