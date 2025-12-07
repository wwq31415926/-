import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Background: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax layers
  const moveX1 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  
  const moveX2 = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Normalize mouse position -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-rouge">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cinnabar via-rouge to-ink-black opacity-90"></div>
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-10 bg-cloud-pattern bg-repeat z-10 mix-blend-overlay"></div>

      {/* Layer 1: Lanterns */}
      <motion.div style={{ x: moveX1, y: moveY1 }} className="absolute inset-0 z-10">
         <div className="absolute top-[5%] left-[10%] w-24 h-32 opacity-80 blur-[2px] animate-float-slow">
            <div className="w-full h-full bg-gradient-to-b from-red-600 to-red-900 rounded-2xl border-2 border-amber-gold/20"></div>
            <div className="absolute -bottom-8 left-1/2 w-1 h-8 bg-amber-gold"></div>
         </div>
         <div className="absolute top-[15%] right-[-5%] w-40 h-48 opacity-60 blur-[4px] animate-float-slow" style={{ animationDelay: '2s' }}>
            <div className="w-full h-full bg-gradient-to-b from-red-700 to-red-950 rounded-full border-2 border-amber-gold/10"></div>
         </div>
      </motion.div>

      {/* Layer 2: Gold Dust */}
      <motion.div style={{ x: moveX2, y: moveY2 }} className="absolute inset-0 z-20">
         {[...Array(8)].map((_, i) => (
           <div 
             key={i}
             className="absolute rounded-full bg-amber-gold blur-[1px] animate-pulse-gold"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               width: `${Math.random() * 6 + 2}px`,
               height: `${Math.random() * 6 + 2}px`,
               opacity: Math.random() * 0.5 + 0.2,
               animationDuration: `${Math.random() * 3 + 2}s`
             }}
           />
         ))}
      </motion.div>
      
      {/* Bottom Mist */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
    </div>
  );
};

export default Background;