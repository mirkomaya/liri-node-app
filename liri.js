require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

const axios = require('axios');

var fs = require("fs");


function concertThis() {

    var nodeArgs = process.argv;

    var bandName = "";

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {
            bandName = bandName + "+" + nodeArgs[i];
        } else {
            bandName += nodeArgs[i];
        }
    }

    var bandsQuery = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    axios.get(bandsQuery).then(
        function (data) {
            console.log(data.request.ClientRequest)
            // console.log("The movie's rating is: " + response.data.imdbRating);
        }
    );

};

var songName = process.argv[2]


function spotifyThis() {

    // var nodeArgs = process.argv;

    // var songName = "";

    // for (var i = 2; i < nodeArgs.length; i++) {

    //     if (i > 2 && i < nodeArgs.length) {
    //         songName = songName + "+" + nodeArgs[i];
    //     } else {
    //         songName += nodeArgs[i];
    //     }
    // }

    // console.log(songName)

    // var songName = process.argv[2]

    // spotify
    //     .search({ type: 'track', query: songName })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });

    spotify
        .search({ type: 'track', query: "Can't Stop" })
        .then(function (response) {
            console.log(response.tracks.items[0]);
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
}










