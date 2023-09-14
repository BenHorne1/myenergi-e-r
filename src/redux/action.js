// action.js

// add a new device to the store
export const addDevice = (value) => ({
  type: "ADD_DEVICE",
  payload: value,
});

export const updateConnectionType = (deviceId, newConnectionType) => {
  return {
    type: "UPDATE_CONNECTION_TYPE",
    payload: { deviceId, newConnectionType },
  };
};

export const updateIPAddress = (deviceIdForIPAddress, newIPAddress) => {
  return {
    type: "UPDATE_IP_ADDRESS",
    payload: { deviceIdForIPAddress, newIPAddress },
  };
};

export const updatePort = (deviceIdForPort, newPort) => {
  return {
    type: "UPDATE_PORT",
    payload: { deviceIdForPort, newPort },
  };
};

export const updateSerial = (deviceIdForSerial, newSerial) => {
  return {
    type: "UPDATE_SERIAL",
    payload: { deviceIdForSerial, newSerial },
  };
};

export const updateDeviceName = (deviceIdForName, newName) => {
  return {
    type: "UPDATE_NAME",
    payload: { deviceIdForName, newName },
  };
};

export const removeDevice = (removeID) => ({
  type: "REMOVE_DEVICE",
  payload: removeID,
});

export const removeAllDevice = () => ({
  type: "REMOVE_ALL_DEVICES",
});

export const toggleTerminal = (terminalToggleId, newToggleState) => {
  return {
    type: "TOGGLE_TERMINAL",
    payload: { terminalToggleId, newToggleState },
  };
};

export const updateTerminal = (terminalID, newTerminalValue) => {
  return {
    type: "UPDATE_TERMINAL",
    payload: { terminalID, newTerminalValue },
  };
};

export const toggleLog = (LogToggleId, newLogToggleState) => {
  return {
    type: "TOGGLE_LOG",
    payload: { LogToggleId, newLogToggleState },
  };
};

export const updateLog = (LogId, newLogState) => {
  return {
    type: "UPDATE_LOG",
    payload: { LogId, newLogState },
  };
};

export const toggleUDL = (UDLId, newUDLState) => {
  return {
    type: "TOGGLE_UDL",
    payload: { UDLId, newUDLState },
  };
};

// export const updateUDL = (UDLUpdateID, newUDLValue) => {
//   return {
//     type: "UPDATE_UDL",
//     payload: { UDLUpdateID, newUDLValue },
//   };
// };

export const toggleGraph = (graphID, newGraphState) => {
  return {
    type: "TOGGLE_GRAPH",
    payload: { graphID, newGraphState },
  };
};

export const updateGraphRange = (graphRangeID, newGraphRange) => {
  return {
    type: "CHANGE_GRAPH_RANGE",
    payload: { graphRangeID, newGraphRange },
  };
};

export const updateGraph = (graphUpdateID, GraphData) => ({
  type: "UPDATE_GRAPH",
  payload: { graphUpdateID, GraphData },
});

export const setTextEditorValue = (value) => ({
  type: "SET_TEXT_EDITOR_VARIABLE",
  payload: value,
});

export const setTextEditorSend = (sendDeviceSelected) => ({
  type: "SET_TEXT_EDITOR_SEND",
  payload: sendDeviceSelected,
});

// settings

export const setConfig = (key, value) => ({
  type: "SET_CONFIG",
  payload: { key, value },
});
