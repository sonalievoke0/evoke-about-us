import React, { useState, useEffect } from 'react';
import GenerativeArtBg from './GenerativeArtBg';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero-section" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5%', textAlign: 'center' }}>
      <GenerativeArtBg
        preset="constellation"
        primaryColor="#0284c7"
        secondaryColor="#2bd392"
        particleCount={isMobile ? 60 : 120}
        speed={isMobile ? 0.6 : 1.0}
        distance={isMobile ? 80 : 125}
        interactionMode="magnetic"
      />
      <div className="hero-content" style={{ position: 'relative', zIndex: 10, maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="hero-title">
          ABOUT <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>EVOKE AI</span>
        </h1>
        <p className="hero-description">
          EVOKE AI provides an all-in-one orchestration layer for intelligent automation, AI integration, and workflow management. Through a single user-friendly interface, teams can seamlessly build, manage, and scale AI agents that train on business data,
          follow brand guidelines, and handle multiple business processes.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="https://evokeaisolutions.com" target="_blank" rel="noopener noreferrer" className="hero-button">
            View Our Platform
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
