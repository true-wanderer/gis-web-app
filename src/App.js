// App.js
// App.js
// App.j
import React, { useState } from "react";
import Map from './components/Map';

import SearchBox from './components/SearchBox';


const App = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  return (
    <div>
      <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      <Map  selectPosition={selectPosition} />
       

       
    </div>
  );
};

export default App;
