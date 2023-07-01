import type {Mode, PaletteConfig} from '../types'

export const DEFAULT_STOP = 500
export const DEFAULT_STOPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]

export const MODES: Mode[] = [`hex`, `p-3`]

export const DEFAULT_PALETTE_CONFIG: PaletteConfig = {
  id: ``,
  name: ``,
  value: ``,
  valueStop: DEFAULT_STOP,
  swatches: [],
  h: 0,
  s: 0,
  lMin: 0,
  lMax: 100,
  useLightness: true,
  mode: MODES[0],
}

export const RANDOM_PALETTES = [
  {
    name: `blue`,
    value: `3B82F6`,
  },
  {
    name: `red`,
    value: `EF4444`,
  },
  {
    name: `green`,
    value: `22C55E`,
  },
  {
    name: `purple`,
    value: `A855F7`,
  },
  {
    name: `brand`,
    value: `2522FC`,
  },
  {
    name:"#1",
    value:"A8A77D"
  },
  {
    name:"#2",
    value:"46AF9A"
  },
  {
    name:"#3",
    value:"BEC296"
  },
  {
    name:"#4",
    value:"E62347"
  },
  {
    name:"#5",
    value:"FA9E00"
  },
  {
    name:"#3",
    value:"FF9B05"
  },
  {
    name:"#3",
    value:"FFBB00"
  },
  {
    name:"#3",
    value:"94C841"
  },
  {
    name:"#3",
    value:"279FD3"
  },
  {
    name:"#3",
    value:"4960BB"
  },
  {
    name:"#3",
    value:"FF6905"
  },
  {
    name:"#3",
    value:"FF0D00"
  },
  {
    name:"#3",
    value:"FA5C00"
  },
  {
    name:"#3",
    value:"FF7F0F"
  },
  {
    name:"#3",
    value:"FFD724"
  },
  {
    name:"#3",
    value:"847C67"
  },
  {
    name:"#3",
    value:"55815A"
  },
  {
    name:"#3",
    value:"46AF9A"
  },
  {
    name:"#3",
    value:"FFBE0B"
  },
  {
    name:"#3",
    value:"FF006E"
  },
  {
    name:"#3",
    value:"E63946"
  },
  {
    name:"#3",
    value:"73CD56"
  },
  {
    name:"#3",
    value:"457B9D"
  },

]

export const META = {
  origin: `https://tints.dev`,
  title: `Tailwind CSS 11-color Palette Generator and API`,
  description: `A fast and flexible, HSL-tweakable palette generator and API for Tailwind CSS`,
}

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const retroColors = [
 '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE',
 '#448AFF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', 
 '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40',
 '#FF3366', '#FF9933', '#FFCC33', '#99FF33', '#33FF99',
 '#33CCFF', '#9933FF', '#FF33CC', '#FF6666', '#FFB333',
 '#FFDD33', '#66FF33', '#33FFCC', '#33B5FF', '#9933FF',
 '#FF33AA', '#FF9999', '#FFCC66', '#FFFF66', '#99FF99'];

 export const vintageColors = [
    '#CDB599', '#E8B9A0', '#A57E6A', '#B8A992', '#AD8B74',
    '#C6A4A4', '#D2C0A2', '#7B9BA6', '#DABFAF', '#C9A66B',
    '#8F9E6F', '#BFAC8B', '#C1A296', '#A8A77D', '#AA907D',
    '#C8A49D', '#D0B7A6', '#C0C0C0', '#CFBAA9', '#C5BAA0'
  ];
  export const futuristicColors = [
    '#3DDC84', '#F632AC', '#00A2FF', '#FFD500', '#FF4D00',
    '#A17FFF', '#00FFD8', '#FF00F0', '#8CDDFF', '#FF8700',
    '#FF00AE', '#00FF3E', '#FF0062', '#00FFAD', '#FF3F00',
    '#D500FF', '#00FFA6', '#FF0017', '#00FF82', '#FF9100'
  ];
  
  export const minimalisticColors = [
    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#C0C0C0',
    '#FFC0CB', '#FFA500', '#FFFFF0', '#F0FFF0', '#F5F5DC',
    '#F5F5F5', '#F0F8FF', '#FFF0F5', '#DCDCDC', '#F8F8FF'
  ];

  export const aestheticColors = [
    '#F8C1CB', '#FFDDA1', '#FFE1B5', '#FFE8AA', '#E2F0CB',
    '#AEDCF0', '#C7CEEA', '#FFD3B5', '#FFAAA6', '#FFC3A0',
    '#FFDFC3', '#FFFAE3', '#C9C5BA', '#A3C2A6', '#B4E1D8',
    '#FFBE0B', '#FF006E', '#E63946', '#F1FAEE', '#457B9D'
  ];
  export const animeColors = [
    '#FF0000', '#FF69B4', '#FFA500', '#FFFF00', '#00FFFF',
    '#800080', '#008000', '#FF00FF', '#0000FF', '#FF4500',
    '#800000', '#FFC0CB', '#FF1493', '#4B0082', '#00FF00',
    '#000080', '#FFD700', '#8B4513', '#40E0D0', '#FF6347'
  ];

  export const cyberpunkColors = [
    '#FF00FF', '#00FFFF', '#FF9933', '#FF3300', '#6600FF',
    '#33FF00', '#FF3399', '#00FF33', '#FFCC00', '#00CCFF',
    '#CC00FF', '#33FFFF', '#FF6600', '#FF00CC', '#FFFF00',
    '#9900FF', '#00FF66', '#FF3366', '#66FF00', '#CCFF00'
  ];

  export const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#Baffc9', '#BAE1FF',
    '#FFC6FF', '#FFDFE5', '#D9FFBA', '#C9BAFF', '#BAFFD9',
    '#FFD9BA', '#BAF2FF', '#F2BAFF', '#FFBAE8', '#BAFFED',
    '#E8BAFF', '#BAFFFD', '#FFE8BA', '#BAFFE8', '#FFBAFF'
  ];
  
