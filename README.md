# LIRI-bot

## Description

LIRI-bot (*Language Interpretation and Recognition Interface*) is a CLI (*Command Line Interface*) app built through the use of node.js which, not unlike it's SIRI namesake, accepts user input and facilitates an appropriate response. In the case of LIRI user input comes in the form of command line arguments which are obtained through the use of inquirer.js in a rudimentary user interface. LIRI then takes the user's input and responds with the appropriate selected function.

## Installation

In order to run LIRI-bot simply fork this repository and within it's directory install it's node dependencies with:

```js
npm install
```

## Functionality 
LIRI currently accepts the following "commands":

- `concert-this`
```js
node liri.js 'concert-this' 'artist name'
```

The 'concert-this' command will return the next four upcoming events/concerts for a given artist (if there are any). This information is obtained by intefacing with the bandsintown API. 

- `spotify-this`
```js
node liri.js 'spotify-this' 'song name or search term'
```

The 'spotify-this' command returns the Spotify information and link for a given song or search term. 

- `movie-this`
```js
node liri.js 'movie-this' 'movie name'
```

The 'movie-this' command will accept a movie name and search for the corresponding movie's information through the omdb API.

- `do-what-it-says`
```js
node liri.js 'do-what-it-says'
```

The 'do-what-it-says' command will run the first command that is logged in the random.txt file.

## Changes 

#### Version 1.1 
- Created user interface with Inquirer package
- Changed the name of LIRI commands for ease of reading and clarity.
- Included a default case of concert queries.


## Future Developments

LIRI-bot is currently quite limited in functionality. The ability to integrate with API's is impressive but ultimately limited by the specificity of the user's input and the API's own abilities. 

Additionally, the need for the user to specify the required command will be a significant point of failure. Therefore, creating a simple CLI with the inquirer.js module, where the user would be limited to acceptable commands, would improve usability. 

Furthermore, the limited number of commands makes it difficult to find a use case for LIRI outside of pure novelty. Increasing the number of commands for the movies, concerts and songs found by LIRI would make this project more meaningful.

The following is a list of potential improvements and future developments:
  - An inquirer.js CLI with user prompts
  - A "spotify-open" which would open the url for a searched song.
  - A "log-this" command that would log the results of previous command for further use.
  - A "concert-buy" command which would provide a url for ticket purchase.
  - A "movies-more" command which would return related or recommmend movies based on a previous search.
