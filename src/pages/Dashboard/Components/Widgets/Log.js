import { useEffect, useRef } from "react";

const Log = ({ id, thisDevice }) => {
  console.log("Log for ", id);

  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  })

  return (
    <div className="text-white min-w-[650px] min-h-[450px] max-h-[450px]  m-2 py-2 px-6 max-w-sm bg-zinc-800 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
      Log:
      <div className="terminal" ref={containerRef}>{thisDevice.log}</div>
    </div>
  );
};

export default Log;
