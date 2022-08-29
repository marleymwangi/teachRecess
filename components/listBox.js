import dynamic from "next/dynamic";
import { Fragment, useState } from "react";
//custom packages
import { Listbox, Transition } from "@headlessui/react";
//dynamic
const FaCheck = dynamic(async () => (await import("react-icons/fa")).FaCheck);
const HiOutlineSelector = dynamic(
  async () => (await import("react-icons/hi")).HiOutlineSelector
);

export default function ListBox({ list, value, setFunc }) {

  return (
    <div className="relative w-full my-2 z-50   ">
      <Listbox value={value} onChange={setFunc}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm font-semibold">
            <span className="block truncate">{value.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSelector size="1em" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 h-full"
            leaveTo="opacity-0 h-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm no-scroll">
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <FaCheck size="1em" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
