import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateConnectionType,
  updateDeviceName,
  updateIPAddress,
  updatePort,
  updateSerial,
} from "../redux/action";
import Log from "./widgets/Log";

const DeviceMonitor = ({ id, thisDevice }) => {
  console.log("showing device", id);

  const dispatch = useDispatch();

  // UDP / Serial state switch
  const [toggle, setToggle] = useState(!thisDevice.connectionType);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
    dispatch(updateConnectionType(id, toggle));
    console.log("toggle", toggle);
  };

  useEffect(() => {
    const udpReceivedHandler = (UDP) => {
      UDP.msg = JSON.parse(String.fromCharCode(...UDP.msg));
      console.log("packet recieved", UDP.msg);

      if (UDP.msg.SerialID === thisDevice.serial) {
        console.log("Matched Serial", id, thisDevice.serial);
        // update device info
        dispatch(updateIPAddress(id, UDP.IPAddress));
        dispatch(updatePort(id, UDP.port));
        dispatch(updateDeviceName(id, UDP.msg.DeviceName));
        return () => (thisDevice = null), (id = null);
      } else {
        console.log("non matched serial for ", id);
      }
    };

    ipcRenderer.on("UDP:RECIEVED", udpReceivedHandler);

    return () => {
      ipcRenderer.removeListener("UDP:RECIEVED", udpReceivedHandler);
    };
  });

  return (
    <>
      <div className="text-white min-w-[1315px] min-h-2 max-h-[400px]  m-2 py-2 px-6 max-w-sm bg-zinc-600 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
        ID: {id} &ensp; UDP &ensp;
        <Switch
          className="mx-2 bg-zinc-900"
          checked={thisDevice.connectionType}
          onClick={toggler}
        />
        Serial &ensp;
        <input
          className=" mx-2 mt-1 shadow-inner bg-zinc-500 appearance-none border-2 border-zinc-500 rounded w-50 py-1 px-4 text-white leading-tight focus:outline-none focus:bg-zinc-500 focus:border-green-400"
          defaultValue={thisDevice.serial}
          onChange={(e) => {
            dispatch(updateSerial(id, e.target.value));
            thisDevice.serial = e.target.value;
          }}
        />
        Device Name: {thisDevice.name} &ensp;
        {toggle ? (
          // UDP
          <>
            Address: {thisDevice.IPAddress}:{thisDevice.port}
          </>
        ) : (
          // Serial
          <>Serial </>
        )}
      </div>
      <Log id={id} thisDevice={thisDevice} />
    </>
  );
};

export default DeviceMonitor;
