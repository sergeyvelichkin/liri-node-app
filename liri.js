require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs")
var arg = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");

console.log(arg2);
if (arg === "spotify-this-song") {
    var spotify = new Spotify(keys.spotify);
    if (arg2 == '') { arg2 = "The sign, Ace of Base" };
    spotify.search({ type: 'track', query: arg2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < 10; i++) {
            console.log("------");
            console.log("Artists : " + data.tracks.items[i].artists[0].name);
            console.log("Song's name : " + data.tracks.items[i].name);
            console.log('Link : ' + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("---------");

        }
    });
}
else if (arg === "my-tweets") {


    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'btc_manager' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log("------");
                console.log("Date : " + tweets[i].created_at);
                console.log("Tweet : " + tweets[i].text);
                console.log("---------");

            }
        }
    });
}

else if (arg === "movie-this") {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {


            // console.log(JSON.parse(body));
            console.log("------");
            console.log("Title : " + JSON.parse(body).Title);
            console.log("OMDB Rating : " + JSON.parse(body).Ratings[0].value);
            console.log("Rotten Tomatoes Rating  : " + JSON.parse(body).Ratings[1].value);
            console.log("Country : " + JSON.parse(body).Country);
            console.log("Language : " + JSON.parse(body).Language);
            console.log("Plot : " + JSON.parse(body).Plot);
            console.log("Actors : " + JSON.parse(body).Actors);
            console.log("---------");
        }
    });
}

else if (arg == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        var argum = data.split(",")[0];
        var arg2 = data.split(",")[1];


        if (argum === "spotify-this-song") {
            var spotify = new Spotify(keys.spotify);
            if (arg2 == '') { arg2 = "The sign, Ace of Base" };
            spotify.search({ type: 'track', query: arg2 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                for (let i = 0; i < 10; i++) {
                    console.log("------");
                    console.log("Artists : " + data.tracks.items[i].artists[0].name);
                    console.log("Song's name : " + data.tracks.items[i].name);
                    console.log('Link : ' + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                    console.log("---------");

                }
            });
        }
        else if (argum === "my-tweets") {


            var client = new Twitter(keys.twitter);
        
            var params = { screen_name: 'btc_manager' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    for (let i = 0; i < 20; i++) {
                        console.log("------");
                        console.log("Date : " + tweets[i].created_at);
                        console.log("Tweet : " + tweets[i].text);
                        console.log("---------");
        
                    }
                }
            });
        }
        else if (argum === "movie-this") {

            // Then run a request to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy";
        
            request(queryUrl, function (error, response, body) {
        
                // If the request is successful
                if (!error && response.statusCode === 200) {
        
        
                    // console.log(JSON.parse(body));
                    console.log("------");
                    console.log("Title : " + JSON.parse(body).Title);
                    console.log("OMDB Rating : " + JSON.parse(body).Ratings[0].value);
                    console.log("Rotten Tomatoes Rating  : " + JSON.parse(body).Ratings[1].value);
                    console.log("Country : " + JSON.parse(body).Country);
                    console.log("Language : " + JSON.parse(body).Language);
                    console.log("Plot : " + JSON.parse(body).Plot);
                    console.log("Actors : " + JSON.parse(body).Actors);
                    console.log("---------");
                }
            });
        }
    });
}