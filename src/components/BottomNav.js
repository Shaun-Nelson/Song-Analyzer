import React, { useState, useEffect } from "react";

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
        {portrait ? "Data" : "Data/Analysis"}
      </button>
    </div>
  );
};

export default BottomNav;
