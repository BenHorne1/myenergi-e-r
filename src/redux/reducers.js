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
    default:
      return state;
  }
};

export default rootReducer;