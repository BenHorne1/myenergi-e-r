import { useDispatch, useSelector } from "react-redux";
import { setConfig } from "../../../redux/action";

export default function CSVSettings() {
  const dispatch = useDispatch();
  let config = useSelector((state) => state.config);

  return (
    <div className="font-bold text-white min-w-[800px] min-h-2 max-h-[400px]  m-2 py-2 px-6 max-w-sm bg-zinc-600 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
      CSV Settings:
      <div className="font-normal">
        Save Location:
        <input
          defaultValue={config.SaveLocation}
          className="my-2 shadow-inner bg-zinc-500 appearance-none border-2 border-zinc-500 rounded w-full py-1 px-4 text-white leading-tight focus:outline-none focus:bg-zinc-500 focus:border-green-400"
          onChange={(e) => dispatch(setConfig("SaveLocation", e.target.value))}
        />
      </div>
    </div>
  );
}

