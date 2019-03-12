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
                console.log("Error logging out");
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
            console.log("New user signed up.");
        });
    });

    $(".move-to-watch-list").on("click", function(event) {
        event.preventDefault();
        var movie = {
            id: $(this).data("id")
        };
        $.ajax("/api/completedlist", {
            type: "PUT",
            data: movie
        }).then(
            function() {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".move-to-completed-list").on("click", function(event) {
        event.preventDefault();
        var movie = {
            id: $(this).data("id")
        };
        $.ajax("/api/watchlist", {
            type: "PUT",
            data: movie
        }).then(
            function() {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#signin-btn").on("click", function(event) {
        var user = {
            username: $("#username-signin").val().trim(),
            password: $("#password-signin").val().trim()
        };

        $.ajax("/signin", {
            type: "POST",
            data: user
        }).then(function() {
            console.log("User signed in.");
        });
    });

    $(".delete-from-list").on("click", function(event) {
        event.preventDefault();
        var movieId = $(this).data("id");
        $.ajax({
            type: "DELETE",
            url: "/relation/" + movieId
        }).then(function() {
            location.reload();
        });
    });

    //ADDING ONCLICK FUNCTION FOR ADD MOVIE BUTTON
    $(document).on("click", "#addMovie-btn", function(event) {
        event.preventDefault();

        //CREATE OBJ WITH USER INPUT 
        var movie = {
            title: $("#title_newMovie").val().trim(),
            year: $("#year_newMovie").val().trim(),
            genre: $("#genre_newMovie").val().trim(),
            image: $("#image_newMovie").val().trim()
        };

        if (movie.title.length === 0 || movie.year.length === 0 || movie.genre.length === 0 || movie.image.length === 0) {
            alert("Please complete all fields");
        }
        else if (movie.year.length !== 4) {
            alert("Year must be a 4 digit number");
        }
        else {
            $.ajax("/addMovie", {
                type: "POST",
                data: movie
            }).then(added);
    
    
            function added(){
                $("#addNewMovie_form").empty();
                $("#addNewMovie").append("Movie added");
            }
        }
    });
});