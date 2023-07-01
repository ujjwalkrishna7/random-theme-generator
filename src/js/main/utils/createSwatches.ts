import {DEFAULT_PALETTE_CONFIG} from './constants'
import {HSLToHex, hexToHSL, lightnessFromHSLum, luminanceFromHex} from './helpers'
import {createDistributionValues, createHueScale, createSaturationScale} from './scales'
import type {PaletteConfig} from '../types'

export function createSwatches(palette: PaletteConfig) {
  const {value, valueStop} = palette

  // Tweaks may be passed in, otherwise use defaults  
  const useLightness = palette.useLightness ?? DEFAULT_PALETTE_CONFIG.useLightness
  const h = palette.h ?? DEFAULT_PALETTE_CONFIG.h
  const s = palette.s ?? DEFAULT_PALETTE_CONFIG.s
  const lMin = palette.lMin ?? DEFAULT_PALETTE_CONFIG.lMin
  const lMax = palette.lMax ?? DEFAULT_PALETTE_CONFIG.lMax

  // Create hue and saturation scales based on tweaks
  const hueScale = createHueScale(h, valueStop)
  const saturationScale = createSaturationScale(s, valueStop)

  // Get the base hex's H/S/L values
  const {h: valueH, s: valueS, l: valueL} = hexToHSL(value)

  // Create lightness scales based on tweak + lightness/luminance of current value
  const lightnessValue = useLightness ? valueL : luminanceFromHex(value)
  const distributionScale = createDistributionValues(lMin, lMax, lightnessValue, valueStop)

  const swatches = hueScale.map(({stop}, stopIndex) => {
    const newH = valueH + hueScale[stopIndex].tweak
    const newS = valueS + saturationScale[stopIndex].tweak
    const newL = useLightness
      ? distributionScale[stopIndex].tweak
      : lightnessFromHSLum(newH, newS, distributionScale[stopIndex].tweak)

    const newHex = HSLToHex(newH, newS, newL)

    return {
      stop,
      // Sometimes the initial value is changed slightly during conversion,
      // overriding that with the original value
      hex: stop === valueStop ? `#${value.toUpperCase()}` : newHex.toUpperCase(),
      // Used in graphs
      h: newH,
      hScale: hueScale[stopIndex].tweak,
      s: newS,
      sScale: saturationScale[stopIndex].tweak,
      l: newL,
    }
  })

  return swatches
}

export function createCustomSwatches(palette:any) {
  const {value, valueStop} = palette;

  // Tweaks may be passed in, otherwise use defaults
  const useLightness = palette.useLightness ?? DEFAULT_PALETTE_CONFIG.useLightness
  const h = palette.h ?? DEFAULT_PALETTE_CONFIG.h
  const s = palette.s ?? DEFAULT_PALETTE_CONFIG.s
  const lMin = palette.lMin ?? DEFAULT_PALETTE_CONFIG.lMin
  const lMax = palette.lMax ?? DEFAULT_PALETTE_CONFIG.lMax

  // Create hue and saturation scales based on tweaks
  const hueScale = createHueScale(h, valueStop)
  const saturationScale = createSaturationScale(s, valueStop)

  // Get the base hex's H/S/L values
  const {h: valueH, s: valueS, l: valueL} = hexToHSL(value[2])

  // Create lightness scales based on tweak + lightness/luminance of current value
  const lightnessValue = useLightness ? valueL : luminanceFromHex(value[2])
  const distributionScale = createDistributionValues(lMin, lMax, lightnessValue, valueStop)

  const swatches = value.map((hexVal:any, stopIndex:any) => {
   const {h: valueH, s: valueS, l: valueL} = hexToHSL(hexVal);
    const newH = valueH + hueScale[stopIndex].tweak
    const newS = valueS + saturationScale[stopIndex].tweak
    // const newL = useLightness
    //   ? distributionScale[stopIndex].tweak
    //   : lightnessFromHSLum(newH, newS, distributionScale[stopIndex].tweak)

    const newHex = HSLToHex(newH, newS, valueL)
    let stop;

    switch (stopIndex) {
      case 0:
        stop=50;
        break;
      case 1:
        stop=200;
        break;
       case 2:
        stop=500;
        break;     
      case 3:
        stop=700;
        break;
      case 4:
        stop=900;
        break;            
      default:
        break;
    }

    return {
      stop: stop,
      // Sometimes the initial value is changed slightly during conversion,
      // overriding that with the original value
      hex: stop === valueStop ? `${value[2].toUpperCase()}` : newHex.toUpperCase(),
      // Used in graphs
      h: newH,
      hScale: hueScale[stopIndex].tweak,
      s: newS,
      sScale: saturationScale[stopIndex].tweak,
      l: valueL,
    }
  })

  return swatches
}

