require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

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
            console.log(data.request.ClientRequest )
            // console.log("The movie's rating is: " + response.data.imdbRating);
        }
    );

}

//06a0bf01f7da2f97b38deff3c911b9cd

var liriCommand = process.argv[2];

switch (liriCommand) {
    case "concert-this":
        concertThis();
        break;
}











// var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }
//     console.log(data);
// });





