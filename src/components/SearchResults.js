import React, { useState } from "react";
import MetaInfo from "./MetaInfo";
import BottomNav from "./BottomNav";

const SearchResults = ({ results, setResults }) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [next, setNext] = useState(results[0].next);

  let audio = new Audio();

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

  const getNext = async () => {
    if (next) {
      await fetch("/search", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify({ track: next }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(next);
          console.log(data);
          setResults(data);
          setNext(data[0].next);
        });
    }
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
              <button className='btn-next' onClick={getNext}>
                Next 20
              </button>
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
