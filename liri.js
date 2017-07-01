// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
// var keys = require("keys.js");
// Make it so liri.js can take in one of the following commands:

// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

var request = require("request");
var fs = require("fs");

var command = process.argv[2];
// var nodeArgs = process.argv[3];

switch (command) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotifyInfo();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doThis();
    break;
}

// Store all of the argument in an array 
// var nodeArgs = process.argv;

// Dependency
var Twitter = require("twitter");
// Importing Twitter keys
var twitterAcct = new Twitter(keys.twitterKeys);

// Dependency 
var Spotify = require("node-spotify-api");
//
var spotifyAcct = new Spotify(keys.spotifyKeys);


// Parameters
var params = {
    twitterParams: {
        screen_name: 'raquelclare_'
    },
    spotifyParams: {
        type: "track",
        query: process.argv[3]
    }
};
// TWITTER -----------

function tweets() {
    //console.log("tweet tweet");

    twitterAcct.get("statuses/user_timeline", params.twitterParams, function(err, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i].text;
                var tweetDate = tweets[i].created_at;

                console.log(tweet);
                console.log("Tweet posted on: " + tweetDate);
                console.log("-----------------------------");
            }
        } else {
            return console.log(err);
        }
    });
}

// SPOTIFY -----------

function spotifyInfo() {
    console.log("hum hum");

    var song = process.argv[3];
    // var params = {
    //     // twitterParams: {
    //     //     screen_name: 'raquelclare_'
    //     // },
    //     spotifyParams: {
    //         type: "track",
    //         query: song
    //     }
    // };

    if (params.spotifyParams.query === undefined) {
        params.spotifyParams.query = "Bohemian Rhapsody";
    }

    spotify.search(params.spotifyParams, function(err, data) {

        if (song) {
            song = process.argv.splice(3).join(" ");
            query = song;

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks[0].album.name);
            console.log("Listen to song using this link: " + data.tracks[0].href);
        } else if (err) {
            return console.log("An error has occurred: " + err);
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks[0].album.name);
            console.log("Listen to song using this link: " + data.tracks[0].href);
        }
    });
   
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

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log("An error has occurred: " + err);
        }

        // data = data.split(", ");
        // var result = 0;

        // for (var i = 0; i < data.length; i++) {
        //     if (data[i]) {
        //         result = data[i];
        //     }
        // }
        spofityInfo();
        console.log("Random.text says " + result);
    });
    //console.log("errr?");
}