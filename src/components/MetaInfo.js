import React, { useState, useEffect } from "react";
import Track from "./Track";

//TODO get track data into one table

const MetaInfo = (props) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const tracks = props.addedTracks.map((track) => {
    return (
      <li key={track.id}>
        <Track id={track.id} title={track.title} artists={track.artists} />
      </li>
    );
  });

  useEffect(
    () =>
      props.addedTracks.length > 0
        ? setShowMetaInfo(true)
        : setShowMetaInfo(false),
    [props.addedTracks]
  );
  return (
    <>
      {showMetaInfo && (
        <div className='flex-container-tracks'>
          <section>
            <button
              className='btn-collapse'
              onClick={() => setShowInfo(!showInfo)}
            >
              &#8644;
            </button>
            {showInfo && (
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
                  </thead>
                </table>
                <ul className='meta-info-list'>{tracks}</ul>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default MetaInfo;
