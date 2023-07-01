import {nanoid} from 'nanoid'

import {DEFAULT_PALETTE_CONFIG, RANDOM_PALETTES, aestheticColors, animeColors, cyberpunkColors, futuristicColors, minimalisticColors, pastelColors, retroColors, vintageColors} from './constants'
import {createCustomSwatches, createSwatches} from './createSwatches'
import chroma from "chroma-js";
import { extractColors } from 'extract-colors'

export async function createPaletteFromImage(imageData:String) {

// Function to convert an image to a color palette
function convertImageToPalette(imageUrl:any, numColors:any) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      extractColors(img)
      .then((palette)=>{
        let newPalette=[];
        if(palette.length >= 5){
          for (let index = 0; index < 5; index++) {
            newPalette.push(palette[index].hex);
          }
          resolve(newPalette)
        }
        else{
          
          for (let index = 0; index < 5; index++) {
            if(palette[index]){
              newPalette.push(palette[index].hex);
            }
            else{
              newPalette.push("#FFFFFF")
            }
          }
          resolve(newPalette.reverse());
        }
      })
      .catch(console.error)
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
}
  
  // Example usage: convert an image to a color palette
  const imageUrl =imageData; // URL or path to your image
  const numColors = 5; // Desired number of colors in the palette

  let paletteFromImage;
  paletteFromImage="";

  await convertImageToPalette(imageUrl, numColors)
  .then((paletteData) => {
    paletteFromImage = paletteData;
  })
  .catch((error) => {
    console.error('Error converting image to palette:', error);
    
  });


  const defaults = {
    ...DEFAULT_PALETTE_CONFIG,
    id: nanoid(),
    value:paletteFromImage,
    swatches: [],
  }

  const palette = {
    ...defaults,
    swatches: createCustomSwatches(defaults),
    value:paletteFromImage[2],
  }


  return palette



}
