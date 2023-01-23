import React, { useState, useEffect } from "react";

//TODO sort categories
//     style table
//     convert key to letter
const Track = (props) => {
  const [apiData, setApiData] = useState("");
  const [showTrack, setShowTrack] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await fetch("/analysis", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ track: props.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
      });
  };

  const keyConverter = {
    0: "C",
    1: "C#",
    2: "D",
    3: "E♭",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "B♭",
    11: "B",
  };

  let artists = [];
  props.artists.forEach((artist) => artists.push(artist.name));
  const artistList = artists.join(", ");

  return (
    <>
      {showTrack && (
        <>
          <div className='flex-container-tracks'>
            <button
              className='btn-delete-track'
              onClick={() => setShowTrack(false)}
            >
              -
            </button>
            <table className='table'>
              <tbody>
                <tr>
                  <th>{"Artist(s)"}</th>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>BPM</th>
                  <th>Key</th>
                  <th>Energy</th>
                  <th>Danceability</th>
                </tr>
                <tr>
                  <td>{artistList}</td>
                  <td>{`${
                    props.title.length > 30
                      ? props.title.slice(0, 29) + "..."
                      : props.title
                  }`}</td>
                  <td>{`${Math.floor(
                    Math.round(apiData.duration_ms / 1000 / 60)
                  )}:${Math.round(apiData.duration_ms / 1000)}`}</td>
                  <td>{apiData.bpm}</td>
                  <td>{keyConverter[apiData.key]}</td>
                  <td>{Math.round(apiData.energy * 100) + "%"}</td>
                  <td>{Math.round(apiData.danceability * 100) + "%"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
export default Track;
