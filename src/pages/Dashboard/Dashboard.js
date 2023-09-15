import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addDevice } from "../../redux/action";
import { connect } from "react-redux";
import DeviceMonitor from "./Components/DeviceMonitor";
import { memo, useEffect } from "react";

let localIP, localPort;

//const Dashboard = ({ deviceList }) => {
const Dashboard = memo(function Dashboard() {
  const deviceList = useSelector((state) => state.deviceList);
  const dispatch = useDispatch();

  console.log("dashboard is being rendered");

  // create matix for the UDL
  const xx = 110;
  const yy = 15;

  var displayMatrix = [
    "1:" + `\n`,
    "2:" + `\n`,
    "3:" + `\n`,
    "4:" + `\n`,
    "5:" + `\n`,
    "6:" + `\n`,
    "7:" + `\n`,
    "8:" + `\n`,
    "9:" + `\n`,
    "10:" + `\n`,
  ];

  const arrayOfZeros = new Array(120).fill(0);

  // template for a new device
  const newDevice = {
    id: deviceList.length + 1,
    name: "Device Name",
    connectionType: false,
    IPAddress: "Not",
    port: "Connected",
    serial: "Insert Serial Number",
    terminal: "",
    log: "",
    UDL: displayMatrix,
    showTerminal: true,
    showLog: false,
    showUDL: false,
    showGraph: false,
    v1: arrayOfZeros,
    v2: arrayOfZeros,
    v3: arrayOfZeros,
    v4: arrayOfZeros,
    graphRange: { id: 2, name: "30" },
    xx: xx,
    yy: yy,
  };

  const addNewDevice = () => {
    console.log("adding a new device");
    dispatch(addDevice([...deviceList, newDevice]));
  };
  useEffect(() => {
    ipcRenderer.on("IPADDRESS", (data) => {
      console.log(data);
      localIP = data.IP;
      localPort = data.Port;
    });
  });

  return (
    <div className="ml-16 min-h-screen min-w-full bg-zinc-700">
      <div className="bg-zinc-800 mb-2 shadow-md ">
        <h1 className="mx-2 text-white bg-zinc-800 font-bold shadow-md">
          Dashboard
        </h1>
      </div>
      <div className="ml-2 text-white font-bold">
        IP Address: {localIP}:{localPort}
      </div>
      {deviceList.map((device, index) => (
        <div key={device.id}>
          {/* {console.log("Showing Device", device.id)} */}
          <DeviceMonitor
            id={device.id}
            thisDevice={deviceList[device.id - 1]}
          />
        </div>
      ))}

      <button onClick={addNewDevice} className="add-device group HiOutlineCog">
        <AiOutlinePlus size="28" />
        <span className="sidebar-tooltip group-hover:scale-100">
          Add a new device
        </span>
      </button>
    </div>
  );
});

// const mapStateToProps = (state) => ({
//   deviceList: state.deviceList,
// });

// const mapDispatchToProps = {
//   addDevice,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard;
