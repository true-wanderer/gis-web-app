// Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-omnivore';

const Map = () => {
  const [layers, setLayers] = useState([]);

  const handleLayerAdd = (e) => {
    const newLayers = [...layers, e.layer];
    setLayers(newLayers);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
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
