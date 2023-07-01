import {nanoid} from 'nanoid'

import {DEFAULT_PALETTE_CONFIG, RANDOM_PALETTES, aestheticColors, animeColors, cyberpunkColors, futuristicColors, minimalisticColors, pastelColors, retroColors, vintageColors} from './constants'
import {createCustomSwatches, createSwatches} from './createSwatches'
import chroma from "chroma-js";

export function createCustomPalette(artStyle:String) {

            // Function to generate a random color in hexadecimal format
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        // Function to generate a random color palette with the specified number of colors
        function generatePureRandomColorPalette(numColors:number) {
            const colorPalette = [];
            for (let i = 0; i < numColors; i++) {
            const color = getRandomColor();
            colorPalette.push(color);
            }
            return colorPalette;
        }

    // Function to generate a random retro color palette with the specified number of colors
    function generateColorPalette(numColors:number, style:String) {
        let customColorScheme = [];
        switch (style) {
            case "Retro":
                customColorScheme = retroColors;
                break;
             case "Vintage":
                customColorScheme = vintageColors;
                break;
            case "Futuristic":
                customColorScheme = futuristicColors;
                break;
            case "Minimalistic":
                customColorScheme = minimalisticColors;
                break;
            case "Aesthetic":
                customColorScheme = aestheticColors;
                break;
            case "Anime":
                customColorScheme = animeColors;
                break;
            case "Cyberpunk":
                customColorScheme = cyberpunkColors;
                break;
            case "Pastel":
                customColorScheme = pastelColors;
                break;
            default:
                customColorScheme = generatePureRandomColorPalette(5);
                break;
        }
    const colorPalette:any = [];

    while(colorPalette.length<=numColors){
        const randomIndex = Math.floor(Math.random() * customColorScheme.length);
        const color = customColorScheme[randomIndex];
        if(!(colorPalette.includes(color))){
            colorPalette.push(color);
        }
    }
    return colorPalette;
    }

    function arrangeColorsByLightness(colors:any) {
        // Convert colors to HSL format and add lightness property
        const colorsWithLightness = colors.map((color:any) => {
          const labColor = chroma(color).lab();
          return {
            color,
            luminance: labColor[0]
          };
        });
      
        // Sort colors based on lightness value
        colorsWithLightness.sort((a:any, b:any) => b.luminance - a.luminance);
      
        // Extract sorted colors
        const sortedColors = colorsWithLightness.map((colorObj:any) => colorObj.color);
      
        return sortedColors;
      }

      

    // Example usage: generate a random retro color palette with 5 colors
    const paletteArray = generateColorPalette(4, artStyle);

    const sortedColors = arrangeColorsByLightness(paletteArray);
    // var inputPalette : any = [];
    // inputPalette.push({h:0,hScale:0, hex: sortedColors[0],l:100,s:84.2,sScale:0,stop:50})
    // inputPalette.push({h:0,hScale:0, hex: sortedColors[1],l:100,s:84.2,sScale:0,stop:200})
    // inputPalette.push({h:0,hScale:0, hex: sortedColors[2],l:100,s:84.2,sScale:0,stop:500})
    // inputPalette.push({h:0,hScale:0, hex: sortedColors[3],l:100,s:84.2,sScale:0,stop:700})
    // inputPalette.push({h:0,hScale:0, hex: sortedColors[4],l:100,s:84.2,sScale:0,stop:900})

      const defaults = {
    ...DEFAULT_PALETTE_CONFIG,
    id: nanoid(),
    value:sortedColors,
    swatches: [],
  }

  const palette = {
    ...defaults,
    swatches: createCustomSwatches(defaults),
    value:sortedColors[2],
  }
//   const palette = {
//     ...DEFAULT_PALETTE_CONFIG,
//     id: nanoid(),
//     swatches: inputPalette,
//   }


  return palette
}
