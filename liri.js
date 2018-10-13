require("dotenv").config();

const fs = require("fs");
const request = require("request");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const omdb = keys.omdb["api"];
const bandsintown = keys.bandsintown["api"]
const command = process.argv[2];
const cmdArgument = process.argv[3];

const concertThis = function (arg) {
  const artist = arg;
  const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintown}`;

  request(url, function (error, response, body) {
    if (error) {
      return console.log(error);
    } else if (!error && response.statusCode === 200) {
      console.log(`
${arg} will be playing at the following venues:`);
      for (let i = 0; i < JSON.parse(body).length; i++) {
        const venue = JSON.parse(body)[i].venue;
        const date = moment(JSON.parse(body)[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("dddd, MMMM Do YYYY h:mm:ss a");
        console.log(`
${venue.name} in ${venue.city}, ${venue.country} on ${date}`);
      }
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
    } else {
      const firstAlbum = (data["tracks"]["items"][0]);
      const artist = firstAlbum["artists"][0].name;
      const track = firstAlbum["name"];
      const url = firstAlbum["external_urls"].spotify;
      const albumName = firstAlbum["album"]["name"];

      console.log(`
The song "${track}", by ${artist} appears on ${albumName}.
`);
      if (url !== null) {
        console.log(`This song can be heard on the Spotify app: ${url}.
`)
      } else {
        console.log(`Sorry, we couldn't find a link to the song.
`)
      }
    }
  });
}

const doThis = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    const dataArr = data.split(",");
    const fileCommand = dataArr[0];
    const fileArgument= dataArr[1];

    if (error) {
      return console.log(error);
    }
    liriCommands(fileCommand, fileArgument);
  });
}

const liriCommands = function (cmd, arg) {
  switch (cmd) {
    case "concert-this":
      concertThis(arg)
      break;
    case "spotify-this-song":
      spotifyThis(arg)
      break;
    case "movie-this":
      movieThis(arg)
      break;
    case "do-what-it-says":
      doThis()
      break;
    default:
      console.log(`
Please enter a proper command. Such as: 
"concert-this", "spotify-this-song", "movie-this", or "do-what-it-says"
`)
  }
}

liriCommands(command, cmdArgument);