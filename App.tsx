import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameState, BlessingCard, CardRarity } from './types';
import { drawCard } from './services/gachaService';
import LuckyBag from './components/LuckyBag';
import CardDisplay from './components/CardDisplay';
import Background from './components/Background';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [currentCard, setCurrentCard] = useState<BlessingCard | null>(null);

  const handleTearComplete = () => {
    setGameState('REVEALING');
    
    // Calculate result
    const card = drawCard();
    setCurrentCard(card);

    // Short delay for the "bag opening" feel
    setTimeout(() => {
      setGameState('REVEALED');
      
      // Trigger confetti if Rare
      if (card.rarity === CardRarity.RARE) {
        triggerRichEffect();
      } else {
        triggerCommonEffect();
      }
    }, 600);
  };

  const handleReset = () => {
    setGameState('IDLE');
    setCurrentCard(null);
  };

  const triggerCommonEffect = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#C20E0E', '#FFF8DC'],
      disableForReducedMotion: true
    });
  };

  const triggerRichEffect = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500'] // Gold
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      <Background />

      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <AnimatePresence mode='wait'>
          {gameState === 'IDLE' && (
            <motion.div 
              key="lucky-bag"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="w-full h-full"
            >
              <div className="absolute top-10 w-full text-center z-20 pointer-events-none">
                 <h1 className="font-serif text-5xl text-china-gold drop-shadow-md mb-2">福气满满</h1>
                 <p className="text-cream/80 text-sm tracking-[0.2em] uppercase">2025 New Year Blessings</p>
              </div>
              <LuckyBag onTearComplete={handleTearComplete} />
            </motion.div>
          )}

          {gameState === 'REVEALED' && currentCard && (
             <motion.div
               key="card-result"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               className="w-full h-full flex items-center justify-center"
             >
                <CardDisplay card={currentCard} onReset={handleReset} />
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Copyright */}
      <div className="fixed bottom-2 w-full text-center z-0 pointer-events-none">
        <p className="text-[10px] text-white/20 font-sans">Powered by Luck & React</p>
      </div>
    </div>
  );
};

export default App;