const SpotifyWebApi = require("spotify-web-api-node");

const client_id = "076df578e4f54f789d789c0981db4952";
const client_secret = "55d1b69ca654403ca5c8aa5083d3cd2f";
const redirect_uri = "http://localhost:3000/callback";
const trackId = "1azxgcGDD3ht64TIR1pMAU";

let spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
});

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
    spotifyApi.searchTracks("impala").then(
      (data) => console.log("DATA", data.body),
      (err) => console.log(err)
    ),
  1000
);

// setTimeout(
//   () =>
//     spotifyApi.getAudioFeaturesForTrack(trackId).then(
//       function (data) {
//         let apiData = {
//           danceability: data.body.danceability,
//           energy: data.body.energy,
//           key: data.body.key,
//           tempo: data.body.tempo,
//         };
//         console.log(data.body);
//         console.log("tempo ", Math.floor(Math.round(apiData.tempo)));
//       },
//       function (err) {
//         console.log(err);
//       }
//     ),
//   1000
// );
