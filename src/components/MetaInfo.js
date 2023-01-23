import React, { useState, useEffect } from "react";
import Track from "./Track";

const MetaInfo = (props) => {
  const [showMetaInfo, setShowMetaInfo] = useState(true);

  useEffect(() => {}, [props.addedTracks]);
  // if (props.addedTracks) setShowMetaInfo(true);

  const tracks = props.addedTracks.map((track) => {
    return (
      <li key={track.id}>
        <Track id={track.id} title={track.title} artists={track.artists} />
      </li>
    );
  });
  return (
    <>
      {showMetaInfo && (
        <section>
          <h2 className='meta-info-header'>Meta Info</h2>
          <ul className='meta-info-list'>{tracks}</ul>
        </section>
      )}
    </>
  );
};

export default MetaInfo;
