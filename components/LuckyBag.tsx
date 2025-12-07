import React from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface LuckyBagProps {
  onTearComplete: () => void;
}

const LuckyBag: React.FC<LuckyBagProps> = ({ onTearComplete }) => {
  const controls = useAnimation();
  const ropeControls = useAnimation();

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 120) {
      // Trigger tear success
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(100); // Success vibration
      }

      await Promise.all([
        controls.start({
          y: 800,
          rotate: [-5, 5, 0],
          opacity: 0,
          transition: { duration: 0.6, ease: "easeIn" }
        }),
        ropeControls.start({
          height: 0,
          opacity: 0,
          transition: { duration: 0.2 }
        })
      ]);
      onTearComplete();
    } else {
      // Snap back
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(30); // Gentle snap feedback
      }
      controls.start({ y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pt-10">
      
      {/* The Rope that hangs the bag (Visual only) */}
      <motion.div 
        animate={ropeControls}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-[25vh] bg-gradient-to-b from-amber-gold to-yellow-700 z-0 origin-top"
      />

      <motion.div
        className="relative z-20 cursor-grab active:cursor-grabbing touch-none"
        drag="y"
        dragConstraints={{ top: 0, bottom: 200 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Bag Body */}
        <div className="relative w-72 h-96">
          {/* Main Shape */}
          <div className="absolute inset-0 bg-gradient-to-b from-cinnabar to-rouge rounded-[2.5rem] shadow-ink-shadow border-2 border-rouge/50 overflow-hidden">
             
             {/* Texture Overlay */}
             <div className="absolute inset-0 bg-cloud-pattern opacity-20 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>

             {/* Gold Decorative Border */}
             <div className="absolute top-0 left-0 right-0 h-full w-full border-[6px] border-amber-gold/80 rounded-[2.5rem] opacity-80" 
                  style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}></div>

             {/* Center Emblem */}
             <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rice-paper rounded-full flex items-center justify-center shadow-lg border-4 border-amber-gold">
                <div className="w-36 h-36 border border-dashed border-cinnabar rounded-full flex items-center justify-center bg-paper-texture">
                  <div className="relative">
                    <span className="font-serif text-7xl text-cinnabar select-none drop-shadow-sm">福</span>
                    <motion.div 
                      className="absolute -top-2 -right-4 bg-amber-gold text-rouge text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-rouge"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      2025
                    </motion.div>
                  </div>
                </div>
             </div>

             {/* Bottom Text */}
             <div className="absolute bottom-16 left-0 right-0 text-center">
               <h2 className="font-serif text-3xl text-amber-gold mb-1 drop-shadow-md">乙巳蛇年</h2>
               <p className="text-rice-paper/80 text-xs tracking-[0.3em] font-sans">GOOD LUCK</p>
             </div>
          </div>

          {/* Bag Top "Knot" Area */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-rouge rounded-lg shadow-lg flex items-center justify-center z-30">
            <div className="w-full h-full bg-cloud-pattern opacity-30 absolute inset-0"></div>
            <div className="w-56 h-4 bg-amber-gold rounded-full shadow-sm absolute top-4"></div>
          </div>
          
          {/* Tassels */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4 pointer-events-none">
             {[0, 1, 2].map((i) => (
               <motion.div 
                 key={i}
                 className="flex flex-col items-center origin-top"
                 animate={{ rotate: [-2, 2, -2] }}
                 transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
               >
                 <div className="w-1 h-12 bg-amber-gold/80"></div>
                 <div className="w-3 h-3 rounded-full bg-jade border border-amber-gold"></div>
                 <div className="w-6 h-20 bg-gradient-to-b from-cinnabar to-rouge clip-tassel mt-[-4px]"></div>
               </motion.div>
             ))}
          </div>

        </div>

        {/* Interaction Hint */}
        <motion.div 
          className="absolute -bottom-32 w-full flex flex-col items-center text-rice-paper/80 pointer-events-none"
          animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="font-serif text-lg mb-1 tracking-widest text-shadow">下拉祈福</span>
          <ChevronDown size={28} className="animate-bounce" />
        </motion.div>
      </motion.div>
      
      <style>{`
        .clip-tassel {
          clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default LuckyBag;