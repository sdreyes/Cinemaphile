var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = function(app, passport) {
 
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/"
    }), function(req, res) {
        console.log("signup callback");
    });
 
    app.get("/dashboard", isLoggedIn);
    
    app.get("/logout", authController.logout);

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/404",
        failureRedirect: "/"
    }), function(req, res) {
        console.log("signin callback");
    });

    function isLoggedIn(req, res, next) {
        if (req.user) {
            console.log("req.user exists");
            console.log(req.user.id);
            authController.dashboard(req, res);
        }
        else {
            res.redirect("/");
            console.log("redirected");
        }
    }
};