import React, { useState } from "react";
import MetaInfo from "./MetaInfo";
import BottomNav from "./BottomNav";

const SearchResults = ({ results }) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [showMetaInfo, setShowMetaInfo] = useState(false);

  let audio = new Audio();

  let portrait = window.matchMedia("(orientation: portrait)");

  const deleteTrack = (id) => {
    setAddedTracks(addedTracks.filter((track) => track.id !== id));
  };

  const goToSearch = () => {
    setShowResults(true);
    setShowMetaInfo(false);
  };

  const goToData = () => {
    setShowResults(false);
    setShowMetaInfo(true);
  };

  const titles = results.map((track) => {
    return (
      <React.Fragment key={track.id}>
        <li key={track.id}>
          <div className='flex-container-tracks-sb'>
            {window.innerHeight > window.innerWidth ? (
              <span className='artist-and-title'>
                {track.artists.length > 1
                  ? `${track.artists[0].name}  ft... - `
                  : `${track.artists[0].name}  - `}
                {track.title.length > 20
                  ? track.title.slice(0, 19) + "..."
                  : track.title}
              </span>
            ) : (
              <span className='artist-and-title'>
                {track.artists.length > 1
                  ? `${track.artists[0].name}  ft... - `
                  : `${track.artists[0].name}  - `}
                {track.title}
              </span>
            )}
            <div>
              <button
                className='btn-play'
                onClick={() => {
                  if (audio.src !== track.preview) {
                    audio.src = track.preview;
                  }
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
          {showResults && (
            <>
              <h2 className='track-results-header'>Preview and Add Tracks</h2>
              <ul className='track-results-list'>{titles}</ul>
            </>
          )}
        </section>
      </div>
      {showMetaInfo && (
        <MetaInfo addedTracks={addedTracks} deleteTrack={deleteTrack} />
      )}
      <BottomNav search={goToSearch} data={goToData} />
    </>
  );
};

export default SearchResults;
