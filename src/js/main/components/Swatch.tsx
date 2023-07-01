import {createDisplayColor} from '../utils/createDisplayColor'
import type {Mode, SwatchValue} from '../types'
import { useState } from 'react'
import { classNames } from '../utils/helpers'

type SwatchProps = {
  swatch: SwatchValue
  mode: Mode
  fillColor:String,
  setFillColor:Function,
}

export default function Swatch(props: SwatchProps) {
  const {swatch, mode,fillColor,setFillColor} = props


  let display = createDisplayColor(swatch.hex, mode)

  return (
    <div className="flex-1 flex flex-col gap-2 sm:gap-2 ">
      <div
      onClick={()=>{setFillColor(swatch.hex)}}
        className={classNames("h-32 xl:h-32 w-full rounded shadow-inner flex flex-col items-center ",
        "justify-center transition-all duration-500",
        "hover:scale-105 ring-white ring-opacity-80 ring-offset-1 ring-offset-white focus:outline-none active:ring-2",
        fillColor === swatch.hex &&
        "ring-2"
        )}
        style={{backgroundColor: display || `transparent`}}
      />
      <div className="rotate-90 -mt-3 mb-5 sm:m-0 text-right 
      sm:rotate-0 flex flex-col sm:flex-row sm:items-center 
      lg:flex-col lg:items-start xl:flex-row xl:items-center 
      justify-between px-1">
        <div className="font-mono font-bold opacity-80">{swatch.stop}</div>
        {/* <div className="hidden sm:block tabular-nums font-mono font-bold">{swatch.hex.toUpperCase()}</div> */}
        <div className="hidden sm:block tabular-nums opacity-75 font-mono font-bold text-[11px]">{display}</div>
      </div>
    </div>
  )
}
