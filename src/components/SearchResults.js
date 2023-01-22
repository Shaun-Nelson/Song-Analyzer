import React, { useState } from "react";
import MetaInfo from "./MetaInfo";

//TODO get play/pause icon
//     make collapseable
//     show all artists
const SearchResults = (props) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [addedTracks, setAddedTracks] = useState([]);

  const titles = props.results.map((track) => {
    const audio = new Audio(track.preview);

    return (
      <>
        <li key={track.id}>
          <p>
            {`${track.artists[0].name} - ${
              track.title.length > 40
                ? track.title.slice(0, 19) + "..."
                : track.title
            }`}
          </p>

          <button
            className='btn-play'
            onClick={() => {
              audio.paused ? audio.play() : audio.pause();
            }}
          >
            {">||"}
          </button>

          <button
            className='btn-add-track'
            onClick={() => {
              setShowMetaInfo(true);
              if (!addedTracks.includes(track)) {
                setAddedTracks([...addedTracks, track]);
              }
            }}
          >
            +
          </button>
        </li>
      </>
    );
  });

  return (
    <>
      <section>
        <h2 className='track-results-header'>Preview and Add Tracks</h2>
        <ul className='track-results-list'>{titles}</ul>
      </section>
      {showMetaInfo && <MetaInfo addedTracks={addedTracks} />}
    </>
  );
};

export default SearchResults;
