import React from "react";
import { useState } from "react";
import Track from "./Track";

const MetaInfo = (props) => {
  const [showMetaInfo, setShowMetaInfo] = useState(true);

  if (props.addedTracks) setShowMetaInfo(true);

  const tracks = props.addedTracks.map((track) => {
    return (
      <ul>
        <li key={track.id} id={track.id}>
          {/* {props.addedTracks.map((track) => (
            <Track id={track.id} title={track.title} artists={track.artists} />
          ))} */}
          <button
            className='btn-delete-track'
            onClick={() => {
              let index = props.addedTracks.indexOf(track);
              props.addedTracks.splice(index, 1);
              if (props.addedTracks.length === 0) setShowMetaInfo(false);

              const songs = document.getElementsByTagName("li");
              for (let song of songs) {
                if (song.id === track.id) song.remove();
              }
            }}
          >
            -
          </button>
          {`${track.artists[0].name} - ${
            track.title.length > 30
              ? track.title.slice(0, 29) + "..."
              : track.title
          }`}
        </li>
      </ul>
    );
  });
  return (
    <>
      <section>
        <h2 className='meta-info-header'>Meta Info</h2>
        <ul className='meta-info-list'>{tracks}</ul>
      </section>
    </>
  );
};

export default MetaInfo;
