import React, { useState, useEffect } from "react";

//TODO Nav doesn't obstruct search results
//     Add symbols for labels

const BottomNav = ({ search, data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let portrait = window.matchMedia("(orientation: portrait)");

  useEffect(() => {
    portrait.addEventListener("change", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth, portrait]);

  return (
    <div className='flex-container-nav'>
      <button className='btn-nav-search' onClick={search}>
        Search
      </button>
      <button className='btn-nav-data' onClick={data}>
        {window.innerHeight > windowWidth ? "Data" : "Data/Analysis"}
      </button>
    </div>
  );
};

export default BottomNav;
