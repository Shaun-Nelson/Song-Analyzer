import React, { useState } from "react";
import MetaInfo from "./MetaInfo";

//TODO show MetaInfo
//     play one song at a time
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
              console.log(addedTracks);
              console.log("SHOW ", showMetaInfo);
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
        <div className='flex-container-tracks'>
          <div className='flex-container-column'>
            <h2 className='track-results-header'>Preview and Add Tracks</h2>
            <ul className='track-results-list'>{titles}</ul>
          </div>
          {showMetaInfo && <MetaInfo addedTracks={addedTracks} />}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
