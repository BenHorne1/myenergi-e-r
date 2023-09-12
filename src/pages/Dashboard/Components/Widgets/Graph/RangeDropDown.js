// component to create graph time range drop down

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateGraphRange } from "../../../../../redux/action";

const ranges = [
  {
    id: 1,
    name: "10",
  },
  {
    id: 2,
    name: "30",
  },
  {
    id: 3,
    name: "60",
  },
  {
    id: 4,
    name: "120",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Dropdown({ id }) {
  const deviceList = useSelector((state) => state.deviceList);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(deviceList[id-1].graphRange);

    //   dispatch(updateGraphRange(id, range));

   useEffect(() => {
     dispatch(updateGraphRange(id, selected));
   },  [id, selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-100 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {ranges.map((range) => (
                <Listbox.Option
                  key={range.id}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-green-400 text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={range}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block truncate"
                          )}
                        >
                          {range.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-green-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
