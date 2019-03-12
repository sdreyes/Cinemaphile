console.log("This is Dashboard.js");
$(function() {

    $("#searchButton").on("click", function(event) {
        
        event.preventDefault();
        
        // Save the book they typed into the book-search input
        var movieSearched = $("#searchbox").val().trim();
        
        console.log(movieSearched);
        // Make an AJAX get request to our api, including the user's book in the url
        $.get("/api/movie/" + movieSearched, function(data) {
            
            console.log(data);
            // Call our renderBooks function to add our books to the page
            renderMovies(data);
            
        });
        
    });

    $(document).on("click", ".watch-button", function(event) {
        event.preventDefault();
        var checkbox = $("input[type='checkbox'][data-checkbox-id='" + $(this).data("id") + "']").is(":checked");
        var newRelation = {
            movieId: $(this).data("id"),
            watched: checkbox
        };
        $.ajax("/addRelation", {
            type: "POST",
            data: newRelation
        }).then(function(res) {
            alert(res.code);
        });
    });

    function renderMovies(data) {
        $("#search-results").empty();
        $("#search-results").show();
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {

                var div = $("<div>");
                div.addClass("col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center p-3");
                div.append("<img src= '"+ data[i].image + "' height='250' width='auto'>");
                div.append("<h4>" + data[i].title + "</h4>");
                div.append("<h6>" + data[i].year + "</h6>");
                div.append("<h6>" + data[i].genre.replace(/\|/g, ", ") + "</h6>");
                div.append("<input type='checkbox' data-checkbox-id='" + data[i].id + "' name='watched'> I have seen this movie </input>");
                div.append("<br><button class='watch-button btn' data-id='" + data[i].id + "'>Add to List</button>");
            
                $("#search-results").append(div);
            }
        }
        else {
            $("#search-results").append("No results found");
        }
        $("#search-results").append("<div class='container text-center'><div class='row text-center'><div class='col text-center'><h3>Don't see what you're searching for?</h3><button data-display='addNewMovie' id='addNewMovie_btn' class='btn'>Add New Movie</button></div></div></div>");
        $("#search-results").append("<div id='addNewMovie' class='portBox'><form id='addNewMovie_form' name='addNewMovie' method='post' action='/addMovie' class='text-right'><label for='title_newMovie'>Title&nbsp;</label><input class='text' id='title_newMovie' name='title_newMovie' type='text' /><br /><label for='year_newMovie'>Year&nbsp;</label><input name='year_newMovie' id='year_newMovie' type='text' /><br /><label for='genre_newMovie'>Genre&nbsp;</label><input name='genre_newMovie' id='genre_newMovie' type='text' /><br /><label for='image_newMovie'>Image&nbsp;</label><input name='image_newMovie' id='image_newMovie' type='text' /><br /><button class='btn' id='addMovie-btn'>Add</button></form></div>");
    }
});