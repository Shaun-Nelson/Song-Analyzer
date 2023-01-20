import React, { useState } from "react";
import SearchResults from "./SearchResults";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  return (
    <>
      <div className='flex-container'>
        <form
          className='search'
          onSubmit={async (e) => {
            e.preventDefault();
            if (search) {
              await fetch("/", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Allow-Credentials": "true",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
                body: document.getElementById("btn-track").checked
                  ? JSON.stringify({ track: search })
                  : JSON.stringify({ track: "artist:" + search }),
              })
                .then((res) => res.json())
                .then((data) => {
                  setResults(data);
                  console.log(data);
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
            className='searchbar'
            id='searchbar'
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by Track or Artist.'
          ></input>
          <input className='btn-submit' value='Search' type='submit'></input>
        </form>
      </div>
      {/* {search && <SearchResults results={results} />} */}
    </>
  );
};

export default Searchbar;
