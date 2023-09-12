import { memo } from "react";
import Graph from "./Graph";
import Dropdown from "./RangeDropDown";

//const GraphWindow = ({ id, thisDevice }) => {
const GraphWindow = memo(function GraphWindow({ id, thisDevice }) {
  return (
    <div className="text-white min-w-[650px] min-h-[450px] max-h-[450px]  m-2 py-2 px-6 max-w-sm bg-zinc-800 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
      <Graph id={id} />
      <Dropdown id={id} />
    </div>
  );
});

export default GraphWindow;
