console.log("hi");

$(function() {
    $("#logout").on("click", function(event) {
        $.ajax({
            url: "/logout",
            type: "GET",
            success: function(result){
                console.log("logged out");
                location.reload();
            },
            error: function(err) {
                console.log("Error");
            }
        });
    });
    $("#signup-btn").on("click", function(event) {
        // event.preventDefault();

        var newUser = {
            username: $("#username-signup").val().trim(),
            password: $("#password-signup").val().trim()
        };

        $.ajax("/signup", {
            type: "POST",
            data: newUser
        }).then(function() {
            console.log("it worked");
        });
    });
    $("#signin-btn").on("click", function(event) {
        // event.preventDefault();

        var user = {
            username: $("#username-signin").val().trim(),
            password: $("#password-signin").val().trim()
        };

        $.ajax("/signin", {
            type: "POST",
            data: user
        }).then(function() {
            console.log("it worked");
        });
    });
});