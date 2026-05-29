import React from 'react';
import Navbar from './components/Navbar';
import WhoWeAre from './components/WhoWeAre';
import MissionCards from './components/MissionCards';
import WhyEvoke from './components/WhyEvoke';
import GlobalPresence from './components/GlobalPresence';
import Team from './components/Team';
import Stats from './components/Stats';

function App() {
  return (
    <div>
      <Navbar />
      <WhoWeAre />
      <MissionCards />
      <WhyEvoke />
      <Stats />
      <Team />
      <GlobalPresence />
    </div>
  );
}

export default App;
