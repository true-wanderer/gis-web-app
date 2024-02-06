
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, FeatureGroup, LayersControl } from 'react-leaflet';
// import { EditControl } from 'react-leaflet-draw';
// import L from 'leaflet';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet/dist/leaflet.css';

// const { BaseLayer } = LayersControl;

// const Map = ({ selectPosition }) => {
//   const [layers, setLayers] = useState([]);
//   const [showSearchBox, setShowSearchBox] = useState(false);
//   const mapRef = React.createRef();

//   const handleLayerAdd = (e) => {
//     const { layer } = e;

//     if (layer) {
//       const newLayers = [...layers, layer];
//       setLayers(newLayers);
//     }
//   };

//   useEffect(() => {
//     // Center the map based on the selectPosition prop
//     if (selectPosition && mapRef.current) {
//       mapRef.current.setView([selectPosition.lat, selectPosition.lon], 13);
//     }
//   }, [selectPosition]);

//   return (
//     <MapContainer
//       center={[51.505, -0.09]}  // Default center
//       zoom={13}
//       style={{ height: '100vh', width: '100%' }}
//       ref={mapRef}
//     >
//       {/* FeatureGroup to handle drawn layers */}
//       <FeatureGroup>
//         {/* EditControl for drawing and editing */}
//         <EditControl
//           position="topright"
//           onCreated={handleLayerAdd}
//           draw={{
//             rectangle: false,
//             circle: false,
//             marker: false,
//           }}
//         />
//       </FeatureGroup>

//       {/* Layer Control */}
//       <LayersControl position="topright">
//         {/* Standard OSM Layer */}
//         <BaseLayer checked name="Standard">
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//         </BaseLayer>

//         {/* Humanitarian OSM Layer */}
//         <BaseLayer name="Humanitarian">
//           <TileLayer
//             url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//         </BaseLayer>

//         {/* Cycle OSM Layer */}
//         <BaseLayer name="Cycle">
//           <TileLayer
//             url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//         </BaseLayer>
//       </LayersControl>

//       {/* Display imported layers */}
//       {layers.map((layer, index) => (
//         <div key={index}>
//           <L.GeoJSON data={layer.toGeoJSON()} />
//         </div>
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;
import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  FeatureGroup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

const { BaseLayer } = LayersControl;

const Map = ({ selectPosition }) => {
  const [layers, setLayers] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    // Center the map based on the selectPosition prop
    if (selectPosition) {
      mapRef.current.setView(
        [selectPosition.lat, selectPosition.lon],
        13
      );
    }
  }, [selectPosition]);

  const mapRef = React.useRef();

  const handleLayerAdd = (e) => {
    const { layer } = e;
    if (layer) {
      setLayers([...layers, layer]);
    }
  };

  const searchIcon = new L.Icon({
    iconUrl: 'path/to/search-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleSearchIconClick = () => {
    setShowSearchBox(true);
  };

  const DrawControl = () => {
    const map = useMapEvents({
      click: () => {
        setShowSearchBox(false);
      },
    });

    return (
      <EditControl
        position="topright"
        onCreated={handleLayerAdd}
        draw={{
          rectangle: false,
          circle: false,
          marker: false,
        }}
      />
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      ref={mapRef}
    >
      {/* FeatureGroup to handle drawn layers */}
      <FeatureGroup>
        <DrawControl />
      </FeatureGroup>

      {/* Layer Control */}
      <LayersControl position="topright">
        {/* Standard OSM Layer */}
        <BaseLayer checked name="Standard">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>

        {/* Humanitarian OSM Layer */}
        <BaseLayer name="Humanitarian">
          <TileLayer
            url="https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>

        {/* Cycle OSM Layer */}
        <BaseLayer name="Cycle">
          <TileLayer
            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
      </LayersControl>

      {/* Display imported layers */}
      {layers.map((layer, index) => (
        <div key={index}>
          <L.GeoJSON data={layer.toGeoJSON()} />
        </div>
      ))}
    </MapContainer>
  );
};

export default Map;
