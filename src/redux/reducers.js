const initialState = {
  deviceList: [],
};

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

    default:
      return state;
  }
};

export default rootReducer;
