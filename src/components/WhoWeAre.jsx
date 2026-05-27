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
              Evoke AI: Enterprise<br />Automation Framework
            </h2>

            <div className="who-we-are-text">
              <p>
                Evoke AI simplifies intelligent automation and scalable technology integration through a user-friendly orchestration layer. Its AI agents learn from your unique data to boost efficiency and engagement. By eliminating the need for deep technical knowledge,
                the platform—<b>founded in 2022</b>—allows teams to manage multiple brand profiles and workflows seamlessly from a single interface.
              </p>


              <div className="who-we-are-features">
                <div className="feature-group">
                  <h4>Core Services</h4>
                  <ul>
                    <li><strong>AI Services:</strong> Smart agents tailored to your business guidelines.</li>
                    <li><strong>Automation Services:</strong> End-to-end workflows to streamline operations.</li>
                    <li><strong>Chatbot Services:</strong> Conversational tools to enhance customer support.</li>
                    <li><strong>Consultancy:</strong> Expert guidance for AI integration and tech scaling.</li>
                  </ul>
                </div>

                <div className="feature-group">
                  <p>
                    The framework features several specialized tools to power these capabilities. NOVA handles automated email marketing and campaign optimization, while AEON serves as a sophisticated, no-code chatbot builder for rapid deployment. For knowledge management, ORION facilitates the fast creation of educational and training content,
                    and CIPHER ensures operational safety by conducting comprehensive cybersecurity assessments.
                  </p>
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
