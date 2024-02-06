import React, { useState } from "react";
import Map from './components/Map';
import SearchBox from './components/SearchBox';

import WelcomePage from "./components/WelcomePage";

const App = () => {
  const [selectPosition, setSelectPosition] = useState(null);
  const [showWelcomePage, setShowWelcomePage] = useState(true);

  const handleNext = () => {
    setShowWelcomePage(false);
  };

  return (
    <div>
      {showWelcomePage ? (
        <WelcomePage onNext={handleNext} />
      ) : (
        <>
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          <Map selectPosition={selectPosition} />
        </>
      )}
    </div>
  );
};

export default App;

