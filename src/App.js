import React from "react";

import Autocomple from "./Autocomplete/Autocomplete";

const arrSuggestions = [
  "Louis Vuitton",
  "Hermès",
  "Gucci",
  "Chanel",
  "Rolex",
  "Cartier",
  "Burberry",
  "Prada",
  "Dior",
  "YSL"
];
function App() {
  return (
    <div className="App">
      <Autocomple suggestions={arrSuggestions} />
    </div>
  );
}

export default App;
