import { config } from "@fortawesome/fontawesome-svg-core";
import CSVSettings from "./Components/CSVSettings";
import ConnectionSettings from "./Components/ConnectionSettings";
import { useSelector } from "react-redux";

export default function Settings() {
  let config = useSelector((state) => state.config);

  function Save() {
    window.indexBridge.send("SAVE_CONFIG", {
      UDPPort: config.UDPPort,
      SaveLocation: config.SaveLocation,
    });

    window.indexBridge.send("UDP:SAVELOCATION", {
      
    })
  }

  return (
    <div className="ml-16 min-h-screen min-w-full bg-zinc-700 text-white">
      <div className="bg-zinc-800 mb-2 shadow-md ">
        <h1 className="mx-2 text-white bg-zinc-800 font-bold shadow-md">
          Settings
        </h1>
      </div>
      <ConnectionSettings />
      <CSVSettings />
      <button
        className="ml-2 bg-green-400 px-3 py-2 rounded-md text-sm font-medium no-underline text-black hover:bg-green-600 hover:text-white shadow-lg "
        onClick={Save}
      >
        Save
      </button>
      &ensp; Finish all test runs before saving as the dashboard will be reset
    </div>
  );
}
