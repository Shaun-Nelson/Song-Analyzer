import React, { useState } from "react";
import MetaInfo from "./MetaInfo";

//TODO
//     make collapseable
const SearchResults = (props) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const titles = props.results.map((track) => {
    const audio = new Audio(track.preview);

    return (
      <React.Fragment key={track.id}>
        <li key={track.id}>
          <div className='flex-container-tracks'>
            <span>
              {track.artists.length > 1
                ? `${track.artists[0].name}  ft... - `
                : `${track.artists[0].name}  - `}
            </span>
            <span>
              {track.title.length > 30
                ? track.title.slice(0, 29) + "..."
                : track.title}
            </span>

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
                if (!addedTracks.includes(track)) {
                  setAddedTracks([...addedTracks, track]);
                }
              }}
            >
              +
            </button>
          </div>
        </li>
      </React.Fragment>
    );
  });

  return (
    <>
      <div className='flex-container-tracks'>
        <section>
          <button
            className='btn-collapse'
            onClick={() => setShowResults(!showResults)}
          >
            &#8644;
          </button>
          {showResults && (
            <>
              <h2 className='track-results-header'>Preview and Add Tracks</h2>
              <ul className='track-results-list'>{titles}</ul>
            </>
          )}
        </section>
        <MetaInfo addedTracks={addedTracks} />
      </div>
    </>
  );
};

export default SearchResults;
