import React from "react";

//TODO render all artist instead of one
const SearchResults = (props) => {
  const titles = props.results.map((track) => {
    return (
      <>
        <li key={track.id}>
          <a href={track.preview} target='_blank' rel='norreferrer'>{`${
            track.artists[0].name
          } - ${
            track.title.length > 40
              ? track.title.slice(0, 19) + "..."
              : track.title
          }`}</a>
          <button className='btn-add-track'>+</button>
        </li>
      </>
    );
  });
  return (
    <section>
      <h2 className='track-info-header'>Preview Tracks</h2>
      <div className='flex-container-column'>
        <ul className='track-info-list'>{titles}</ul>
      </div>
    </section>
  );
};

export default SearchResults;
