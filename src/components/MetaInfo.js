import React from "react";

const MetaInfo = (props) => {
  const ids = props.addedTracks.map((track) => {
    return (
      <li key={track.id} id={track.id}>
        {`${track.artists[0].name} - ${
          track.title.length > 40
            ? track.title.slice(0, 19) + "..."
            : track.title
        }`}
        <button
          className='btn-delete-track'
          onClick={() => {
            const songs = document.getElementsByTagName("li");
            for (let song of songs) {
              if (song.id === track.id) song.style.display = "none";
            }
          }}
        >
          -
        </button>
      </li>
    );
  });
  return (
    <>
      <section>
        <h2 className='meta-info-header'>Meta Info</h2>
        <ul className='meta-info-list'>{ids}</ul>
      </section>
    </>
  );
};

export default MetaInfo;
