import { CARDS, APP_CONSTANTS } from '../constants';
import { BlessingCard, CardRarity } from '../types';

/**
 * Draws a random card based on probability.
 * 0.01% chance for the RARE card.
 * 99.99% chance for a random COMMON card.
 */
export const drawCard = (): BlessingCard => {
  const rand = Math.random();
  
  // Check for Rare Event
  if (rand < APP_CONSTANTS.RARE_PROBABILITY) {
    const rareCard = CARDS.find(c => c.rarity === CardRarity.RARE);
    if (rareCard) return rareCard;
  }

  // Common Event
  const commonCards = CARDS.filter(c => c.rarity === CardRarity.COMMON);
  const randomIndex = Math.floor(Math.random() * commonCards.length);
  
  return commonCards[randomIndex];
};