import React, { useState } from "react";
import MetaInfo from "./MetaInfo";
import Track from "./Track";

//TODO play one song at a time
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
          <div className='flex-container-tracks'>
            <p>
              {`${track.artists[0].name} - ${
                track.title.length > 30
                  ? track.title.slice(0, 29) + "..."
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
          </div>
        </li>
      </>
    );
  });

  return (
    <>
      <div className='flex-container-tracks'>
        <section>
          <h2 className='track-results-header'>Preview and Add Tracks</h2>
          <ul className='track-results-list'>{titles}</ul>
        </section>
        {showMetaInfo && <MetaInfo addedTracks={addedTracks} />}
      </div>
    </>
  );
};

export default SearchResults;
