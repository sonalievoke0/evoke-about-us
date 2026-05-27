import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: "Alex Sterling",
    designation: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Chen",
    designation: "Chief Technology Officer",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    designation: "Head of AI Research",
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    designation: "VP of Engineering",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const Team = () => {
  return (
    <section className="team-section" id="team">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">Meet Our <span className="text-gradient">Team</span></h2>
          <p className="team-description">
            The visionary minds driving the future of enterprise automation.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-image-container">
                <img src={member.image} alt={member.name} className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-designation">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
