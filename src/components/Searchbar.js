import React, { useState } from "react";
import SearchResults from "./SearchResults";

//TODO get next 20 results w/ btn

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  return (
    <>
      <div className='flex-container'>
        <form
          className='search'
          onSubmit={async (e) => {
            e.preventDefault();

            let payload;

            if (document.getElementById("btn-track").checked) {
              payload = JSON.stringify({ track: search });
            } else if (document.getElementById("btn-artist").checked) {
              payload = JSON.stringify({ track: "artist:" + search });
            } else if (document.getElementById("btn-genre").checked) {
              payload = JSON.stringify({ track: "genre:" + search });
            }

            if (search) {
              await fetch("/search", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  // "Access-Control-Allow-Origin": "*",
                  // "Access-Control-Allow-Credentials": "true",
                  // "Access-Control-Allow-Methods": "POST",
                  // "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
                body: payload,
              })
                .then((res) => res.json())
                .then((data) => {
                  setResults(data);
                  setSearch("");
                });
            }
          }}
        >
          <input
            className='btn-search-radio'
            type='radio'
            name='search'
            id='btn-track'
            defaultChecked
            value='By Track Title'
          ></input>
          <label htmlFor='btn-track' className='search-label'>
            By Track Title
          </label>
          <input
            className='btn-search-radio'
            type='radio'
            name='search'
            id='btn-artist'
            value='By Artist'
          ></input>
          <label htmlFor='btn-artist' className='search-label'>
            By Artist
          </label>
          <input
            className='btn-search-radio'
            type='radio'
            name='search'
            id='btn-genre'
            value='By Genre'
          ></input>
          <label htmlFor='btn-genre' className='search-label'>
            By Genre
          </label>
          <input
            className='searchbar'
            id='searchbar'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by Track, Artist, or Genre.'
          ></input>
          <input className='btn-submit' value='Search' type='submit'></input>
        </form>
      </div>
      {results && <SearchResults results={results} />}
    </>
  );
};

export default Searchbar;
