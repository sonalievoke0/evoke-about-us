import React, { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

export default function GenerativeArtBg({
  preset = 'constellation',
  primaryColor = '#0284c7', // Evoke blue
  secondaryColor = '#2bd392', // Evoke green
  particleCount = 150,
  speed = 1.0,
  distance = 150,
  interactionMode = 'magnetic',
  glowEffects = true
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const mouse = {
        x: null,
        y: null,
        targetX: null,
        targetY: null,
        radius: 200,
        active: false
    };

    let screenWidth = canvas.width = container.offsetWidth;
    let screenHeight = canvas.height = container.offsetHeight;

    const handleResize = () => {
        screenWidth = canvas.width = container.offsetWidth;
        screenHeight = canvas.height = container.offsetHeight;
        repopulateParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
        if (mouse.x === null) {
            mouse.x = mouse.targetX;
            mouse.y = mouse.targetY;
        }
    };

    const handleMouseLeave = () => {
        mouse.active = false;
    };

    const handleTouchStart = (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.touches[0].clientX - rect.left;
            mouse.targetY = e.touches[0].clientY - rect.top;
            mouse.active = true;
            if (mouse.x === null) {
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
            }
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.touches[0].clientX - rect.left;
            mouse.targetY = e.touches[0].clientY - rect.top;
            mouse.active = true;
        }
    };

    const handleTouchEnd = () => {
        mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * screenWidth;
            this.y = Math.random() * screenHeight;
            this.vx = (Math.random() - 0.5) * 1.6;
            this.vy = (Math.random() - 0.5) * 1.6;
            this.size = Math.random() * 2.5 + 1;
            this.waveOffset = Math.random() * Math.PI * 2;
            this.waveSpeed = Math.random() * 0.02 + 0.005;
            this.waveAmplitude = Math.random() * 0.4 + 0.1;
            this.colorMix = Math.random();
            this.opacity = Math.random() * 0.55 + 0.2;
            this.life = Math.random() * 120 + 60;
            this.maxLife = this.life;
        }

        update() {
            if (mouse.active && mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    if (interactionMode === 'magnetic') {
                        this.x += (dx / dist) * force * 3.5 * speed;
                        this.y += (dy / dist) * force * 3.5 * speed;
                    } else if (interactionMode === 'push') {
                        this.x -= (dx / dist) * force * 4.5 * speed;
                        this.y -= (dy / dist) * force * 4.5 * speed;
                    } else if (interactionMode === 'orbit') {
                        const angle = Math.atan2(dy, dx) + (Math.PI / 2) * force * 0.09;
                        const targetX = mouse.x - Math.cos(angle) * dist;
                        const targetY = mouse.y - Math.sin(angle) * dist;
                        this.x += (targetX - this.x) * 0.12 * speed;
                        this.y += (targetY - this.y) * 0.12 * speed;
                    }
                }
            }

            if (preset === 'aurora-waves') {
                this.x += (this.vx + Math.sin(this.y * 0.006 + this.waveOffset) * this.waveAmplitude) * speed;
                this.y += this.vy * speed * 0.65;
            } else if (preset === 'cyber-matrix') {
                this.y += (Math.abs(this.vy) * 2.2 + 1.2) * speed;
                this.life -= speed;
                this.opacity = (this.life / this.maxLife) * 0.85;
                if (this.y > screenHeight || this.life <= 0) {
                    this.reset();
                    this.y = 0;
                }
            } else {
                this.x += this.vx * speed;
                this.y += this.vy * speed;
            }

            if (preset !== 'cyber-matrix') {
                if (this.x < 0) this.x = screenWidth;
                if (this.x > screenWidth) this.x = 0;
                if (this.y < 0) this.y = screenHeight;
                if (this.y > screenHeight) this.y = 0;
            }
        }

        draw() {
            const rgb1 = hexToRgb(primaryColor);
            const rgb2 = hexToRgb(secondaryColor);
            const r = Math.floor(rgb1.r + (rgb2.r - rgb1.r) * this.colorMix);
            const g = Math.floor(rgb1.g + (rgb2.g - rgb1.g) * this.colorMix);
            const b = Math.floor(rgb1.b + (rgb2.b - rgb1.b) * this.colorMix);

            ctx.save();
            if (glowEffects) {
                ctx.shadowBlur = this.size * 3.5;
                ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
            }
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function repopulateParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConstellations() {
        if (distance <= 0) return;
        const rgb1 = hexToRgb(primaryColor);
        const rgb2 = hexToRgb(secondaryColor);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (dist < distance) {
                    const alpha = (1 - (dist / distance)) * 0.28;
                    const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    
                    const r1 = Math.floor(rgb1.r + (rgb2.r - rgb1.r) * p1.colorMix);
                    const g1 = Math.floor(rgb1.g + (rgb2.g - rgb1.g) * p1.colorMix);
                    const b1 = Math.floor(rgb1.b + (rgb2.b - rgb1.b) * p1.colorMix);

                    const r2 = Math.floor(rgb1.r + (rgb2.r - rgb1.r) * p2.colorMix);
                    const g2 = Math.floor(rgb1.g + (rgb2.g - rgb1.g) * p2.colorMix);
                    const b2 = Math.floor(rgb1.b + (rgb2.b - rgb1.b) * p2.colorMix);

                    grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${alpha})`);
                    grad.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${alpha})`);

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.85;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        if (mouse.active && mouse.x !== null) {
            mouse.x += (mouse.targetX - mouse.x) * 0.12;
            mouse.y += (mouse.targetY - mouse.y) * 0.12;
        }

        if (preset === 'cyber-matrix') {
            ctx.fillStyle = 'rgba(3, 3, 3, 0.22)';
            ctx.fillRect(0, 0, screenWidth, screenHeight);
        } else {
            ctx.clearRect(0, 0, screenWidth, screenHeight);
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        if (preset === 'constellation') {
            drawConstellations();
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    repopulateParticles();
    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [preset, primaryColor, secondaryColor, particleCount, speed, distance, interactionMode, glowEffects]);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }} 
      />
    </div>
  );
}
