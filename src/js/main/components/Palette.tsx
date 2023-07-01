import React, { useEffect, useState } from "react";

// import Graphs from '~/components/Graphs'
import Swatch from "../components/Swatch";
import { DEFAULT_PALETTE_CONFIG } from "../utils/constants";
import { createSwatches } from "../utils/createSwatches";
import { isHex, isValidName } from "../utils/helpers";
import type { Mode, PaletteConfig } from "../types";

import ColorPicker from "./ColorPicker";
import * as Slider from "@radix-ui/react-slider";
import "./SliderStyles.css";

export const inputClasses = `w-full p-2 border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:bg-gray-100 focus:border-gray-300 invalid:focus:border-dashed invalid:focus:border-red-500 invalid:focus:bg-red-100 invalid:border-red-500 invalid:bg-red-100`;
export const labelClasses = `transition-color duration-200 text-xs font-bold`;

type PaletteProps = {
  paletteState: PaletteConfig;
  updateGlobal: Function;
  currentMode: Mode;
  Mode: String;
  setPaletteState: Function;
  tab: String;
  fillColor:String,
  setFillColor:Function,
};

export default function Palette(props: PaletteProps) {
  const {
    paletteState,
    updateGlobal,
    currentMode,
    Mode,
    setPaletteState,
    tab,
    fillColor,
    setFillColor,
  } = props;

  // Update global list every time local palette changes
  // ... if name and value are legit
  useEffect(() => {
    const validName = isValidName(paletteState.name) ? paletteState.name : null;
    const validValue = isHex(paletteState.value) ? paletteState.value : null;

    if (validName && validValue) {
      updateGlobal(paletteState);
    }
  }, [paletteState, updateGlobal]);

  const updateValue = (value: string) => {
    const newPalette = {
      ...paletteState,
      value,
    };

    const newSwatches = createSwatches(newPalette);

    setPaletteState({
      ...newPalette,
      swatches: newSwatches,
    });
  };

  // Handle any changes to the tweaks values
  const handleTweakChangeHue = (val: number[]) => {
    const tweakName = "h";
    const newTweakValue = val[0];

    const newPalette = {
      ...paletteState,
      [tweakName]: newTweakValue,
    };

    // Don't update swatches if the new value is invalid
    if (!String(newTweakValue)) {
      setPaletteState(newPalette);
      return;
    }

    setPaletteState({
      ...newPalette,
      swatches: createSwatches(newPalette),
    });
  };

  // Handle any changes to the tweaks values
  const handleTweakChangeSaturation = (val: number[]) => {
    const tweakName = "s";
    const newTweakValue = val[0];

    const newPalette = {
      ...paletteState,
      [tweakName]: newTweakValue,
    };

    // Don't update swatches if the new value is invalid
    if (!String(newTweakValue)) {
      setPaletteState(newPalette);
      return;
    }

    setPaletteState({
      ...newPalette,
      swatches: createSwatches(newPalette),
    });
  };

  // Handle change from color picker widget (debounced)
  // Do this by faking an event to handlePaletteChange
  const handleColorPickerChange = (newColor: string) => {
    if (newColor && isHex(newColor)) {
      updateValue(newColor.replace(`#`, ``).toUpperCase());
    }
  };

  const ringStyle = {
    "--tw-ring-color": paletteState.swatches[1].hex,
  } as React.CSSProperties;

  return (
    <article
      id={`s-${paletteState.value}`}
      className="grid grid-cols-1 gap-4 text-gray-500"
    >
      {Mode === "Single Color Based" && tab === "Random Generation" && (
        <div className="flex flex-col gap-5 pb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start z-10 gap-1">
              <div
                className=" w-52 flex justify-between cursor-pointer items-center transition 
                         gap-1 px-5 py-3 rounded-full text-zinc-50 bg-white/5 
                         disabled:bg-white/5 disabled:text-zinc-50 hover:bg-blue-100 hover:text-blue-950"
              >
                <p className="font-medium text-xs opacity-60 pl-2">
                  Center Hex :
                </p>
                <p className="font-medium text-sm">#{paletteState.value}</p>
              </div>
            </div>

            <div className="flex flex-col items-start z-10 gap-1">
              <div
                className="flex justify-center item cursor-pointer items-center transition 
                         gap-1 px-2 py-2 rounded-full text-zinc-50 bg-white/5 
                         disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/30 hover:text-blue-950"
              >
                <ColorPicker
                  color={paletteState.value}
                  onChange={handleColorPickerChange}
                  ringStyle={ringStyle}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start">
              <p className="font-medium text-xs text-white opacity-60 pl-2">
                Hue:
              </p>
              <Slider.Root
                className="SliderRoot"
                min={-5}
                max={5}
                step={1}
                onValueChange={handleTweakChangeHue}
                value={[paletteState.h ?? 0]}
              >
                <Slider.Track className="SliderTrack mx-3">
                  <Slider.Range className="SliderRange" />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
              </Slider.Root>
            </div>

            <div className="flex flex-col items-start">
              <p className="font-medium text-xs text-white opacity-60 pl-2">
                Saturation:
              </p>
              <Slider.Root
                className="SliderRoot"
                min={-10}
                max={0}
                step={1}
                onValueChange={handleTweakChangeSaturation}
                value={[paletteState.s ?? 0]}
              >
                <Slider.Track className="SliderTrack mx-3">
                  <Slider.Range className="SliderRange" />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
              </Slider.Root>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-2 grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 sm:gap-2 text-2xs sm:text-xs w-[400px]">
        {paletteState.swatches
          .filter((swatch: any) =>
            [50, 200, 500, 700, 900].includes(swatch.stop)
          )
          .map((swatch: any) => (
            <Swatch key={swatch.stop} swatch={swatch} mode={currentMode} fillColor={fillColor} setFillColor={setFillColor} />
          ))}
      </div>
    </article>
  );
}
