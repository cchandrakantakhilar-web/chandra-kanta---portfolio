import React, { useEffect, useState } from 'react';
import { ThreeCanvas } from './ThreeCanvas';

export const BackgroundEffects: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep dark base canvas */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Subtle digital grid overlay */}
      <div className="absolute inset-0 subtle-grid opacity-30" />

      {/* 3D WebGL Three.js Interactive Animation Canvas */}
      <ThreeCanvas />

      {/* Sophisticated Dark ambient glow spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-pink-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[35%] h-[35%] bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Interactive mouse follow glow spot */}
      <div
        className="fixed w-[360px] h-[360px] rounded-full pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 opacity-25 md:opacity-35"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Vignette border frame for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
    </div>
  );
};

