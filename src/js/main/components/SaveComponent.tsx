import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

export const SaveComponent = ({presetName,setPresetName,handleSave,Fragment,closeModal,isOpen}:any) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-xs text-white opacity-40 pl-2">
            Save Preset (Name) :
          </p>
          <input
            value={presetName}
            onChange={(e: any) => {
              setPresetName(e.target.value);
            }}
            className="w-52 flex justify-between cursor-pointer items-center transition 
           gap-1 px-5 py-3 rounded-full text-zinc-50 bg-white/5 text-xs font-
           disabled:bg-white/5 disabled:text-zinc-50 hover:bg-white/10 focus:outline-none"
          />
        </div>

        {presetName ? (
          <div className="flex flex-col items-center gap-1">
            <CheckCircleIcon
              onClick={handleSave}
              className="w-8 h-8 text-emerald-500 cursor-pointer"
            />
            <p className="font-medium text-xs text-white opacity-40">Save</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <CheckCircleIcon className="w-8 h-8 text-gray-500" />
            <p className="font-medium text-xs text-white opacity-40">Save</p>
          </div>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-64 border border-white/20 max-w-md transform overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-emerald-200 opacity-60"
                  >
                    Preset Saved
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white opacity-60">
                      Your Preset have been saved Successfully.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
