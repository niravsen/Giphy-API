
var topics = ['Super Mario', 'Luigi', 'Princess Peach', 'Toad', 'Yoshi', 'Bowser', 'Wario', 'Donkey Kong', 'Ghost', 'Star'];


var characters = JSON.parse(localStorage.getItem("characters"));
if (!Array.isArray(characters)) {
        characters = [];
      }

for (var i = 0; i < characters.length; i++) {
    topics.push(characters[i]);
}


function displayInfo(){
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=4KtHedsIem5xRHboJWwzq5yHE5Nn2Gc0";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) { 
      var result = response.data;

$('#gif').empty();
      
for (let i = 0; i < result.length; i++){
    var newDiv = $("<div class='g'>");

    var rating = result[i].rating;
    var p = $("<p class='rate'>").text('Rating: ' + rating);
    var t = result[i].title;
    var title = $("<p class='title'>").text(t);

 console.log(result[i]);
 var sImage = $('<img>').attr('src', result[i].images.fixed_height_still.url);
 sImage.addClass('gif');
 sImage.attr('data-still', result[i].images.fixed_height_still.url);
 sImage.attr('data-animate', result[i].images.fixed_height.url);
 sImage.attr('data-state', 'still');


 var dLink = result[i].images.original.url;
 var split = dLink.split('?', 1);


 var addLink = $("<a href=" + split + " download target='_blank'>")
 var d = $("<p class='download' download>").text('Download Original');
 addLink.append(d);

 newDiv.append(title);            
 newDiv.append(p);    
 newDiv.append(sImage);
 newDiv.append(addLink);

 $('#gif').prepend(newDiv);            
 };

 
  $('.gif').on('click', function(){
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
    });
  });
}


function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        if (topics[i] == ''){
            return;
        }
        var a = $("<button>");
        a.addClass("games");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}


$("#addGame").on("click", function(event) {
    event.preventDefault();
    var games = $("#gameInput").val().trim();
    if (games == ''){
        return;
    }
    topics.push(games);
    renderButtons();
    characters.push(games);
    console.log(characters);
    localStorage.setItem("characters", JSON.stringify(characters));
    document.getElementById("gameForm").reset();
});

$(document).on("click", ".games", displayInfo);

renderButtons();