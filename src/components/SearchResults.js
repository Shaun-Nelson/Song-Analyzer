import React, { useState, useEffect } from "react";
import MetaInfo from "./MetaInfo";
import BottomNav from "./BottomNav";

const SearchResults = ({ results, setResults, next, setNext }) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let portrait = window.matchMedia("(orientation: portrait)");

  useEffect(() => {
    portrait.addEventListener("change", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth, portrait]);

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

  // const getNext = async () => {
  //   if (next) {
  //     await fetch("/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": "true",
  //         "Access-Control-Allow-Methods": "POST",
  //         "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //       },
  //       body: JSON.stringify({ track: next }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setResults(data);
  //         setNext(data[0].next);
  //         console.log(next);
  //       });
  //   }
  // };

  const titles = results.map((track) => {
    let artists = [];
    track.artists.forEach((artist) => artists.push(artist.name));
    const artistNames = artists.join(", ");

    return (
      <React.Fragment key={track.id}>
        <tr key={track.id}>
          <td>
            <div className='flex-container-tracks'>
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
          </td>
          <td>{artistNames}</td>
          <td>{track.title}</td>
        </tr>
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
              {/* <button className='btn-next' onClick={getNext}>
                Next 20
              </button> */}
              <table>
                <tbody>{titles}</tbody>
              </table>
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
