import React, { useState } from 'react';


const locations = [
  {
    id: 'india',
    city: 'India',
    flag: 'in',
    image: '/india.png',
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
    image: '/uk.png',
    address: [
      "20-22 Wenlock Road, Hoxton, London N1 7GU"
    ]
  },
  {
    id: 'usa',
    city: 'USA',
    flag: 'us',
    image: '/usa.png',
    address: [
      "616, Corporate Way Suite 2, 6015 Valley Cottage NY 10989"
    ]
  },
  {
    id: 'canada',
    city: 'Canada',
    flag: 'ca',
    image: '/canada.png',
    address: [
      "8449,116 A Street, Delta - V4C7N7, Greater Vancouver",
      "Call us +1 (778) 798-9624"
    ]
  },
  {
    id: 'dubai',
    city: 'Dubai',
    flag: 'ae',
    image: '/dubai.png',
    address: [
      "Suite No 2902 and 2903,",
      "The Prism Tower, Business Bay, Dubai, UAE"
    ]
  }
];

const GlobalPresence = () => {
  const [activeLoc, setActiveLoc] = useState(locations[0]);

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
                onMouseEnter={() => setActiveLoc(loc)}
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

          <div className="global-image-container">
            <img
              key={activeLoc.id}
              src={activeLoc.image}
              alt={activeLoc.city}
              className="global-image fade-in"
            />

            <div className="address-overlay fade-in" key={`${activeLoc.id}-addr`}>
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
