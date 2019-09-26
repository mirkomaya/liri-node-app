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
-----------------------------
Venue Name:     ${bandsInfo.venue.name}
Venue Location: ${bandsInfo.venue.city}
Date of Event:  ${moment.utc(bandsInfo.datetime).format("MM/DD/YYYY")}
-----------------------------
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

    spotify
        .search({ type: 'track', query: songName, limit: 2 })
        .then(function (response) {
            // console.log(JSON.stringify(response.tracks, null, 2));
            //Artist
            console.log(response.tracks.items[0].album.artists[0].name);
            //Song name
            console.log(response.tracks.items[0].name);
            //Preview
            console.log(response.tracks.items[0].preview_url);
            //Album
            console.log(response.tracks.items[0].album.name);


        })
        .catch(function (err) {
            console.log(err);
        });


        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
}

var liriCommand = process.argv[2];

switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    default:
        console.log("Not a recognized command");
};











