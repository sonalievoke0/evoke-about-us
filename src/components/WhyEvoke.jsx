import React, { useEffect, useRef, useState } from 'react';

const WhyEvoke = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section className="why-evoke-section" ref={ref}>
      <div className={`why-evoke-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="why-evoke-content">
          <div className="why-evoke-left">
            <h2>
              <span className="why-text">Why</span>
              EVOKE AI?
            </h2>
          </div>
          <div className="why-evoke-line"></div>
          <div className="why-evoke-right">
            <p>
              EVOKE AI brings automation, AI agents, branding, workflows, and integrations into one scalable ecosystem. It helps businesses save time, improve engagement, and manage intelligent operations with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEvoke;
