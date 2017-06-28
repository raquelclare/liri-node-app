// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
// var keys = require("keys.js");
// Make it so liri.js can take in one of the following commands:

// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

var command = process.argv[2];

switch (command) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doThis();
    break;
}

// TWITTER -----------

function tweets() {
    console.log("tweet tweet");
};

// SPOTIFY -----------

function spotify() {
    console.log("hum hum");
};

// OMDB --------------

// * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
//   * Rotten Tomatoes URL.

function movie() {

    var request = require("request");

    // Store all of the argument in an array 
    var nodeArgs = process.argv;

    var movieName = "";

    // This is in case there are multiple words or spaces in the  argument
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    console.log(queryUrl);

    // Create a request to the queryUrl

    request(queryUrl, function(error, response, body) {

        // If request is successful and a body exists
        if(!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            console.log("This move came out in " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes link: " + "TBD");

        }
    })

};


// DO WHAT IT SAYS ---------

function doThis() {

    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        data = data.split(", ");
        var result = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                result = data[i];
            }
        }
        console.log("Random.text says " + result);
    })
    console.log("errr?");
};