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

    // var nodeArgs = process.argv;

    // var songName = "";

    // for (var i = 3; i < nodeArgs.length; i++) {

    //     if (i > 3 && i < nodeArgs.length) {
    //         songName = songName + "+" + nodeArgs[i];
    //     } else {
    //         songName += nodeArgs[i];
    //     }
    // }

    // console.log(songName)

    var songName = process.argv.slice(3).join(" ");

    // spotify
    //     .search({ type: 'track', query: songName })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            console.log(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });


    // spotify
    //     .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    //     .then(function (data) {
    //         console.log(data);
    //     })
    //     .catch(function (err) {
    //         console.error('Error occurred: ' + err);
    //     });
}



//06a0bf01f7da2f97b38deff3c911b9cd

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











