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
    image: "/colsir.png",
  },
  lead: {
    id: 2,
    name: "GULADAB BAWA",
    designation: "TEAM HEAD",
    image: "",
  },
  members: [
    { id: 3, name: "JYOTI KHETWAL", designation: "DATA SCIENTIST", image: "/jyoti.png" },
    { id: 4, name: "VIKAS KAUSHAL", designation: "CYBER-SECURITY EXPERT", image: "/vikas.png" },
    { id: 6, name: "ADITI MEHRA", designation: "FULL-STACK DEVELOPER", image: "/aditi.png" },
  ]
};

const allMembers = [
  teamData.vp,
  teamData.lead,
  ...teamData.members
];

const Team = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [startX, setStartX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const resumeTimeoutRef = React.useRef(null);

  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 4000);
  };

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % allMembers.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isDragging, isAutoPlaying]);

  const nextSlide = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % allMembers.length);
  };

  const prevSlide = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + allMembers.length) % allMembers.length);
  };

  const handleCardClick = (index) => {
    handleUserInteraction();
    setCurrentIndex(index);
  };

  const handleDragStart = (e) => {
    handleUserInteraction();
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const getPositionClass = (index) => {
    const diff = index - currentIndex;

    // Handle wrap-around for smooth infinite looping dynamically
    let adjustedDiff = diff;
    const half = Math.floor(allMembers.length / 2);
    if (diff > half) adjustedDiff -= allMembers.length;
    if (diff < -half) adjustedDiff += allMembers.length;

    if (adjustedDiff === 0) return 'card-center';
    if (adjustedDiff === -1) return 'card-left-1';
    if (adjustedDiff === 1) return 'card-right-1';
    if (adjustedDiff === -2) return 'card-left-2';
    if (adjustedDiff === 2) return 'card-right-2';
    return 'card-hidden';
  };

  return (
    <section className="team-section" id="team">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">Meet Our <span className="text-gradient">Team</span></h2>
          <p className="team-description">
            The visionary minds driving the future of enterprise automation.
          </p>
        </div>

        <div className="team-carousel-wrapper">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>&#10094;</button>

          <div
            className="team-carousel-container"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {allMembers.map((member, index) => {
              const positionClass = getPositionClass(index);
              const hasBgImage = Boolean(member.image);

              return (
                <div
                  className={`team-card carousel-card ${positionClass} ${hasBgImage ? 'has-bg-image' : ''}`}
                  key={member.id}
                  onClick={() => handleCardClick(index)}
                  style={hasBgImage ? { backgroundImage: `url("${member.image}")` } : {}}
                >
                  {!hasBgImage && (
                    <div className="team-avatar-container">
                      <div className="team-initials">{getInitials(member.name)}</div>
                    </div>
                  )}
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-designation">{member.designation}</p>
                    <p className="team-content">{member.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="carousel-btn next-btn" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>
    </section>
  );
};

export default Team;
