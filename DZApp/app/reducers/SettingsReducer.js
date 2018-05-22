//@flow
import * as types from "../actions/types";

const initialState = {
  historyCount: 5,
  serverConfig: {
    port: 8881,
    address: "10.0.2.2",
    scheme: "https"
  },
  token: null
};

const SettingsReducer = (state: {} = initialState, action: {}) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token
      });
    case types.SET_HISTORY_COUNT:
      return Object.assign({}, state, {
        historyCount: action.data
      });
    case types.SET_SERVER_CONFIG:
      let newServerConfig = Object.assign({}, state.serverConfig);
      newServerConfig.port = action.data.port;
      newServerConfig.address = action.data.address;
      newServerConfig.scheme = action.data.scheme;

      return Object.assign({}, state, {
        serverConfig: newServerConfig
      });
    default:
      return state;
  }
};

export default SettingsReducer;
