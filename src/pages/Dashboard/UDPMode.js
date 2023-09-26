import { memo } from "react";
import { useDispatch } from "react-redux";

const UDPMode = memo(function DeviceMonitor({ id, thisDevice }) {
  console.log("UDP mode for", thisDevice);

  const dispatch = useDispatch();

  return <div>UDP MODE</div>;
});

export default UDPMode;
