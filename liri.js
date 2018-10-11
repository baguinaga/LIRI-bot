require("dotenv").config();

const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const omdb = keys.omdb["api"];
const bandsintown = keys.bandsintown["api"]
const command = process.argv[2];
const commandArg = process.argv[3];

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

const concertThis = function (arg) {
  const artist = arg;
  const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintown}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(`${arg} will be playing at the following venues:
      `);
      for (let i = 0; i < JSON.parse(body).length; i++) {
        const venue = JSON.parse(body)[i].venue;
        const date = moment(JSON.parse(body)[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("dddd, MMMM Do YYYY h:mm:ss a");
        console.log(`${venue.name} in ${venue.city}, ${venue.country} on ${date}
        `);
      }
    }
  });
}

if (command === "concert-this") {
  concertThis(commandArg);
}