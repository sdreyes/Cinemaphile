console.log("This is Dashboard");
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

    function renderMovies(data) {
        if (data.length !== 0) {

            $("#search-results").empty();
            $("#search-results").show();
            $("#search-results").append(div);

            for (var i = 0; i < data.length; i++) {

                var div = $("<div>")
                div.addClass("col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center p-3");
                div.append("<img src= '"+ data[i].image + "' height='250' width='auto'>");
                div.append("<h4>" + data[i].title + "</h4>");
                div.append("<h6>" + data[i].year + "</h6>");
                div.append("<h6>" + data[i].genre + "</h6>");
                div.append("<input type='checkbox' name='watched'> I have seen this movie </input>");
                div.append("<br><button class='watch btn' data-id='" + data[i].id + "'>Add to List</button>");
            
                $("#search-results").append(div);

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