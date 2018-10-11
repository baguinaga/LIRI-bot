console.log('keys.js has loaded.');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  api: process.env.OMDB_API_KEY
}

exports.bandsintown = {
  api: process.env.BIT_API_KEY
}