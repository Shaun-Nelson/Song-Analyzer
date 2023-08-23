const express = require("express");
const path = require("path");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/search", async (req, res) => {
  try {
    //Retrieve an access token.
    if (!spotifyApi.getAccessToken()) {
      await spotifyApi.clientCredentialsGrant().then(
        function (data) {
          console.log("The access token expires in " + data.body["expires_in"]);
          console.log("The access token is " + data.body["access_token"]);

          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body["access_token"]);
          spotifyApi.setRefreshToken(data.body["refresh_token"]);
        },
        function (err) {
          console.log(
            "Something went wrong when retrieving an access token",
            err
          );
        }
      );
    }

    let apiTrackData = [];
    await spotifyApi.searchTracks(req.body.track).then((data) => {
      if (data.body.tracks.items.length !== 0) {
        let tracks = data.body.tracks.items;
        let next = data.body.tracks.next ? data.body.tracks.next : "";
        tracks.forEach((track) => {
          let trackObject = {};
          trackObject["artists"] = track.artists;
          trackObject["href"] = track.href;
          trackObject["id"] = track.id;
          trackObject["title"] = track.name;
          trackObject["preview"] = track.preview_url;
          trackObject["next"] = next;
          apiTrackData.push(trackObject);
        });
        res.status(200).json(apiTrackData);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/analysis", async (req, res) => {
  try {
    if (!spotifyApi.getAccessToken()) {
      //Retrieve an access token.
      await spotifyApi.clientCredentialsGrant().then(
        function (data) {
          console.log("The access token expires in " + data.body["expires_in"]);
          console.log("The access token is " + data.body["access_token"]);

          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body["access_token"]);
          spotifyApi.setRefreshToken(data.body["refresh_token"]);
        },
        function (err) {
          console.log(
            "Something went wrong when retrieving an access token",
            err
          );
        }
      );
    }

    await spotifyApi.getAudioFeaturesForTrack(req.body.track).then((data) => {
      let trackAnalysisObject = {};
      trackAnalysisObject["danceability"] = data.body.danceability;
      trackAnalysisObject["energy"] = data.body.energy;
      trackAnalysisObject["key"] = data.body.key;
      trackAnalysisObject["bpm"] = data.body.tempo;
      trackAnalysisObject["duration_ms"] = data.body.duration_ms;

      res.status(200).json(trackAnalysisObject);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });
}

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
