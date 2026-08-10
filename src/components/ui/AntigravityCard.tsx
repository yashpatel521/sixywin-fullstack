'use client';

import React, { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AntigravityCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'amber' | 'purple';
  tiltDegree?: number;
}

export const AntigravityCard: React.FC<AntigravityCardProps> = ({
  children,
  className,
  glowColor = 'cyan',
  tiltDegree = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  const [isHovered, setIsHovered] = useState(false);

  const glowStyles = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_20px_50px_rgba(0,242,254,0.15)] hover:shadow-[0_25px_60px_rgba(0,242,254,0.3)]',
    pink: 'border-pink-500/30 hover:border-pink-400/60 shadow-[0_20px_50px_rgba(255,0,127,0.15)] hover:shadow-[0_25px_60px_rgba(255,0,127,0.3)]',
    amber: 'border-amber-500/30 hover:border-amber-400/60 shadow-[0_20px_50px_rgba(255,215,0,0.15)] hover:shadow-[0_25px_60px_rgba(255,215,0,0.3)]',
    purple: 'border-purple-500/30 hover:border-purple-400/60 shadow-[0_20px_50px_rgba(139,92,246,0.15)] hover:shadow-[0_25px_60px_rgba(139,92,246,0.3)]',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltDegree;
    const rotateY = ((x - centerX) / centerX) * tiltDegree;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(20px)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={twMerge(
        clsx(
          'relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border p-8 transition-shadow duration-500 overflow-hidden',
          glowStyles[glowColor],
          className
        )
      )}
    >
      {/* Weightless Floating Reflection Glow */}
      <div
        className="absolute -top-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.8 : 0.2 }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </div>
  );
};
