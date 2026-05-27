import React from 'react';


const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>
      <div className="hero-content">
        <span className="hero-kicker">Corporate Identity &amp; Vision</span>
        <h1 className="hero-title">
          Intelligence  that <br />
          <span className="text-gradient">works for you.</span>
        </h1>
        <p className="hero-description">
          A next-generation enterprise AI framework setting the standard for intelligent growth and scalable, high-performance systems.
        </p>
      </div>
    </section>
  );
};

export default Hero;
