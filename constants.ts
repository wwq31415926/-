import { BlessingCard, CardCategory, CardRarity } from './types';

// NOTE: Replace these placeholder URLs with the specific images you provided if you have hosting.
// Used high-quality Unsplash images that match the "Guochao" vibe as defaults.
const IMG_LION_HEAD = "https://images.unsplash.com/photo-1613063529329-87c2b6214389?q=80&w=600&auto=format&fit=crop";
const IMG_LANTERNS = "https://images.unsplash.com/photo-1548437813-d3a3bc43d463?q=80&w=600&auto=format&fit=crop";
const IMG_FIREWORKS = "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?q=80&w=600&auto=format&fit=crop";
const IMG_RED_PAPER = "https://images.unsplash.com/photo-1518182170546-07fa6eb3a561?q=80&w=600&auto=format&fit=crop";
const IMG_VILLAGE = "https://images.unsplash.com/photo-1548811219-4824e4d50980?q=80&w=600&auto=format&fit=crop";
const IMG_MONEY = "https://images.unsplash.com/photo-1613454283833-28b940b4972d?q=80&w=600&auto=format&fit=crop";

export const CARDS: BlessingCard[] = [
  // --- SPECIAL (0.01% RED ENVELOPE) ---
  {
    id: 999,
    title: "财神私生子",
    content: "恭喜触发0.01%隐藏款！\n今年不用努力了，\n躺着数钱就行。\n这是系统的BUG，\n也是你命运的FEATURE。",
    category: CardCategory.SPECIAL,
    rarity: CardRarity.RARE,
    themeColor: '#FFBF00', // Amber Gold
    imageUrl: IMG_MONEY,
    footerText: "兑换码: RICH2025 (仅供精神兑换)"
  },
  
  // --- LIFE (生活调侃) ---
  {
    id: 1,
    title: "禁止焦虑",
    content: "除了生死，都是擦伤。\n今年主线任务：快乐。\n支线任务：吃好喝好。\n在这个卷生卷死的世界，\n做个快乐的废物也是一种本事。",
    category: CardCategory.LIFE,
    rarity: CardRarity.COMMON,
    themeColor: '#2C4C66', // Oriental Blue
    imageUrl: IMG_VILLAGE,
    footerText: "宜：摆烂 忌：内耗"
  },
  {
    id: 2,
    title: "熬夜冠军",
    content: "黑眼圈是你的烟熏妆，\n晚睡是为了在这个快节奏的世界里，\n偷一点属于自己的时间。\n只要我睡得够晚，\n明天就来得够慢。",
    category: CardCategory.LIFE,
    rarity: CardRarity.COMMON,
    themeColor: '#2F5C56', // Jade
    imageUrl: IMG_LANTERNS,
    footerText: "宜：修仙 忌：早起"
  },
  {
    id: 3,
    title: "水逆退散",
    content: "所有霉运已在2024结清。\n2025年，你的运气将好到\n让人怀疑你开了挂。\n转发这张卡，\n前任倒霉三年。",
    category: CardCategory.LIFE,
    rarity: CardRarity.COMMON,
    themeColor: '#C20E0E', // Cinnabar
    imageUrl: IMG_RED_PAPER,
    footerText: "宜：转发 忌：叹气"
  },
  {
    id: 4,
    title: "发量惊人",
    content: "你的每一根头发都有自己的想法，\n但它们决定今年都留在你的头上。\n这就是对打工人最大的福报。",
    category: CardCategory.LIFE,
    rarity: CardRarity.COMMON,
    themeColor: '#1A1A1A', // Ink Black
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：烫染 忌：加班"
  },
  {
    id: 5,
    title: "减肥绝缘",
    content: "你是吃不胖的体质...\n只要吃得足够快，\n脂肪就追不上你。\n卡路里？\n那是好吃的味道。",
    category: CardCategory.LIFE,
    rarity: CardRarity.COMMON,
    themeColor: '#E65100',
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：暴风吸入 忌：上称"
  },

  // --- WORK (职场生存) ---
  {
    id: 6,
    title: "带薪拉屎",
    content: "每天在公司带薪如厕10分钟，\n一年就是带薪年假3天。\n公司是你家，\n东西随便拿（不是）。",
    category: CardCategory.WORK,
    rarity: CardRarity.COMMON,
    themeColor: '#8B4513',
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：摸鱼 忌：卷王"
  },
  {
    id: 7,
    title: "锅底抹油",
    content: "任何甩过来的锅，\n都能顺滑地从你身上溜走。\n你就是职场里的不粘锅，\n滑不留手，全身而退。",
    category: CardCategory.WORK,
    rarity: CardRarity.COMMON,
    themeColor: '#555555',
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：闪避 忌：接茬"
  },
  {
    id: 8,
    title: "加薪预警",
    content: "老板看你的眼神变了，\n不是想开了你，\n是想求你别走。\n钱给到位，\n什么都好说。",
    category: CardCategory.WORK,
    rarity: CardRarity.COMMON,
    themeColor: '#FFBF00',
    imageUrl: IMG_MONEY,
    footerText: "宜：提要求 忌：画大饼"
  },
  {
    id: 9,
    title: "甲方克星",
    content: "今年遇到的甲方都只有一句台词：\n'太完美了，就定这一版！'\nLogo不用放大了，\n黑色也不用五彩斑斓了。",
    category: CardCategory.WORK,
    rarity: CardRarity.COMMON,
    themeColor: '#4B0082',
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：一稿过 忌：改五版"
  },
  {
    id: 10,
    title: "准点下班",
    content: "到点消失术已修炼至化境。\n当别人还在关电脑，\n你已经在地铁上了。\n工作是做不完的，\n但命是自己的。",
    category: CardCategory.WORK,
    rarity: CardRarity.COMMON,
    themeColor: '#2F5C56',
    imageUrl: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：跑路 忌：回消息"
  },

  // --- LOVE (情感状态) ---
  {
    id: 11,
    title: "桃花朵朵",
    content: "月老今年给你牵的是钢筋，\n剪都剪不断。\n准备好迎接高质量人类的追求吧，\n这次真的不是杀猪盘。",
    category: CardCategory.LOVE,
    rarity: CardRarity.COMMON,
    themeColor: '#D81B60',
    imageUrl: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：约会 忌：社恐"
  },
  {
    id: 12,
    title: "独美万岁",
    content: "智者不入爱河，\n建设美丽祖国。\n搞钱比搞对象香多了。\n男人/女人只会影响你\n拔刀的速度。",
    category: CardCategory.LOVE,
    rarity: CardRarity.COMMON,
    themeColor: '#1E88E5',
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：搞钱 忌：恋爱脑"
  },
  {
    id: 13,
    title: "前任诈尸",
    content: "别怕，这次他是来还钱的。\n拿了钱就拉黑，\n做一个没有感情的杀手。\n过得比好，\n就是最好的报复。",
    category: CardCategory.LOVE,
    rarity: CardRarity.COMMON,
    themeColor: '#1A1A1A',
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：收款 忌：心软"
  },
  {
    id: 14,
    title: "鉴渣雷达",
    content: "你的双眼已升级为X光，\n任何渣男/女在你面前\n都将原形毕露。\n垃圾分类，\n从远离垃圾人开始。",
    category: CardCategory.LOVE,
    rarity: CardRarity.COMMON,
    themeColor: '#7B1FA2',
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
    footerText: "宜：清醒 忌：上头"
  }
];

// App constants
export const APP_CONSTANTS = {
  RARE_PROBABILITY: 0.0001, // 0.01%
  SWIPE_THRESHOLD: 120
};