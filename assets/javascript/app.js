$(document).ready(function() {
    // Array of Cars
    var topics = ['Toyota', 'Honda', 'Mitsubishi', 'Nissan', 'subaru','Mazda', 'Lexus', 'Acura', 'Infiniti',];

    //Function to display info on the topics by calling an API and retrieving the info 
    function displayInfo(){
      $('#car-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

      // AJAX call to GET information 
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        // If no information on topics is found, then alert the user
        if (response.pagination.total_count == 0) {
          alert('Sorry, there are no Gifs for this topic');
          var itemindex = topics.indexOf(topic);
          // otherwise display button
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }
        
        // Save response from API call (JSON) to a variable results
        var results = response.data;
        for (var j = 0; j < results.length; j++){
          // Create new Div
          var newTopicDiv = $("<div class='car-name'>");
          // Save responses from API into variables and add to DOM
          // GIF Rating
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          // GIF Title
          
          // GIF URL
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif');
          // Appending info 
          newTopicDiv.append(pRating);
        
          newTopicDiv.append(gif);
           // Putting the saved info to new div
          $('#car-view').prepend(newTopicDiv);
        } 
      });
    };
    
    // Function for displaying buttons
    function renderButtons() {
      $('.buttons-view').empty();
      // Loops through array to create buttons
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    // Function to animate gif
    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    //event listeners
    // Adding to array using submit button
    $("#add-car").on("click", function(event) {
      event.preventDefault();
      // takes form input and trims
      var car = $("#car-input").val().trim();
      // catch
      if (topics.toString().toLowerCase().indexOf(car.toLowerCase()) != -1) {
        alert("Topic already exists");
      }
      else {
        topics.push(car);
        renderButtons();
      }
    });

    $(document).on("click", ".topic", displayInfo); //displaying content of button
    $(document).on("click", ".animate-gif", playGif); //animate gif



    // Must call this to display initial buttons
    renderButtons();
});