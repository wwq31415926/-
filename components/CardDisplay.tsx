import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { BlessingCard, CardRarity } from '../types';
import html2canvas from 'html2canvas';

interface CardDisplayProps {
  card: BlessingCard;
  onReset: () => void;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, onReset }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0); // For money roll effect
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Spring physics for smooth tilt
  const springConfig = { damping: 25, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    // Auto flip animation
    const timer = setTimeout(() => setIsFlipped(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFlipped && card.rarity === CardRarity.RARE) {
      let start = 0;
      const end = 88888;
      const duration = 2500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); 
        setCount(Math.floor(start + (end - start) * ease));

        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isFlipped, card.rarity]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isFlipped) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Temporarily remove transform for clean capture
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = 'none';
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High Res
        backgroundColor: null,
        useCORS: true,
        logging: false
      });
      
      // Restore transform
      cardRef.current.style.transform = originalTransform;

      const link = document.createElement('a');
      link.download = `2025_Blessing_${card.id}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("保存失败，请尝试截图");
    } finally {
      setDownloading(false);
    }
  };

  const isRare = card.rarity === CardRarity.RARE;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative z-30 p-4 perspective-1000">
      <motion.div
        className="relative w-full max-w-[340px] aspect-[9/16] cursor-pointer"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ 
          rotateX: isFlipped ? springRotateX : 0, 
          rotateY: isFlipped ? 180 : 0, // We need to add the spring rotation to the base flip
          transformStyle: "preserve-3d" 
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
        onClick={() => !isFlipped && setIsFlipped(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* --- FRONT (Red Packet Back) --- */}
        <div className="absolute inset-0 backface-hidden rounded-[20px] overflow-hidden shadow-2xl bg-cinnabar border-[1px] border-white/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-cloud-pattern opacity-10"></div>
          <div className="w-[85%] h-[85%] border border-amber-gold/30 rounded-[15px] flex flex-col items-center justify-center p-6 relative">
             <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-gold"></div>
             <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-gold"></div>
             <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-gold"></div>
             <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-gold"></div>
             
             <div className="w-24 h-24 bg-amber-gold rounded-full flex items-center justify-center mb-6 shadow-gold-glow">
                <div className="w-20 h-20 border border-dashed border-cinnabar rounded-full flex items-center justify-center bg-rice-paper">
                   <span className="font-serif text-5xl text-cinnabar">福</span>
                </div>
             </div>
             <h3 className="text-amber-gold font-serif text-2xl tracking-[0.5em] writing-vertical">吉星高照</h3>
          </div>
        </div>

        {/* --- BACK (The Actual Card) --- */}
        <div 
          ref={cardRef}
          className={`absolute inset-0 rotate-y-180 backface-hidden rounded-[20px] overflow-hidden shadow-2xl flex flex-col bg-rice-paper`}
        >
           {/* Texture Overlays */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-50 z-10 pointer-events-none mix-blend-multiply"></div>
           <div className="absolute inset-0 border-[12px] border-white z-20 pointer-events-none rounded-[20px]"></div>
           
           {/* Image Section (Top 60%) */}
           <div className="h-[58%] w-full relative overflow-hidden bg-stone-200">
              <img 
                src={card.imageUrl} 
                alt={card.title}
                className="w-full h-full object-cover mix-blend-multiply filter contrast-110 brightness-110"
                crossOrigin="anonymous"
              />
              {/* Image Gradient Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rice-paper to-transparent z-0"></div>
              
              {/* Rare Sparkles */}
              {isRare && (
                 <motion.div 
                    className="absolute inset-0 z-10 bg-amber-gold/10 mix-blend-overlay"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 />
              )}
           </div>

           {/* Content Section */}
           <div className="h-[42%] px-8 pt-2 pb-8 flex flex-col relative z-0">
              {/* Category Tag (Floating) */}
              <div className="absolute -top-6 right-8 z-10">
                 <div className={`px-3 py-4 ${isRare ? 'bg-amber-gold text-rouge' : 'bg-cinnabar text-rice-paper'} shadow-md flex items-center justify-center rounded-sm`}>
                    <span className="text-sm font-bold writing-vertical tracking-widest font-serif">{card.category}</span>
                 </div>
              </div>

              {/* Title & Body */}
              <div className="flex-1 flex gap-4 mt-2">
                 {/* Vertical Title */}
                 <div className="w-10 shrink-0 flex justify-center pt-2">
                    <h2 className="font-serif text-3xl text-ink-black writing-vertical font-bold tracking-wider leading-relaxed border-l-2 border-red-800/20 pl-2">
                       {card.title}
                    </h2>
                 </div>

                 {/* Body Text */}
                 <div className="flex-1 pt-3">
                    <p className="font-serif text-ink-black/80 text-sm leading-7 tracking-wide whitespace-pre-wrap text-justify">
                       {card.content}
                    </p>
                    
                    {isRare && (
                       <div className="mt-4 border-t border-amber-gold/50 pt-2">
                          <p className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">Red Packet</p>
                          <div className="font-mono text-3xl text-rouge font-black flex items-baseline">
                             <span className="text-lg mr-1">¥</span>
                             {count.toLocaleString()}
                          </div>
                       </div>
                    )}
                 </div>
              </div>

              {/* Footer / Stamp */}
              <div className="mt-auto flex justify-between items-end pt-4 border-t border-ink-black/10">
                 <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-ink-black/40 uppercase tracking-[0.2em]">Lucky 2025</span>
                    <span className="font-serif text-rouge text-xs mt-1">{card.footerText}</span>
                 </div>
                 
                 {/* Seal */}
                 <div className="w-14 h-14 border-2 border-rouge rounded-md opacity-90 rotate-[-8deg] p-1 flex items-center justify-center mix-blend-multiply">
                    <div className="w-full h-full border border-rouge flex items-center justify-center bg-rouge/10">
                        <span className="text-xs text-rouge writing-vertical font-serif font-bold">乙巳大吉</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Controls */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6 z-50 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              onClick={onReset}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-rice-paper border border-white/20 active:scale-90 transition-transform hover:bg-white/20"
            >
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 max-w-[220px] h-12 bg-gradient-to-r from-amber-gold to-yellow-600 text-rouge font-bold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/40 active:scale-95 transition-transform"
            >
               {downloading ? (
                 <span className="animate-pulse text-sm">绘制中...</span>
               ) : (
                 <>
                   <Download size={18} />
                   <span className="tracking-widest text-sm">收藏福气</span>
                 </>
               )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default CardDisplay;