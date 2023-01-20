import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import SearchResults from "./components/SearchResults";

const client_id = "076df578e4f54f789d789c0981db4952";
const client_secret = "55d1b69ca654403ca5c8aa5083d3cd2f";
const redirect_uri = "http://localhost:3000/callback";

const App = () => {
  const trackId = "1azxgcGDD3ht64TIR1pMAU";

  return (
    <>
      <Searchbar />
    </>
  );
};

export default App;
