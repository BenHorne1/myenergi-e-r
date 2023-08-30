import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard() {
  console.log("dashboard is being rendered");

  const newDevice = () => {
    console.log("adding a new device");
  };

  return (
    <div className="ml-16 min-h-screen min-w-full bg-zinc-700">
      <div className="bg-zinc-800 mb-2 shadow-md ">
        <h1 className="mx-2 text-white bg-zinc-800 font-bold shadow-md">
          Dashboard
        </h1>
      </div>
      <button onClick={newDevice} className="add-device group HiOutlineCog">
        <AiOutlinePlus size="28" />
        <span className="sidebar-tooltip group-hover:scale-100">
          Add a new device
        </span>
      </button>
    </div>
  );
}
