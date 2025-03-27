
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  color = "rgba(14, 165, 233, 0.4)",
  minSize = 2,
  maxSize = 6,
  speed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const initParticles = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: 0.1 + Math.random() * 0.4,
        hue: 195 + Math.floor(Math.random() * 20), // Tahoe blue hue range
      }));
    };

    const updateParticles = (time: number) => {
      if (!containerRef.current || !previousTimeRef.current) {
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(updateParticles);
        return;
      }

      const deltaTime = time - previousTimeRef.current;
      const { width, height } = containerRef.current.getBoundingClientRect();

      // Update each particle position
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX * deltaTime * 0.05;
        particle.y += particle.speedY * deltaTime * 0.05;

        // Wrap around the edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      });

      // Render the particles
      renderParticles();

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    const renderParticles = () => {
      if (!containerRef.current) return;
      
      // Clear previous particles
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      // Create and append each particle
      particlesRef.current.forEach(particle => {
        const element = document.createElement('div');
        element.className = 'particle animate-pulse-glow';
        element.style.width = `${particle.size}px`;
        element.style.height = `${particle.size}px`;
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        element.style.opacity = particle.opacity.toString();
        element.style.background = `hsla(${particle.hue}, 96%, 50%, ${particle.opacity})`;
        element.style.boxShadow = `0 0 ${particle.size * 2}px hsla(${particle.hue}, 96%, 70%, ${particle.opacity})`;
        containerRef.current?.appendChild(element);
      });
    };

    const handleResize = () => {
      initParticles();
      renderParticles();
    };

    initParticles();
    requestRef.current = requestAnimationFrame(updateParticles);
    window.addEventListener('resize', handleResize);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [count, minSize, maxSize, speed]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default FloatingParticles;
