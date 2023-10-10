import { Switch } from "antd";
import { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import {
  toggleGraph,
  toggleLog,
  toggleTerminal,
  toggleUDL,
  updateConnectionType,
  updateDeviceName,
  updateGraph,
  updateIPAddress,
  updateLog,
  updatePort,
  updateSerial,
  updateTerminal,
  updateUDL,
} from "../../../redux/action";
import ToggleCheckbox from "../../../components/ToggleCheckbox";
import Log from "./Widgets/Log";
import Terminal from "./Widgets/Terminal";
import UDL from "./Widgets/UDL";
import GraphWindow from "./Widgets/Graph/GraphWindow";


let disElem;

//const DeviceMonitor = ({ id, thisDevice }) => {
const DeviceMonitor = memo(function DeviceMonitor({ id, thisDevice }) {
  console.log("showing device", thisDevice);

  const dispatch = useDispatch();

  // UDP / Serial state switch
  const [toggle, setToggle] = useState(!thisDevice.connectionType);

  const time = new Date();
  const timeStr = time.toLocaleTimeString();

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
    dispatch(updateConnectionType(id, toggle));
    console.log("toggle", toggle);
  };

  // handlers for widget toggles
  const handleTerminalToggle = (isChecked) => {
    dispatch(toggleTerminal(id, isChecked));
  };

  const handleLogToggle = (isChecked) => {
    dispatch(toggleLog(id, isChecked));
  };

  const handleUDLToggle = (isChecked) => {
    dispatch(toggleUDL(id, isChecked));
  };

  const handleGraphToggle = (isChecked) => {
    dispatch(toggleGraph(id, isChecked));
  };

  const udpReceivedHandler = (UDP) => {
    UDP.msg = JSON.parse(String.fromCharCode(...UDP.msg));
    console.log("packet received", UDP.msg);

    if (UDP.msg.SerialID == thisDevice.serial) {
      console.log("Matched Serial", id, thisDevice.serial);
      // update device info
      dispatch(updateIPAddress(id, UDP.IPAddress));
      dispatch(updatePort(id, UDP.port));
      dispatch(updateDeviceName(id, UDP.msg.DeviceName));

      // update terminal
      if (UDP.msg.Terminal) {
        let newTerminalOutput =
          thisDevice.terminal + timeStr + " $ " + UDP.msg.Terminal + "\n";
        dispatch(updateTerminal(id, newTerminalOutput));
      }

      // update log
      if (UDP.msg.Log) {
        let newLogOutput =
          thisDevice.log + timeStr + " >> " + UDP.msg.Log + "\n";
        dispatch(updateLog(id, newLogOutput));

        // update log csv
        console.log("sending to csv");
        window.indexBridge.postMessage("csv:logData", {
          logData: UDP.msg.Log,
          id: id,
          serial: UDP.msg.SerialID,
        });
      }

      // update UDL
      if (UDP.msg.UDL) {
        try {
          //disElem = document.querySelector(`#UDL${id}`);

          let newUDL = "";

          for (let i = 0; i < thisDevice.UDL.length; i++) {
            if (i + 1 === UDP.msg.UDL.y) {
              thisDevice.UDL[i] = i + 1 + ": " + UDP.msg.UDL.text + `\n`;
            }
            newUDL += thisDevice.UDL[i] + `\n`;
          }
          //disElem.innerHTML = newUDL;
        } catch {}
        // dispatch(updateUDL(id, newUDL));
      }

      // update Graph
      if (UDP.msg.Data) {
        dispatch(updateGraph(id, UDP.msg.Data));

        // update graph CSV
        window.indexBridge.postMessage("csv:graphData", {
          graphData: UDP.msg.Data,
          id: id,
          serial: UDP.msg.SerialID,
        });
      }

      // return () => (thisDevice = null), (id = null);
    } else {
      console.log("non-matched serial for ", id);
    }
  };
  useEffect(() => {
    window.indexBridge.once(`UDP:RECIEVED${thisDevice.serial}`, udpReceivedHandler);

    return () => {
      window.indexBridge.removeListener("UDP:RECIEVED", udpReceivedHandler);
    };
  }); // Empty dependency array means this effect runs only on component mount and unmount.

  return (
    <>
      <div className="text-white min-w-[1315px] min-h-2 max-h-[400px]  m-2 py-2 px-6 max-w-sm bg-zinc-600 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
        ID: {id} &ensp; UDP &ensp;
        {/* <Switch
          className="mx-2 bg-zinc-900"
          checked={thisDevice.connectionType}
          onClick={toggler}
        /> */}
        Serial &ensp;
        {toggle ? (
          <input
            className=" mx-2 mt-1 shadow-inner bg-zinc-500 appearance-none border-2 border-zinc-500 rounded w-50 py-1 px-4 text-white leading-tight focus:outline-none focus:bg-zinc-500 focus:border-green-400"
            defaultValue={thisDevice.serial}
            onChange={(e) => {
              dispatch(updateSerial(id, e.target.value));
              thisDevice.serial = e.target.value;
            }}
          />
        ) : null}
        Device Name: {thisDevice.name} &ensp;
        {toggle ? (
          // UDP
          <>
            Address: {thisDevice.IPAddress}:{thisDevice.port}
            {/* <UDPMode id={id} thisDevice={thisDevice} /> */}
          </>
        ) : (
          // Serial
          <>
            Serial
            {/* <SerialMode id={id} thisDevice={thisDevice}/> */}
          </>
        )}
        <br /> <br />
        <div className=" text-white">
          Terminal:&ensp;
          <ToggleCheckbox
            onToggle={handleTerminalToggle}
            defaultToggle={thisDevice.showTerminal}
          />
          &ensp;Log:&ensp;
          <ToggleCheckbox
            onToggle={handleLogToggle}
            defaultToggle={thisDevice.showLog}
          />
          &ensp;Custom Display:&ensp;
          <ToggleCheckbox
            onToggle={handleUDLToggle}
            defaultToggle={thisDevice.showUDL}
          />
          &ensp;Graph:&ensp;
          <ToggleCheckbox
            onToggle={handleGraphToggle}
            defaultToggle={thisDevice.showGraph}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {thisDevice.showTerminal && (
          <Terminal id={id} thisDevice={thisDevice} />
        )}
        {thisDevice.showLog && <Log id={id} thisDevice={thisDevice} />}
        {thisDevice.showUDL && <UDL id={id} thisDevice={thisDevice} />}
        {thisDevice.showGraph && (
          <GraphWindow id={id} thisDevice={thisDevice} />
        )}
      </div>
    </>
  );
});

export default DeviceMonitor;
