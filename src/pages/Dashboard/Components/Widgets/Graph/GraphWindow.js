import React, { memo } from "react";
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

/* class GraphWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderGraph: true };
    this.handleGraphUnmount = this.handleGraphUnmount.bind(this);
  }

  handleGraphUnmount() {
    this.setState({ renderGraph: false });
  }

  render() {
    return (
      <div className="text-white min-w-[650px] min-h-[450px] max-h-[450px]  m-2 py-2 px-6 max-w-sm bg-zinc-800 rounded-xl shadow-lg space-y-2 sm:py-4  sm:items-center sm:space-y-0 ">
        {this.state.renderGraph ?<Graph id={this.props.id} /> : null}
        <Dropdown id={this.props.id} />
      </div>
    );
  }
} */

export default GraphWindow;
