const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const SpotifyWebApi = require("spotify-web-api-node");

const client_id = "076df578e4f54f789d789c0981db4952";
const client_secret = "55d1b69ca654403ca5c8aa5083d3cd2f";

let spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), (err) =>
    res.status(500).send(err)
  );
});

app.post("/search", (req, res) => {
  //Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );

  let apiTrackData = [];
  setTimeout(
    () =>
      spotifyApi.searchTracks(req.body.track).then(
        (data) => {
          let tracks = data.body.tracks.items;
          tracks.forEach((track) => {
            let trackObject = {};
            trackObject["artists"] = track.artists;
            trackObject["href"] = track.href;
            trackObject["id"] = track.id;
            trackObject["title"] = track.name;
            trackObject["preview"] = track.preview_url;
            apiTrackData.push(trackObject);
          });
          res.send(JSON.stringify(apiTrackData));
        },
        (err) => console.log(err)
      ),
    10000
  );
});

app.post("/analysis", (req, res) => {
  //Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );

  setTimeout(
    () =>
      spotifyApi.getAudioFeaturesForTrack(req.body.track).then(
        (data) => {
          let trackAnalysisObject = {};
          trackAnalysisObject["danceability"] = data.body.danceability;
          trackAnalysisObject["energy"] = data.body.energy;
          trackAnalysisObject["key"] = data.body.key;
          trackAnalysisObject["bpm"] = data.body.tempo;
          trackAnalysisObject["duration_ms"] = data.body.duration_ms;

          res.send(JSON.stringify(trackAnalysisObject));
        },
        (err) => console.log(err)
      ),
    100
  );
});

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
