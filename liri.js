require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

const axios = require('axios');

var fs = require("fs");

var moment = require('moment');
moment().format();

function concertThis() {

    var artist = process.argv.slice(3).join(" ");

    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {

        var bandsInfo = response.data[0]

        var bandsData = `
Venue Name:     ${bandsInfo.venue.name}
Venue Location: ${bandsInfo.venue.city}
Date of Event:  ${moment.utc(bandsInfo.datetime).format("MM/DD/YYYY")}
`;

        console.log(bandsData);
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

function spotifyThis() {

    var songName = process.argv.slice(3).join(" ");

    if (!songName) {

        spotify
            .search({ type: 'track', query: 'The Sign', limit: 10 })
            .then(function (response) {

                var songInfo = response.tracks.items[5]
                // console.log(songInfo)

                var songData = `
Artist(s): ${songInfo.album.artists[0].name}
Song Name: ${songInfo.name}
Preview Link: ${songInfo.preview_url}
Album: ${songInfo.album.name}
`;

                console.log(songData);
            })
            .catch(function (err) {
                console.log(err);
            });


    } else {

        spotify
            .search({ type: 'track', query: songName, limit: 2 })
            .then(function (response) {

                var songInfo = response.tracks.items[0]

                var songData = `
Artist(s): ${songInfo.album.artists[0].name}
Song Name: ${songInfo.name}
Preview Link: ${songInfo.preview_url}
Album: ${songInfo.album.name}
`;

                console.log(songData);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

function movieThis() {

    var movie = process.argv.slice(3).join(" ");

    var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    if (!movie) {

        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&tomatoes=true&apikey=trilogy").then(
            function (response) {

                var movieInfo = response.data

                var movieData = `
Movie Title:            ${movieInfo.Title}
Release Year:           ${movieInfo.Year}
IMDB Rating:            ${movieInfo.imdbRating}
Rotten Tomatoes Rating: ${movieInfo.tomatoRating}
Country:                ${movieInfo.Country}
Language:               ${movieInfo.Language}
Actors:                 ${movieInfo.Actors}

Movie Plot: ${movieInfo.Plot}

`;

                console.log(movieData);

            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

    } else {

        axios.get(URL).then(
            function (response) {
                // console.log(JSON.stringify(response.data, null, 2));
                // console.log(response.data.Title)

                var movieInfo = response.data

                var movieData = `
Movie Title:            ${movieInfo.Title}
Release Year:           ${movieInfo.Year}
IMDB Rating:            ${movieInfo.imdbRating}
Rotten Tomatoes Rating: ${movieInfo.tomatoRating}
Country:                ${movieInfo.Country}
Language:               ${movieInfo.Language}
Actors:                 ${movieInfo.Actors}

Movie Plot: ${movieInfo.Plot}

`;

                console.log(movieData);

            })
            .catch(function (error) {
                if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    }
}

var liriCommand = process.argv[2];

switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    default:
        console.log("Not a recognized command");
};











