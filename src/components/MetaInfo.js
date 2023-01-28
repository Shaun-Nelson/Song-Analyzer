import React, { useState, useEffect } from "react";
import Track from "./Track";

//TODO sort categories

const MetaInfo = ({ addedTracks, deleteTrack }) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);

  const tracks = addedTracks.map((track) => {
    return (
      <Track
        id={track.id}
        title={track.title}
        artists={track.artists}
        addedTracks={addedTracks}
        deleteTrack={deleteTrack}
      />
    );
  });

  useEffect(
    () => (tracks.length > 0 ? setShowMetaInfo(true) : setShowMetaInfo(false)),
    [tracks]
  );

  return (
    <>
      {showMetaInfo && (
        <section>
          <>
            <h2 className='meta-info-header'>Meta Info</h2>
            <table className='table'>
              <thead>
                <tr>
                  <th></th>
                  <th>{"Artist(s)"}</th>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>BPM</th>
                  <th>Key</th>
                  <th>Energy</th>
                  <th>Danceability</th>
                </tr>
              </thead>
              <tbody>{tracks}</tbody>
            </table>
          </>
        </section>
      )}
    </>
  );
};

export default MetaInfo;
