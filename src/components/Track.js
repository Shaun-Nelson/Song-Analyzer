import React, { useState, useEffect } from "react";

//TODO show all artists
//     showTrack toggle switch
//     style table
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
  console.log(apiData);
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
            <table>
              <tr>
                <th>Artist</th>
                <th>Title</th>
                <th>Duration</th>
                <th>BPM</th>
                <th>Key</th>
                <th>Energy</th>
                <th>Danceability</th>
              </tr>
              <tr>
                <td>{props.artists[0].name}</td>
                <td>{`${
                  props.title.length > 30
                    ? props.title.slice(0, 29) + "..."
                    : props.title
                }`}</td>
                <td>{`${Math.floor(
                  Math.round(apiData.duration_ms / 1000 / 60)
                )}:${Math.round(apiData.duration_ms / 1000)}`}</td>
                <td>{apiData.bpm}</td>
                <td>{apiData.key}</td>
                <td>{Math.round(apiData.energy * 100)}</td>
                <td>{Math.round(apiData.danceability * 100)}</td>
              </tr>
            </table>
          </div>
        </>
      )}
    </>
  );
};
export default Track;
