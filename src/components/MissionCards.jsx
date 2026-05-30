import React from 'react';

const MissionCards = () => {
  return (
    <section className="vision-mission-section">
      <div className="vm-container">
        
        {/* Right Side Background (Base) */}
        <div className="vm-panel-mission">
          <div className="vm-content-mission">
            <div className="vm-icon-wrap vm-icon-target">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="22" y1="2" x2="15" y2="9" />
                <polygon points="22 2 18 2 22 6 22 2" fill="currentColor"/>
              </svg>
            </div>
            <div className="vm-text-wrapper">
              <h2 className="vm-title mission-title">
                OUR<br />
                MISSION
              </h2>
              <p className="vm-text mission-text">
                To help startups, enterprises, educators, security teams, and growing businesses use AI as a reliable digital workforce.
              </p>
            </div>
          </div>
        </div>

        {/* Left Side (Clipped Overlay) */}
        <div className="vm-panel-vision">
          <div className="vm-content-vision">
            <div className="vm-text-wrapper">
              <h2 className="vm-title vision-title">
                OUR<br />
                VISION
              </h2>
              <p className="vm-text vision-text">
                To become a trusted AI transformation platform that helps businesses work smarter, automate faster, and scale confidently.
              </p>
            </div>
            <div className="vm-icon-wrap vm-icon-eye">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionCards;
