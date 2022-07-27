import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { classNames } from "../../context/vars";

export default function DropDown({ value, placeholder, list, setFunc }) {

  return (
    <Menu as="div" className="relative inline-block text-left text-gray-600">
      <Menu.Button
        className={classNames("border !z-0 border-primary focus:border-2 py-3 inline-flex w-full justify-center rounded-md ",
          !value ? "text-gray-400" : "text-gray-900 font-semibold"
        )}
      >
        {value ? value : placeholder}
      </Menu.Button>

      {/* Use the Transition component. */}
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="absolute !z-10 mt-2 border w-full max-h-72 overflow-y-auto custom-scroll origin-top-center divide-y divide-gray-100 
        rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {list?.length > 0 &&
            list.map((item, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <p
                    className={` text-center py-3 ${
                      active && "bg-primary text-primary-content font-semibold"
                    }`}
                    href="/account-settings"
                    onClick={() => setFunc({ data: item, state: "success" })}
                  >
                    {item}
                  </p>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
