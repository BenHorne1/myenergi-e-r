import { useState } from "react";

export default function SerialMode() {
    const [listOfPorts, setListOfPorts] = useState([])
    const [selected, setSelected] = useState()
    
  return (
    <div>
      <select
        className="mt-2 mr-2 z-0 py-2 cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 sm:text-sm sm:leading-6"
        id="connectDropdown"
        onClick={listSerialDevices}
      ></select>
    </div>
  );
}

async function listSerialDevices() {
  await navigator.serial.requestPort();
}
