console.log("hi");

$(function() {
    $("#signup-btn").on("click", function(event) {
        event.preventDefault();

        var newUser = {
            username: $("#username-input").val().trim(),
            password: $("#password-input").val().trim()
        };

        $.ajax("/signup", {
            type: "POST",
            data: newUser
        }).then(function() {
            console.log("it worked");
        });
    });
    $("#signin-btn").on("click", function(event) {
        event.preventDefault();

        var newUser = {
            username: $("#username-input").val().trim(),
            password: $("#password-input").val().trim()
        };

        $.ajax("/signin", {
            type: "POST",
            data: newUser
        }).then(function() {
            console.log("it worked");
        });
    });
});