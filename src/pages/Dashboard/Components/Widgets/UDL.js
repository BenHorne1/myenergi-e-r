import {
  AiOutlinePlus,
  AiOutlineLine,
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const UDL = ({ id, thisDevice }) => {

  console.log(thisDevice.UDL)

  const minClicked = () => {
    ipcRenderer.send("minClicked", {
      port: thisDevice.port,
      IPAddress: thisDevice.IPAddress,
    });
  };
  const plusClicked = () => {
    ipcRenderer.send("plusClicked", {
      port: thisDevice.port,
      IPAddress: thisDevice.IPAddress,
    });
  };

  const leftClicked = () => {
    ipcRenderer.send("leftClicked", {
      port: thisDevice.port,
      IPAddress: thisDevice.IPAddress,
    });
  };

  const rightClicked = () => {
    ipcRenderer.send("rightClicked", {
      port: thisDevice.port,
      IPAddress: thisDevice.IPAddress,
    });
  };

  return (
    <div className="text-white min-w-[650px] min-h-[450px] max-h-[450px]  m-2 py-2 px-6 max-w-sm bg-zinc-800 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
      UDL:
      <div className="UDL" id= {`UDL${id}`}>{thisDevice.UDL}</div>
      {/* <div className="terminal">{thisDevice.log}</div> */}
      <>
        <button className="UDL-buttons group HiOutlineCog" onClick={minClicked}>
          <AiOutlineLine size="28" />
        </button>
        <button
          className="UDL-buttons group HiOutlineCog"
          onClick={plusClicked}
        >
          <AiOutlinePlus size="28" />
        </button>
        <button
          className="UDL-buttons group HiOutlineCog"
          onClick={leftClicked}
        >
          <AiFillCaretLeft size="28" />
        </button>
        <button
          className="UDL-buttons group HiOutlineCog"
          onClick={rightClicked}
        >
          <AiFillCaretRight size="28" />
        </button>
      </>
    </div>
  );
};

export default UDL;
