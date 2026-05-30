import React from 'react';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

const teamData = {
  vp: {
    id: 1,
    name: "COL SUKHPAL SINGH KHETARPAL",
    designation: "VICE PRESIDENT",
    content: "Former Army officer leveraging 38+ years of leadership to bridge industry, academia, and sustainable ESG initiatives.",
    image: "/colsir.png",
  },
  lead: {
    id: 2,
    name: "GULADAB BAWA",
    designation: "HEAD OF AI-DIVISION",
    content: "M.S. in Artificial Intelligence & Robotics",

    image: "/guladab.png",
  },
  members: [
    { id: 3, name: "ETHAN BLACKWELL", designation: "DATA PRIVACY STRATEGIST", image: "/vikas.png", content: "Master of Science (M.S.) in Cybersecurity & Data Governance" },
    { id: 4, name: "JYOTI KHETWAL", designation: "DATA SCIENTIST", image: "/jyoti.png", content: "M.Tech in Data Science & Advanced Analytics" },
    { id: 5, name: "SAUMYA  AGARWAL", designation: "AI DEVELOPER", image: "/saumya.png", content: "B.Tech in computer science" },
    { id: 6, name: "DAVID THORNE", designation: "MARKETING HEAD", image: "/david.png", content: "Master of Business Administration (MBA) in International Marketing & Brand Strategy" },
    { id: 7, name: "ADITI MEHRA", designation: "FULL-STACK DEVELOPER", image: "/aditi.png", content: "B.Tech in Computer Science & Engineering" },
    { id: 8, name: "CLAIRE KENSINGTAN", designation: "AI Integration Architect", image: "mia.png", content: "M.Tech in Enterprise Software Architecture & Systems Engineering" },]
};

const allMembers = [
  teamData.vp,
  teamData.lead,
  ...teamData.members
];

const TeamCard = ({ member }) => {
  const hasBgImage = Boolean(member.image);
  return (
    <div className="team-card">
      <div className="team-image-wrapper">
        {hasBgImage ? (
          <img src={member.image} alt={member.name} className="team-img" />
        ) : (
          <div className="team-avatar-container">
            <div className="team-initials">{getInitials(member.name)}</div>
          </div>
        )}
      </div>
      <div className="team-info">
        <h3 className="team-name">{member.name}</h3>
        <p className="team-designation">{member.designation}</p>
        {member.content && <p className="team-content">{member.content}</p>}
      </div>
    </div>
  );
};

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

        <div className="team-grid-wrapper">
          <div className="team-row top-row">
            {allMembers.slice(0, 4).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
          <div className="team-row bottom-row">
            {allMembers.slice(4, 8).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
