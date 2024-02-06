import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-omnivore';

const Map = ({ selectPosition }) => {
  const [layers, setLayers] = useState([]);
  const mapRef = React.createRef();

  const handleLayerAdd = (e) => {
    const newLayers = [...layers, e.layer];
    setLayers(newLayers);
  };

  useEffect(() => {
    // Center the map based on the selectPosition prop
    if (selectPosition && mapRef.current) {
      mapRef.current.setView([selectPosition.lat, selectPosition.lon], 13);
    }
  }, [selectPosition]);

  return (
    <MapContainer
      center={[51.505, -0.09]}  // Default center
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* FeatureGroup to handle drawn layers */}
      <FeatureGroup>
        {/* EditControl for drawing and editing */}
        <EditControl
          position="topright"
          onCreated={handleLayerAdd}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
          }}
        />
      </FeatureGroup>

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
