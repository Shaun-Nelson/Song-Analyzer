const express = require("express");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const client_id = "076df578e4f54f789d789c0981db4952";
const client_secret = "55d1b69ca654403ca5c8aa5083d3cd2f";
const redirect_uri = "http://localhost:3000/callback";
const trackId = "1azxgcGDD3ht64TIR1pMAU";

let spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("GET received"));

app.post("/", (req, res) => {
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

  let apiTrackData = {};
  setTimeout(() =>
    spotifyApi.searchTracks(req.body.track).then(
      (data) =>
        data.body.tracks.items.forEach(
          (track) => {
            apiTrackData[title] = track.name;
            apiTrackData[artists] = track.artists;
            console.log(JSON.stringify(apiTrackData));
            res.send(JSON.stringify(apiTrackData));
            res.status(200);

            // apiTrackData[track] = {
            //   name: track.name,
            //   artists: track.artists,
            //   duration: track.duration_ms,
            //   link: track.href,
            //   id: track.id,
            // preview: preview_url,
          },
          (err) => console.log(err)
        ),
      5000
    )
  );
});

// setTimeout(
//   () =>
//     spotifyApi.getAudioFeaturesForTrack(req.body.track).then(
//       function (data) {
//         let apiData = {
//           danceability: data.body.danceability,
//           energy: data.body.energy,
//           key: data.body.key,
//           tempo: data.body.tempo,
//         };
//         console.log(data.body);
//         console.log("tempo ", Math.floor(Math.round(apiData.tempo)));
//         res.send(apiData.json());
//         res.status(200);
//       },
//       function (err) {
//         console.log(err);
//       }
//     ),
//   1000
// );

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
