import { useState } from "react";

let port = null;

// Optional filters to limit what serial ports are returned
let filters = [{}];

export default function SerialMode() {
  const [listOfPorts, setListOfPorts] = useState([]);
  const [selected, setSelected] = useState();

  window.indexBridge.on("port:list", (e, options) => {
    setListOfPorts(e);
    //console.log(listOfPorts)
  });

  return (
    <div>
      <select
        className="mt-2 mr-2 z-0 py-2 cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 sm:text-sm sm:leading-6"
        id="connectDropdown"
        onClick={listSerialDevices}
        onChange={(e) => {
          const c = listOfPorts?.find(
            (x) => x.portName === e.target.value
            );
            console.log(c)
            setSelected(c)
            filters = [
                { usbVendorId: c.vendorId, usbProductId: c.productId}
            ]
        }}
      >
        <option value="default">Choose Port</option>
        {listOfPorts.map((port) => (
          <option key={port.portName} value={port.portName}>
            {port.portName}
          </option>
        ))}
      </select>
      <button
        className="mr-2 bg-green-400 px-3 py-2 rounded-md text-sm font-medium no-underline text-black hover:bg-green-600 hover:text-white shadow-lg "
        onClick={ConnectButton}
      >
        Connect
      </button>
    </div>
  );
}

async function listSerialDevices() {
  await navigator.serial.requestPort();
}

async function ConnectButton() {
  console.log("connecting");
  // request connection to port using selection chosen thry filters
  try {
    port = await navigator.serial.requestPort({ filters });
    await port.open({ baudRate: 9600 });
    console.log(port)

    if ("serial" in navigator) {
        
    }
  


} catch {
    alert("serial connection failed")
}
}
