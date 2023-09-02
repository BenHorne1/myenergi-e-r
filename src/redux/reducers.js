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

    default:
      return state;
  }
};

export default rootReducer;
