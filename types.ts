export enum CardRarity {
  COMMON = 'COMMON',
  RARE = 'RARE' // The 0.01% Red Envelope
}

export enum CardCategory {
  LIFE = '生活调侃',
  WORK = '职场生存',
  LOVE = '情感状态',
  SPECIAL = '隐藏款'
}

export interface BlessingCard {
  id: number;
  title: string;
  content: string;
  category: CardCategory;
  rarity: CardRarity;
  themeColor: string; // Tailwind color class or hex
  imageUrl: string;
  footerText: string;
}

export type GameState = 'IDLE' | 'DRAGGING' | 'REVEALING' | 'REVEALED';