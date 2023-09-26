// reducers.js

import Data from "../config.json";

console.log("config", Data.config.SaveLocation);

const initialState = {
  config: {
    UDPPort: Data.config.UDPPort,
    SaveLocation: Data.config.SaveLocation,
  },
  textEditorValue: "Send JSON or other text files from here",
  textEditorDeviceSelected: { id: 0, name: "Select Device", serial: "" },
  deviceList: [],
};

window.indexBridge.send("CONFIG_STARTUP", {
  UDPPort: Data.config.UDPPort,
  SaveLocation: Data.config.SaveLocation,
})

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DEVICE":
      return {
        ...state,
        deviceList: action.payload,
      };

    case "UPDATE_CONNECTION_TYPE":
      const { deviceId, newConnectionType } = action.payload;
      const updatedDeviceList = state.deviceList.map((device) => {
        if (device.id === deviceId) {
          return { ...device, connectionType: newConnectionType };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedDeviceList,
      };

    case "UPDATE_IP_ADDRESS":
      const { deviceIdForIPAddress, newIPAddress } = action.payload;
      const updatedDeviceListIPAddress = state.deviceList.map((device) => {
        if (device.id === deviceIdForIPAddress) {
          return { ...device, IPAddress: newIPAddress };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedDeviceListIPAddress,
      };

    case "UPDATE_PORT":
      const { deviceIdForPort, newPort } = action.payload;
      const updatedDeviceListPort = state.deviceList.map((device) => {
        if (device.id === deviceIdForPort) {
          return { ...device, port: newPort };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedDeviceListPort,
      };

    case "UPDATE_SERIAL":
      const { deviceIdForSerial, newSerial } = action.payload;
      const updatedDeviceListSerial = state.deviceList.map((device) => {
        if (device.id === deviceIdForSerial) {
          return { ...device, serial: newSerial };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedDeviceListSerial,
      };

    case "UPDATE_NAME":
      const { deviceIdForName, newName } = action.payload;
      const updatedDeviceListName = state.deviceList.map((device) => {
        if (device.id === deviceIdForName) {
          return { ...device, name: newName };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedDeviceListName,
      };

    case "REMOVE_DEVICE":
      const removeID = action.payload;
      const updatedDevices = state.deviceList.filter(
        (device) => device.id !== removeID
      );

      // renumber the IDs of the subsequent items
      const renumberedDevices = updatedDevices.map((device, index) => ({
        ...device,
        id: index + 1,
      }));

      return {
        ...state,
        deviceList: renumberedDevices,
      };

    case "REMOVE_ALL_DEVICES":
      return {
        ...state,
        deviceList: [],
      };

    case "TOGGLE_TERMINAL":
      const { terminalToggleId, newToggleState } = action.payload;
      const updatedTerminalToggle = state.deviceList.map((device) => {
        if (device.id === terminalToggleId) {
          return { ...device, showTerminal: newToggleState };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedTerminalToggle,
      };

    case "UPDATE_TERMINAL":
      const { terminalID, newTerminalValue } = action.payload;
      const updatedTerminalValue = state.deviceList.map((device) => {
        if (device.id === terminalID) {
          return { ...device, terminal: newTerminalValue };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedTerminalValue,
      };

    case "TOGGLE_LOG":
      const { LogToggleId, newLogToggleState } = action.payload;
      const updatedLogToggle = state.deviceList.map((device) => {
        if (device.id === LogToggleId) {
          return { ...device, showLog: newLogToggleState };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedLogToggle,
      };

    case "UPDATE_LOG":
      const { LogId, newLogState } = action.payload;
      const updatedLog = state.deviceList.map((device) => {
        if (device.id === LogId) {
          return { ...device, log: newLogState };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedLog,
      };

    case "TOGGLE_UDL":
      const { UDLId, newUDLState } = action.payload;
      const updatedUDLToggle = state.deviceList.map((device) => {
        if (device.id === UDLId) {
          return { ...device, showUDL: newUDLState };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedUDLToggle,
      };

    case "UPDATE_UDL":
      const { UDLUpdateID, newUDLValue } = action.payload;
      const updatedUDL = state.deviceList.map((device) => { 
        if (device.id === UDLUpdateID) {
          return { ...device, UDL: newUDLValue};
        }
        return device
      })
      return {
        ...state,
        deviceList: updatedUDL
      }

    case "TOGGLE_GRAPH":
      const { graphID, newGraphState } = action.payload;
      const updatedGraphToggle = state.deviceList.map((device) => {
        if (device.id === graphID) {
          return { ...device, showGraph: newGraphState };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedGraphToggle,
      };

    case "CHANGE_GRAPH_RANGE":
      const { graphRangeID, newGraphRange } = action.payload;
      const updatedGraphRange = state.deviceList.map((device) => {
        if (device.id === graphRangeID) {
          return { ...device, graphRange: newGraphRange };
        }
        return device;
      });
      return {
        ...state,
        deviceList: updatedGraphRange,
      };

    case "UPDATE_GRAPH":
      const { graphUpdateID, GraphData } = action.payload;
      const updatedGraph = state.deviceList.map((device) => {
        if (device.id === graphUpdateID) {
          return {
            ...device,
            v1: [...device.v1, GraphData.v1],
            v2: [...device.v2, GraphData.v2],
            v3: [...device.v3, GraphData.v3],
            v4: [...device.v4, GraphData.v4],
          };
        }
        return device;
      });

      return {
        ...state,
        deviceList: updatedGraph,
      };

    case "SET_TEXT_EDITOR_VARIABLE":
      return {
        ...state,
        textEditorValue: action.payload,
      };

    case "SET_TEXT_EDITOR_SEND":
      return {
        ...state,
        textEditorDeviceSelected: action.payload,
      };

    // settings
    case "SET_CONFIG":
      return {
        ...state,
        config: {
          ...state.config,
          [action.payload.key]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
