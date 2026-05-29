import React, { useEffect, useRef, useState } from 'react';

const MissionCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const cards = [
    {
      title: "Our Foundation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" width="36" height="36">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22 L3.5 17 V7 L12 2 L20.5 7 V17 Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17 L7.5 14.5 V9.5 L12 7 L16.5 9.5 V14.5 Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22 V17" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 17 L7.5 14.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7 L7.5 9.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2 V7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 7 L16.5 9.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 17 L16.5 14.5" />
        </svg>
      ),
      text: "EVOKE AI was built to make artificial intelligence practical, accessible, and useful for modern businesses. We believe companies should be able to adopt AI without complexity, heavy technical barriers, or scattered tools."
    },
    {
      title: "Our Vision",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" width="36" height="36">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12 C7 4.5, 17 4.5, 21.5 12 C17 19.5, 7 19.5, 2.5 12 Z" />
          <circle cx="12" cy="12" r="4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5 L14.5 12 L12 14.5 L9.5 12 Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5 V 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5 V 20" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12 H 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12 H 20" />
        </svg>
      ),
      text: "To become a trusted AI transformation platform that helps businesses work smarter, automate faster, and scale confidently with intelligent digital agents."
    },
    {
      title: "Our Goal",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" width="36" height="36">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21.5 L12 9.5 L21 21.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.5 V21.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15.5 L12 18 L16.5 15.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5 L14.5 4.5 L12 7.5 L9.5 4.5 Z" />
          <circle cx="12" cy="4.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      ),
      text: "Our goal is to help startups, enterprises, educators, security teams, and growing businesses use AI as a reliable digital workforce for operations, customer engagement, training, marketing, and security."
    }
  ];

  return (
    <section className="mission-section" ref={sectionRef}>
      <div className={`mission-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="mission-grid">
          {cards.map((card, index) => (
            <div className="mission-card" key={index} style={{ transitionDelay: `${index * 150}ms` }}>
              <div className="mission-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionCards;
