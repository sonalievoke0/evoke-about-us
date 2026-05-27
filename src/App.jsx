import React from 'react';
import Navbar from './components/Navbar';
import WhoWeAre from './components/WhoWeAre';
import GlobalPresence from './components/GlobalPresence';
import Team from './components/Team';

function App() {
  return (
    <div>
      <Navbar />
      <WhoWeAre />
      <Team />
      <GlobalPresence />
    </div>
  );
}

export default App;
