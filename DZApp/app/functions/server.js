import { Store } from "../store/store";

export const getURL = () => {
  let scheme = Store.getState().SettingsReducer.serverConfig.scheme;
  let address = Store.getState().SettingsReducer.serverConfig.address;
  let port = Store.getState().SettingsReducer.serverConfig.port;

  let connectionString = `${scheme}://${address}:${port}`;
  // console.log(connectionString);
  return connectionString;
};

export const getToken = () => {
  return Store.getState().SettingsReducer.token;
};

export const isLoggedIn = () => {
  return (
    Store.getState().CashierReducer.cashierId !== null && getToken() !== null
  );
};
