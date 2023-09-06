// component to create graph time range drop down

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateGraphRange } from "../../../redux/action";

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

//export let range = [];

export default function Dropdown({ id }) {
  const deviceList = useSelector((state) => state.deviceList);
  const dispatch = useDispatch()

  return (<div>Dropdown</div>)

}
