require("dotenv").config();

const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const omdb = keys.omdb["api"];
const command = process.argv[2];
const commandArg = process.argv[3];

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

const concertThis = function(arg) {
  const artist = arg;
  const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  });
}

request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});

if (command === "concert-this") {
  concertThis(commandArg);
}
