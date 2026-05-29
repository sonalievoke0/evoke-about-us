import React, { useEffect, useRef, useState } from 'react';

const WhoWeAre = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section className="who-we-are-section" id="company" ref={sectionRef}>
      <div className={`who-we-are-container ${isVisible ? 'animate-in' : ''}`}>
        <div className="who-we-are-box">
          {/* Left Side: Content Box */}
          <div className="who-we-are-content-side">
            <h2 className="who-we-are-title">
              ABOUT EVOKE AI
            </h2>

            <div className="who-we-are-text">
              <p>
                EVOKE AI is an enterprise AI platform -<b>Founded in 2022</b>- that helps businesses simplify intelligent automation, AI integration, and workflow management through one user-friendly orchestration layer.
                Our platform enables teams to build, manage, and scale AI agents without deep technical knowledge. EVOKE AI agents learn from your business data, follow your brand guidelines, and support multiple workflows from a single interface.
              </p>

              <div className="who-we-are-features">
                <div className="feature-group">
                  <h4>Core Services</h4>
                  <ul>
                    <li><strong>AI Services:</strong> Smart AI agents tailored to your business needs and guidelines.</li>
                    <li><strong>Automation Services:</strong> End-to-end workflow automation to reduce manual effort.</li>
                    <li><strong>Chatbot Services:</strong> Conversational AI tools for customer support and lead handling.</li>
                    <li><strong>Consultancy:</strong> Expert guidance for AI adoption, integration, and technology scaling.</li>
                  </ul>
                </div>

                <div className="feature-group">
                  <h4>Our AI Agent Suite</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>EVOKE AI is powered by specialized tools designed for different business needs:</p>
                  <ul>
                    <li><strong>NOVA:</strong> AI agent for automated email marketing and campaign optimization.</li>
                    <li><strong>AEON:</strong> No-code chatbot builder for fast deployment and customer interaction.</li>
                    <li><strong>ORION:</strong> AI tool for creating educational, training, and knowledge content.</li>
                    <li><strong>CIPHER:</strong> Cybersecurity assessment agent for operational safety and risk review.</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="who-we-are-divider"></div>

            <div className="who-we-are-actions">
              <button className="who-we-are-primary-btn" onClick={() => window.open('https://evokeaisolutions.com', '_blank', 'noopener,noreferrer')}>VIEW OUR PLATFORM &nbsp;▸</button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="who-we-are-image-side">
            <img
              src="/evoke1.png"
              alt="Evoke AI Concept"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
