console.log("This is Dashboard");
$(function() {
    $("#searchButton").on("click", function(event) {

        event.preventDefault();

        // Save the book they typed into the book-search input
        var movieSearched = $("#searchbox").val().trim();
        console.log("yousearc");

        console.log(movieSearched);
        // Make an AJAX get request to our api, including the user's book in the url
        $.get("/api/movie/" + movieSearched, function(data) {

            console.log(data);
            // Call our renderBooks function to add our books to the page
            renderMovies(data);

        });

    });

    function renderMovies(data) {
        if (data.length !== 0) {

            $("#stats").empty();
            $("#stats").show();

            for (var i = 0; i < data.length; i++) {

                var div = $("<div>");

                div.append("<h2>Title:" + data[i].title + "</h2>");
                div.append("<p>Year: " + data[i].year + "</p>");
                div.append("<p>Genre: " + data[i].genre + "</p>");
                div.append("<img src= '"+ data[i].image + "'>");
                div.append("<input type='checkbox' name='watched'> I have seen this movie </input>");
                div.append("<button class='watch' data-id='" + data[i].id + "'> Add to Watchlist </button>");
            
                $("#stats").append(div);

            // }
            // $(".watch").click(function() {

            //     $.post ("/"+ this.id)
            //     // $.ajax({
            //     //     method: "POST"
            //     //     url: 

            //     });

            //         .then(function(){
            //         console.log("Added to watchlist");
                // });
            // })
            }

        }
    }
});