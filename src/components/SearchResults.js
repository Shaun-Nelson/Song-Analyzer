import React, { useState } from "react";
import MetaInfo from "./MetaInfo";

//TODO one audio at a time
//     re-add song after delete
const SearchResults = ({ results }) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const deleteTrack = (id) =>
    setAddedTracks(addedTracks.filter((track) => track.id !== id));

  const titles = results.map((track) => {
    const audio = new Audio(track.preview);

    return (
      <React.Fragment key={track.id}>
        <li key={track.id}>
          <div className='flex-container-tracks-sb'>
            <span className='artist-and-title'>
              {track.artists.length > 1
                ? `${track.artists[0].name}  ft... - `
                : `${track.artists[0].name}  - `}
              {track.title.length > 20
                ? track.title.slice(0, 19) + "..."
                : track.title}
            </span>
            <div>
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
          </div>
        </li>
      </React.Fragment>
    );
  });

  return (
    <>
      <div className='flex-container-tracks'>
        <section className='results-section'>
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
          {window.innerWidth <= 768 && (
            <MetaInfo addedTracks={addedTracks} deleteTrack={deleteTrack} />
          )}
        </section>
        {window.innerWidth >= 768 && (
          <MetaInfo addedTracks={addedTracks} deleteTrack={deleteTrack} />
        )}
      </div>
    </>
  );
};

export default SearchResults;
