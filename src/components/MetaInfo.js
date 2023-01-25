import React, { useState, useEffect } from "react";
import Track from "./Track";

//TODO get track data into one table

const MetaInfo = ({ addedTracks, deleteTrack }) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [showTable, setShowTable] = useState(true);

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
    () =>
      addedTracks.length > 0 ? setShowMetaInfo(true) : setShowMetaInfo(false),
    [addedTracks]
  );
  return (
    <>
      {showMetaInfo && (
        <div className='flex-container-tracks'>
          <section>
            <button
              className='btn-collapse'
              onClick={() => setShowTable(!showTable)}
            >
              &#8644;
            </button>
            {showTable && (
              <>
                <h2 className='meta-info-header'>Meta Info</h2>
                <table className='table'>
                  <thead>
                    {/* <button className='btn-sort' onClick={() => tracks.sort()}>
                      Sort
                    </button> */}
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
                    {tracks}
                  </thead>
                </table>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default MetaInfo;
