const Log = ({ id, thisDevice }) => {
  console.log("Log for ", id);
  return (
    <div className="text-white min-w-[650px] min-h-[400px] max-h-[400px]  m-2 py-2 px-6 max-w-sm bg-zinc-800 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
      Log:
      <div className="terminal">{thisDevice.log}</div>
    </div>
  );
};

export default Log;
