import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src="/evoke_logo-removebg-preview.png"
            alt="Evoke AI Logo"
            className="navbar-logo"
          />
          <span className="navbar-brand-text">Evoke AI</span>
        </div>
        <div className="navbar-links">
          <button className="nav-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="nav-btn" onClick={() => window.open('https://evokeaisolutions.com', '_self')}>Back to Home</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
