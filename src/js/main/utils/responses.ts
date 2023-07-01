import {nanoid} from 'nanoid'

import {DEFAULT_PALETTE_CONFIG, META, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from './constants'
import {createRandomPalette} from './createRandomPalette'
import {createSwatches} from './createSwatches'
import {isHex, isValidName, removeTrailingSlash} from './helpers'
import type {Mode, PaletteConfig} from '../types'

import {createDisplayColor} from './createDisplayColor'

export function createPaletteFromNameValue(name: string, value: string): PaletteConfig | null {
  if (!name || !isValidName(name) || !value || !isHex(value)) {
    return null
  }

  const nameValue = {
    ...DEFAULT_PALETTE_CONFIG,
    id: nanoid(),
    name,
    value: value.toUpperCase(),
    swatches: [],
  }

  return {
    ...nameValue,
    swatches: createSwatches(nameValue),
  }
}

export function createCanonicalUrl(palettes: PaletteConfig[], apiUrl = false) {
  const baseUrl = apiUrl ? `${META.origin}/api` : META.origin

  if (!palettes?.length) {
    // This shouldn't be possible?
    return removeTrailingSlash(baseUrl)
  } else if (palettes.length === 1) {
    // Single palettes have pretty URLs
    const canonicalUrl = [baseUrl, palettes[0].name, palettes[0].value.toUpperCase()].join(`/`)

    return removeTrailingSlash(canonicalUrl)
  } else if (typeof document !== 'undefined') {
    // Use the current URL but maybe replace the base URL
    const currentUrl = new URL(window.location.href)
    const canonicalUrl = currentUrl.toString().replace(currentUrl.origin, baseUrl)

    return removeTrailingSlash(canonicalUrl)
  }

  // Create a complete URL from current palettes
  const canonicalUrl = new URL(baseUrl)
  palettes.forEach((palette) => {
    canonicalUrl.searchParams.set(palette.name, palette.value.toUpperCase())
  })

  return removeTrailingSlash(canonicalUrl.toString())
}
