import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle flying to the selected location
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
};

// Updated coordinates (lat, lng) format for Leaflet
const locations = [
  {
    id: 'india',
    city: 'India',
    flag: 'in',
    coordinates: [22.0, 78.0],
    zoom: 5,
    markers: [
      { name: 'Punjab', coords: [30.9009, 75.8572], geojsonFile: 'punjab' },
      { name: 'Gujarat', coords: [23.0225, 72.5714], geojsonFile: 'gujarat' }
    ],
    address: [
      "SCO No. 09-Ground Floor, Aero View Plaza, Airport Road, Dyalpura, Punjab - 140603",
      "Call us +91-90565-44487",
      "310 - Sampada, Navarangpura, Ahmedabad",
      "Gujarat - 380009"
    ]
  },
  {
    id: 'uk',
    city: 'UK',
    flag: 'gb',
    coordinates: [54.0, -2.0],
    zoom: 6,
    markers: [
      { name: 'London', coords: [51.5074, -0.1278], geojsonFile: null }
    ],
    address: [
      "20-22 Wenlock Road, Hoxton, London N1 7GU"
    ]
  },
  {
    id: 'usa',
    city: 'USA',
    flag: 'us',
    coordinates: [39.0, -98.0],
    zoom: 4,
    markers: [
      { name: 'New York', coords: [41.1345, -73.9318], geojsonFile: 'newyork' }
    ],
    address: [
      "616, Corporate Way Suite 2, 6015 Valley Cottage NY 10989"
    ]
  },
  {
    id: 'canada',
    city: 'Canada',
    flag: 'ca',
    coordinates: [55.0, -106.0],
    zoom: 4,
    markers: [
      { name: 'British Columbia', coords: [49.1632, -122.8998], geojsonFile: 'britishcolumbia' }
    ],
    address: [
      "8449,116 A Street, Delta - V4C7N7, Greater Vancouver",
      "Call us +1 (778) 798-9624"
    ]
  },
  {
    id: 'dubai',
    city: 'Dubai',
    flag: 'ae',
    coordinates: [25.2, 55.27],
    zoom: 9,
    markers: [
      { name: 'Dubai', coords: [25.1848, 55.2639], geojsonFile: 'dubai' }
    ],
    address: [
      "Suite No 2902 and 2903,",
      "The Prism Tower, Business Bay, Dubai, UAE"
    ]
  }
];

const GlobalPresence = () => {
  const [activeLoc, setActiveLoc] = useState(locations[0]);
  const [geoData, setGeoData] = useState({});

  useEffect(() => {
    const files = ['punjab', 'gujarat', 'newyork', 'britishcolumbia', 'dubai'];
    files.forEach(file => {
      fetch(`/maps/${file}.geojson`)
        .then(res => res.json())
        .then(data => setGeoData(prev => ({ ...prev, [file]: data })))
        .catch(err => console.error('Failed to load map data:', file));
    });
  }, []);

  // Premium light map tiles from CartoDB
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <section className="global-section" id="global">
      <div className="global-container">
        <h2 className="global-title">Global Presence</h2>

        <div className="global-box">
          <div className="global-list-container">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`global-card ${activeLoc.id === loc.id ? 'active' : ''}`}
                onClick={() => setActiveLoc(loc)}
              >
                <img
                  src={`https://flagcdn.com/w40/${loc.flag}.png`}
                  srcSet={`https://flagcdn.com/w80/${loc.flag}.png 2x`}
                  alt={loc.city}
                  className="global-flag"
                />
                <div className="global-card-text">
                  <h4>{loc.city}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="global-image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', zIndex: 0 }}>
            <MapContainer 
              center={activeLoc.coordinates} 
              zoom={activeLoc.zoom} 
              style={{ height: "100%", width: "100%", background: '#f8fafc', minHeight: '400px' }}
              zoomControl={false}
              scrollWheelZoom={false}
            >
              <TileLayer
                url={tileUrl}
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              />
              <MapUpdater center={activeLoc.coordinates} zoom={activeLoc.zoom} />
              
              {locations.flatMap((loc) => 
                loc.markers.map((marker, index) => (
                  <React.Fragment key={`${loc.id}-${index}`}>
                    {activeLoc.id === loc.id && marker.geojsonFile && geoData[marker.geojsonFile] && (
                      <GeoJSON 
                        key={`${marker.geojsonFile}-${activeLoc.id}`}
                        data={geoData[marker.geojsonFile]}
                        pathOptions={{
                          color: '#0ea5e9',
                          weight: 2,
                          opacity: 0.7,
                          dashArray: '6, 6',
                          fillOpacity: 0,
                        }}
                      />
                    )}
                    <CircleMarker
                      center={marker.coords}
                      radius={activeLoc.id === loc.id ? 10 : 6}
                      pathOptions={{
                        fillColor: activeLoc.id === loc.id ? "#2bd392" : "#444",
                        color: activeLoc.id === loc.id ? "#ffffff" : "transparent",
                        weight: 2,
                        fillOpacity: 0.9,
                      }}
                    >
                      <Popup>
                        <div style={{ color: '#000', fontWeight: 'bold' }}>
                          {marker.name} Office
                        </div>
                      </Popup>
                    </CircleMarker>
                  </React.Fragment>
                ))
              )}
            </MapContainer>

            <div className="address-overlay fade-in" key={`${activeLoc.id}-addr`} style={{ zIndex: 1000, pointerEvents: 'none' }}>
              <h4>{activeLoc.city} Office</h4>
              {activeLoc.address.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
