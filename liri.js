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
        .search({ type: 'track', query: songName })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
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











