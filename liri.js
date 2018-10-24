require("dotenv").config();

const fs = require("fs");
const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys.js");
const inquirer = require("inquirer");

const spotify = new Spotify(keys.spotify);
const omdb = keys.omdb["api"];
const bandsintown = keys.bandsintown["api"]
const command = process.argv[2];
const cmdArgument = process.argv[3];

const concertThis = function (arg) {
  const artist = arg ? arg : "Of Montreal";
  const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintown}`;

  request(url, function (error, response, body) {
    if (error) {
      return console.log(error);
    } else if (!error && response.statusCode === 200) {
      const eventNum = (JSON.parse(body).length > 4) ? 4 : JSON.parse(body).length;

      console.log(`
${artist.replace(/\b\w/g, l => l.toUpperCase())} will be playing at the following venues:
`)
      for (let i = 0; i < eventNum; i++) {
        const venue = JSON.parse(body)[i].venue;
        const date = moment(JSON.parse(body)[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("dddd, MMMM Do YYYY h:mm:ss a");
        console.log(`${venue.name} in ${venue.city}, ${venue.country} on ${date}`);
      }
      console.log(``)
    }
  })
}

const spotifyThis = function (arg) {
  const track = arg ? arg : "The Sign Ace of Base";

  spotify.search({
    type: 'track',
    query: track,
    limit: "4"
  }, function (err, data) {
    if (err) {
      return console.log(err);
    } else if (data.tracks.items.length !== 0) {
      const firstAlbum = (data["tracks"]["items"][0]);
      const artist = firstAlbum["artists"][0].name;
      const track = firstAlbum["name"];
      const url = firstAlbum["external_urls"].spotify;
      const albumName = firstAlbum["album"]["name"];

      console.log(`
Song: "${track}"
By: ${artist}
Album: ${albumName}`);
      console.log(url !== null ? `Listen to this song on the Spotify app: ${url}.
` : `Sorry, no song link was available.
`)
    } else {
      return console.log(`No results available for that search term.`)
    }
  });
}

const movieThis = function (arg) {
  const movie = arg ? arg : "mr nobody";
  const url = `https://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${omdb}`;

  request(url, function (error, response, body) {
    if (error) {
      return console.log(error);
    } else if (!error && response.statusCode === 200) {
      const title = JSON.parse(body).Title;
      const year = JSON.parse(body).Year;
      const rated = JSON.parse(body).Rated
      const rating = JSON.parse(body).Ratings[1].Value;
      const country = JSON.parse(body).Country;
      const language = JSON.parse(body).Language;
      const plot = JSON.parse(body).Plot;
      const actors = JSON.parse(body).Actors;

      console.log(`
Title: ${title}
Release Year: ${year}
Rated: ${rated}
Rotten Tomatoes Rating: ${rating}
Country: ${country}
Original Language: ${language}
Starring: ${actors}
Plot: ${plot}
`)
    }
  })
}

const doThis = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    const dataArr = data.split(",");
    const fileCommand = dataArr[0];
    const fileArgument = dataArr[1];

    if (error) {
      return console.log(error);
    } else {
      liriCommands(fileCommand, fileArgument);
    }
  });
}

const liriCommands = function (cmd, arg) {
  switch (cmd) {
    case "Concert Details":
      concertThis(arg)
      break;
    case "Song / Album Information":
      spotifyThis(arg)
      break;
    case "Movie Information":
      movieThis(arg)
      break;
    case "Read 'random.txt'":
      doThis()
      break;
    default:
      console.log(`
Please enter a proper command. Such as: 
"concert-this", "spotify-this-song", "movie-this", or "do-what-it-says"
`) // outdated, will be removed
  }
}

inquirer.prompt([{
  type: "list",
  name: "userCommand",
  message: "Hello, I'm LIRI. Please select one my functions below.",
  choices: ["Concert Details", "Song / Album Information", "Movie Information", "Read 'random.txt'"]
}]).then(command => {
  if (command.userCommand === "Read 'random.txt'") {
    console.log("Okay. Doing what 'random.txt' says.");
    return liriCommands(command.userCommand);
  }
  inquirer.prompt([{
    type: "input",
    name: "userArg",
    message: "Okay. Would you like to pass an argument?",
    validate: function (arg) {
      if (isNaN(arg) || arg === "") {
        return true;
      } else {
        console.log("Please enter a string argument.");
        return false;
      }
    }
  }]).then(arg => {
    if (arg.userArg === "") {
      console.log("No argument received. Using default arguments.")
      return liriCommands(command.userCommand);
    } else {
      console.log("Understood. Here are your results:");
      return liriCommands(command.userCommand, arg.userArg);
    }
  })
})