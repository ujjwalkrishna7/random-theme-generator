import { useEffect, useState, Fragment } from "react";
import { os, path } from "../lib/cep/node";
import {
  csi,
  evalES,
  evalFile,
  openLinkInBrowser,
  subscribeBackgroundColor,
  evalTS,
} from "../lib/utils/bolt";
import { Dialog, Transition } from "@headlessui/react";
import Palette from "./components/Palette";
import { createRandomPalette } from "./utils/createRandomPalette";
import { Mode, PaletteConfig } from "./types";
import { DEFAULT_PALETTE_CONFIG, MODES } from "./utils/constants";
import { createCustomPalette } from "./utils/createCustomPalette";
import { FaFill, FaGgCircle } from "react-icons/fa";
import { BsFillPaletteFill } from "react-icons/bs";
import { Tab, Listbox } from "@headlessui/react";
import { createPaletteFromImage } from "./utils/createPaletteFromImage";
import { classNames } from "./utils/helpers";
import List from "./components/List";
import { PaletteIcon } from "./icons/PaletteIcon";
import { FolderIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import chroma from "chroma-js";
import { FillGeneratePalette } from "./components/FillGeneratePalette";
import { SaveComponent } from "./components/SaveComponent";
import { FillLoadPalette } from "./components/FillLoadPalette";

const list = [
  { name: "Single Color Based" },
  { name: "Pure Random" },
  { name: "Theme Based" },
];

const theme = [
  { name: "Pastel" },
  { name: "Vintage" },
  { name: "Retro" },
  { name: "Futuristic" },
  { name: "Minimalistic" },
  { name: "Aesthetic" },
  { name: "Anime" },
  { name: "Cyberpunk" },
];

const Main = () => {
  const [bgColor, setBgColor] = useState("#000000");
  let random = createRandomPalette();
  const [paletteState, setPaletteState] = useState<PaletteConfig>(random);
  const [currentMode, setCurrentMode] = useState<Mode>(MODES[0]);
  const [selected, setSelected] = useState(list[0]);
  const [preset, setPreset] = useState([
    { name: "No Preset Selected", id: -1 },
  ]);
  const [presetData, setPresetData] = useState();
  const [selectedPreset, setSelectedPreset] = useState(preset[0]);
  const [selectedTheme, setSelectedTheme] = useState(theme[0]);
  const [presetName, setPresetName] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const[fillColor,setFillColor] = useState("");


  useEffect(() => {
    if (window.cep) {
      // subscribeBackgroundColor(setBgColor);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("presetPalette")) {
      const savedArray = localStorage.getItem("presetPalette");
      const parsedPreset = savedArray !== null ? JSON.parse(savedArray) : [];
      const presetArray = [{ name: "No Preset Selected", id: -1 }];
      parsedPreset.map((value: any, index: number) => {
        presetArray.push({ name: value.name, id: index });
      });
      setPreset(presetArray);
      setPresetData(parsedPreset);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedPreset.name != "No Preset Selected" && presetData) {
      setSelected({ name: "Pure Random" });
      setPaletteState(presetData[selectedPreset.id]);
    }
  }, [selectedPreset]);

  const generateNewPalette = (style: String) => {
    let random: PaletteConfig;
    switch (selected.name) {
      case "Single Color Based":
        random = createRandomPalette();
        break;
      case "Pure Random":
        random = createCustomPalette("");
        break;
      case "Theme Based":
        random = createCustomPalette(selectedTheme.name);
        break;

      default:
        random = DEFAULT_PALETTE_CONFIG;
        break;
    }
    setPaletteState(random);
  };

  const handleSave = () => {
    let presets = [];
    let currentState = paletteState;
    currentState.name = presetName;

    if (localStorage.getItem("presetPalette")) {
      const savedArray = localStorage.getItem("presetPalette");
      presets = savedArray !== null ? JSON.parse(savedArray) : [];

      presets.push(currentState);
      localStorage.setItem("presetPalette", JSON.stringify(presets));
    } else {
      presets.push(currentState);
      localStorage.setItem("presetPalette", JSON.stringify(presets));
    }
    setIsOpen(true);
  };

  const handleUpdate = (palette: PaletteConfig) => {
    setPaletteState(palette);
  };

  const [file, setFile] = useState();
  async function handleChange(e: any) {
    const random = await createPaletteFromImage(
      URL.createObjectURL(e.target.files[0])
    );
    setPaletteState(random);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const IllustratorPaletteCreate = () => {
    const finalPalette = paletteState.swatches
      .filter((swatch: any) => [50, 200, 500, 700, 900].includes(swatch.stop))
      .map((data, index) => {
        const rgb = chroma(data.hex).rgb();
        return { name: `#${index}`, r: rgb[0], g: rgb[1], b: rgb[2] };
      });

    evalTS("paletteCreate", finalPalette).then((res) => {
      console.log(res);
    });
  };

  const IllustratorFill = () => {
    let rgb;
    if(fillColor!=""){
      rgb = chroma(fillColor).rgb();
    }
    else{
      rgb = chroma(paletteState.swatches[Math.floor(paletteState.swatches.length/2)].hex).rgb();
    }
    const finalPalette = {
      name: `${paletteState.swatches[2].hex}`,
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
    };

    evalTS("paletteFill", finalPalette).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="app" style={{ backgroundColor: bgColor }}>
      <header className="app-header flex-col gap-5 flex  relative z-10">
        <div className="flex items-center gap-3 border border-white/10
         py-5 px-16 rounded-full mb-5">
          <PaletteIcon className="mt-1" color={"#34d399"} />

          <p className="inline-flex flex-col gap-1 transition font-display
           text-5xl font-black leading-none md:text-5xl bg-gradient-to-r
            from-20% bg-clip-text text-transparent from-emerald-400
             to-yellow-300">
            Paletizer
          </p>
        </div>
        <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px]
         -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px]
          bg-emerald-500"></div>

        <div className="w-full max-w-md px-2 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl
             bg-emerald-900/20 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-emerald-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-400",
                    selected
                      ? "bg-white shadow"
                      : "text-emerald-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Random Generation
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-emerald-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-emerald-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                Image Generation
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "rounded-xl p-3 border border-white/10",
                  "ring-0 focus:outline-none "
                )}
              >
                <div className="flex flex-col gap-5 items-center py-3 ">
                  <div className="flex justify-between items-center gap-2 z-20">
                    <div className="flex flex-col items-start">
                      <p className="font-medium text-xs text-white opacity-60 pl-2">
                        Select Mode:
                      </p>
                      <List
                        list={list}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <p className="font-medium text-xs text-white opacity-60 pl-2">
                        Load Preset:
                      </p>
                      <List
                        list={preset}
                        selected={selectedPreset}
                        setSelected={setSelectedPreset}
                      />
                    </div>
                  </div>

                  <Transition
                    appear
                    show
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="flex flex-col gap-5 items-center pb-3">
                      {selected.name === "Theme Based" && (
                        <div className="flex flex-col items-start z-10">
                          <p className="font-medium text-xs text-white opacity-60 pl-2">
                            Select Theme:
                          </p>
                          <List
                            list={theme}
                            selected={selectedTheme}
                            setSelected={setSelectedTheme}
                          />
                        </div>
                      )}
                    </div>

                    {paletteState && (
                      <Palette
                        paletteState={paletteState}
                        updateGlobal={(updatedPalette: PaletteConfig) =>
                          console.log()
                        }
                        Mode={selected.name}
                        currentMode={currentMode}
                        setPaletteState={setPaletteState}
                        fillColor={fillColor}
                        setFillColor={setFillColor}
                        tab="Random Generation"
                      />
                    )}
                  </Transition>

                  <FillGeneratePalette
                    IllustratorFill={IllustratorFill}
                    generateNewPalette={generateNewPalette}
                    IllustratorPaletteCreate={IllustratorPaletteCreate}
                  />
                </div>

                <SaveComponent
                  presetName={presetName}
                  setPresetName={setPresetName}
                  handleSave={handleSave}
                  Fragment={Fragment}
                  closeModal={closeModal}
                  isOpen={isOpen}
                />
              </Tab.Panel>

              <Tab.Panel
                className={classNames(
                  "rounded-xl p-3 border border-white/10",
                  "ring-0 focus:outline-none "
                )}
              >
                <div className="flex flex-col gap-5 items-center py-3 ">
                  <Transition
                    appear
                    show
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    {paletteState && (
                      <Palette
                        paletteState={paletteState}
                        updateGlobal={(updatedPalette: PaletteConfig) =>
                          console.log()
                        }
                        currentMode={currentMode}
                        Mode={selected.name}
                        setPaletteState={setPaletteState}
                        tab="Image Generation"
                        fillColor={fillColor}
                        setFillColor={setFillColor}
                      />
                    )}
                  </Transition>
                </div>

                <FillLoadPalette
                  IllustratorFill={IllustratorFill}
                  handleChange={handleChange}
                  IllustratorPaletteCreate={IllustratorPaletteCreate}
                />

                <SaveComponent
                  presetName={presetName}
                  setPresetName={setPresetName}
                  handleSave={handleSave}
                  Fragment={Fragment}
                  closeModal={closeModal}
                  isOpen={isOpen}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </header>
    </div>
  );
};

export default Main;
