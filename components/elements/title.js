import dynamic from "next/dynamic";
//custom packs
import { Transition } from "@headlessui/react";
//dynamic
const MdOutlineSchool = dynamic(
  async () => (await import("react-icons/md")).MdOutlineSchool
);

export default function Title({ title, light }) {
  return (
    <Transition className="flex items-center" appear={true} show={true}>
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full opacity-0"
        enterTo="-translate-x-0 opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-slate-900">
          <MdOutlineSchool size="2em" />
        </div>
      </Transition.Child>

      <Transition.Child
        enter="delay-100 transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full opacity-0"
        enterTo="-translate-x-0 opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <span className="text-xl font-semibold capitalize ml-1 text-slate-900">
          {title}
        </span>
      </Transition.Child>
    </Transition>
  );
}
