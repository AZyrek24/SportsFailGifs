$(document).ready(function () {
  //Variables and Arrays
  //==============================================================================================

  var topics = ["HOCKEY FAILS", "NFL FAILS", "BASEBALL FAILS", "SOCCER FAILS", "BASKETBALL FAILS", "CAR RACING FAILS", "BADMINTON FAILS", "DODGEBALL FAILS", "LACROSSE FAILS", "GOLF FAILS", "BOWLING FAILS",  "BILLIARDS FAILS", "SWIMMING FAILS"];
  var sportId;


  //Functions
  //==============================================================================================

  //Generates buttons for each item in the topics array
  function getButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      newBtn = $("<button type='button' class='btn btn-outline-primary' data-sport='" + topics[i] + "'>" + topics[i] + "</button>");
      $("#buttons").append(newBtn);
    }
  }

  //Creates a new button upon text field submission
  $("#btn-submit").on("click", function () {
    sportId = $("#sport-id").val();
    topics.push(sportId.toUpperCase(0) + " FAILS");
    getButtons();
  })



  //Clicking does an AJAX request, then populates gifs when returned
  $("body").on("click", "button", function (event) {
    event.preventDefault();
    var sport = $(this).attr("data-sport").replace(/\s/g, "+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "fails&api_key=h4SRVrmm0RShPORSUSzs3bogyNR6rmkA&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        
        //Sets variables for still and animated gifs
        var imageUrl = results[i].images.fixed_height_still.url;
        var imageStill = results[i].images.fixed_height_still.url;
        var imageAnimate = results[i].images.fixed_height.url;

        //Creates image elements for each query and displays the still gifs with rating
        var gifDiv = $("#gif-display");
        var sportImage = $("<img>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        sportImage.attr({ "src": imageUrl, "data-still": imageStill, "data-animate": imageAnimate, "data-state": "still", "class": "gif" });        
        gifDiv.prepend(p);
        p.append(sportImage);
      }
    });

    //Animates gif if it is still/Pauses if the gif is animated
    $("body").on("click", ".gif", function () {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  })
  //Main Process
  //==============================================================================================
  getButtons();
})