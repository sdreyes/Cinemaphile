var authController = require("../controllers/authcontroller.js");
 
 
module.exports = function(app, passport) {
 
    app.get("/signup", authController.signup);
 
    app.get("/signin", authController.signin);
 
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
    }), function(req, res) {
        console.log("signup callback");
    });
 
    app.get("/dashboard", isLoggedIn);
    
    app.get("/logout", authController.logout);

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
    }), function(req, res) {
        console.log("signin callback");
    });

    function isLoggedIn(req, res, next) {
        if (req.user) {
            console.log("req.user exists");
            authController.dashboard(req, res);
        }
        else {
            res.redirect("/signin");
            console.log("redirected");
        }
    }
};