//@flow
//components
import React, { Component } from "react";
import { Text } from "react-native";

//redux
import { Provider, connect } from "react-redux";
import { loadCustomers } from "./actions/creators";
import Store from "./Store";

//containers
import RootNavigator from "./components/RootNavigator";

//load data on application start
Store.dispatch(loadCustomers());

type Props = {};
type State = {};

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <RootNavigator />
      </Provider>
    );
  }
}
