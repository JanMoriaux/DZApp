//navigation
import { StackNavigator, SwitchNavigator } from "react-navigation";

//containers
import LoadingScreen from "./LoadingScreen";
import LoginScreen from "./LoginScreen";
import EventScreen from "./EventScreen";
import OrderScreen from "./OrderScreen";
import OverviewScreen from "./OverviewScreen";
//import TopupScreen from "./TopupScreen";
import TopupAmountScreen from "./TopupAmountScreen";
import TopupCustomerScreen from "./TopupCustomerScreen";
import TopupSuccessScreen from "./TopUpSuccessScreen";
import TopupConfirmScreen from "./TopupConfirmScreen";

const TopupNavigator = StackNavigator(
  {
    TopupAmountScreen: {
      screen: TopupAmountScreen
    },
    TopupCustomerScreen: {
      screen: TopupCustomerScreen
    },
    TopupConfirmScreen: {
      screen: TopupConfirmScreen
    },
    TopupSuccessScreen: {
      screen: TopupSuccessScreen
    }
  },
  {
    initialRouteName: "TopupAmountScreen",
    headerMode: "none"
  }
);

const AuthNavigator = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen
    }
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
);

const MainFlowNavigator = SwitchNavigator(
  {
    OrderScreen: {
      screen: OrderScreen
    },
    OverviewScreen: {
      screen: OverviewScreen
    },
    TopupNavigator: {
      screen: TopupNavigator
    }
  },
  {
    initialRouteName: "TopupNavigator",
    headerMode: "none"
  }
);

const Navigator = SwitchNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen
    },
    AuthNavigator: {
      screen: AuthNavigator
    },
    EventScreen: {
      screen: EventScreen
    },
    MainFlowNavigator: {
      screen: MainFlowNavigator
    }
  },
  {
    initialRouteName: "MainFlowNavigator"
  }
);

export default Navigator;
