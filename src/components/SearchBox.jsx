
// import React, { useState } from "react";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import Divider from "@material-ui/core/Divider";
// import SearchIcon from "@material-ui/icons/Search";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// const params = {
//   q: "",
//   format: "json",
//   addressdetails: "addressdetails",
// };

// const SearchBox = (props) => {
//   const { selectPosition, setSelectPosition } = props;
//   const [searchText, setSearchText] = useState("");
//   const [listPlace, setListPlace] = useState([]);

//   const handleSearch = () => {
//     const searchParams = {
//       q: searchText,
//       format: "json",
//       addressdetails: 1,
//       polygon_geojson: 0,
//     };
//     const queryString = new URLSearchParams(searchParams).toString();
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };

//     fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         console.log(JSON.parse(result));
//         setListPlace(JSON.parse(result));
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   const handleSelect = (item) => {
//     setSelectPosition(item);
//     // Clear the search results after selecting an option
//     setListPlace([]);
//   };

//   return (
//     <div className="search-box-container">
//       <div className="search-box-input">
//         <OutlinedInput
//           style={{ width: "100%" }}
//           value={searchText}
//           onChange={(event) => {
//             setSearchText(event.target.value);
//           }}
//           placeholder="Enter a location"
//         />
//       </div>
//       <div className="search-box-button">
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<SearchIcon />}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </div>
//       <div className="search-results">
//         <List component="nav" aria-label="search results">
//           {listPlace.map((item) => (
//             <div key={item?.place_id}>
//               <ListItem
//                 button
//                 onClick={() => {
//                   handleSelect(item);
//                 }}
//               >
//                 <ListItemIcon>
//                   <img
//                     src="./placeholder.png"
//                     alt="Placeholder"
//                     style={{ width: 38, height: 38 }}
//                   />
//                 </ListItemIcon>
//                 <ListItemText primary={item?.display_name} />
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>
//       </div>
//     </div>
//   );
// };

// export default SearchBox;
import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const SearchBox = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const handleSearch = () => {
    const searchParams = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(searchParams).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleSelect = (item) => {
    setSelectPosition(item);
    // Clear the search results after selecting an option
    setListPlace([]);
    // Hide the search box
    setShowSearchBox(false);
  };

  const handleShowSearchBox = () => {
    setShowSearchBox(true);
  };

  return (
    <div className="search-box-container">
      {!showSearchBox && (
        <div className="search-box-icon">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleShowSearchBox}
          >
            Search
          </Button>
        </div>
      )}
      {showSearchBox && (
        <div className="search-box-input">
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            placeholder="Enter a location"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      )}
      {showSearchBox && (
        <div className="search-results">
          <List component="nav" aria-label="search results">
            {listPlace.map((item) => (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    handleSelect(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
