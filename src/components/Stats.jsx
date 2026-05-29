import React, { useEffect, useState, useRef } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (easeOutQuart) for smooth slowdown at the end
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const Stats = () => {
  const statsData = [
    { number: 100, suffix: "+", label: "Global Clients" },
    { number: 4, suffix: "+", label: "Years In Business" },
    { number: 500, suffix: "+", label: "Projects Completed" }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h2 className="stat-number">
              <CountUp end={stat.number} duration={2500} />{stat.suffix}
            </h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
