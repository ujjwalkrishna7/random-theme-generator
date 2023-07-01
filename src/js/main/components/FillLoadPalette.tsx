import { FolderIcon } from "@heroicons/react/24/solid";
import React from "react";
import { BsFillPaletteFill } from "react-icons/bs";
import { FaFill } from "react-icons/fa";

export const FillLoadPalette = ({
  IllustratorFill,
  handleChange,
  IllustratorPaletteCreate,
}: any) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col items-start gap-1">
        <div className="flex flex-col items-center z-10 gap-1 mb-2">
          <div
            className="flex justify-center item cursor-pointer items-center transition 
           gap-1 px-3 py-3 rounded-full text-zinc-50 bg-white/5 
           disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/30"
            onClick={IllustratorFill}
          >
            <FaFill size={30} />
          </div>
          <p className="font-medium text-[11px] text-white opacity-40 ">Fill</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <label className="custom-file-upload ">
          <input type="file" onChange={handleChange} />
          <div
            className="flex justify-center item cursor-pointer items-center transition 
           gap-1 px-3 py-3 rounded-xl text-zinc-50 bg-white/5 
           disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/30 "
          >
            <FolderIcon className="w-6 h-6" />
          </div>
        </label>
        <p className="font-medium text-xs text-white opacity-60 ">Load Image</p>
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
  );
};
