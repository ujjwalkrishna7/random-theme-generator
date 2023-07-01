import React from 'react'
import { BsFillPaletteFill } from 'react-icons/bs'
import { FaFill, FaGgCircle } from 'react-icons/fa'

export const FillGeneratePalette = ({IllustratorFill, generateNewPalette, IllustratorPaletteCreate}:any) => {
  return (
    
    <div className="flex justify-between items-center w-full">
    <div className="flex flex-col items-start gap-1">
      <div className="flex flex-col items-center z-10 gap-1">
        <div
          className="flex justify-center item cursor-pointer items-center transition 
         gap-1 px-3 py-3 rounded-full text-zinc-50 bg-white/5 
         disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/30"
          onClick={IllustratorFill}
        >
          <FaFill size={30} />
        </div>
        <p className="font-medium text-[11px] text-white opacity-40 ">
          Fill
        </p>
      </div>
    </div>

    <div
      onClick={() => generateNewPalette("")}
      className=" justify-center group/hero-product flex flex-col 
      items-center gap-2 p-4 md:p-4  bg-white/5 backdrop-blur 
      transition rounded-lg first:rounded-t-lg 
      last:rounded-b-lg first:!rounded-l-4xl last:!rounded-r-4xl hover:scale-[1.02] hover:bg-white/10 cursor-pointer select-none"
    >
      <FaGgCircle size={60} />
      <p className="font-bold opacity-50">Generate</p>
    </div>

    <div className="flex flex-col items-start gap-1">
      <div className="flex flex-col items-center z-10 gap-1">
        <div
          className="flex justify-center item cursor-pointer items-center transition 
         gap-1 px-3 py-3 rounded-full text-zinc-50 bg-white/5 
         disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/30 "
          onClick={IllustratorPaletteCreate}
        >
          <BsFillPaletteFill size={30} />
        </div>
        <p className="font-medium text-[11px] text-white opacity-40">
          Palette
        </p>
      </div>
    </div>
  </div>

  )
}
