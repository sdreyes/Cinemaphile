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

    $(".move-to-watch-list").on("click", function(event) {
        var movie = {
            id: $(this).data("id")
        };
        event.preventDefault();
        $.ajax("/api/completedlist", {
            type: "PUT",
            data: movie
        }).then(
            function() {
                console.log("changed watch status");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".move-to-completed-list").on("click", function(event) {
        var movie = {
            id: $(this).data("id")
        };
        event.preventDefault();
        $.ajax("/api/watchlist", {
            type: "PUT",
            data: movie
        }).then(
            function() {
                console.log("changed watch status");
                // Reload the page to get the updated list
                location.reload();
            }
        );
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

    //ADDING ONCLICK FUNCTION FOR ADD MOVIE BUTTON
    $("#addMovie-btn").on("click", function(event) {
        event.preventDefault();

        //CREATE OBJ WITH USER INPUT 
        var movie = {
            title: $("#title_newMovie").val().trim(),
            year: $("#year_newMovie").val().trim(),
            genre: $("#genre_newMovie").val().trim(),
            image: $("#image_newMovie").val().trim()
        };
        
        $.ajax("/addMovie", {
            type: "POST",
            data: movie
        }).then(added);


        function added(){
            $("#addNewMovie_form").empty();
            $("#addNewMovie").append("Movie added");
        }

    });
});