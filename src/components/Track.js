import React, { useState, useEffect } from "react";

//TODO fetch api data
//     showTrack toggle switch
//
const Track = (props) => {
  const [apiData, setApiData] = useState("");
  const [showTrack, setShowTrack] = useState(true);

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    await fetch("/analysis", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ track: props.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        console.log(apiData);
      });
  };

  return (
    <>
      {showTrack && (
        <>
          <div className='flex-container-tracks'>
            <button className='btn-delete-track'>-</button>
            <p>
              {`${props.artists[0].name} - ${
                props.title.length > 30
                  ? props.title.slice(0, 29) + "..."
                  : props.title
              }`}
            </p>
          </div>
        </>
      )}
    </>
  );
};
export default Track;
