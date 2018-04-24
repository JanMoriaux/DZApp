//@flow
import React, { Component } from "react";
import { BackHandler } from "react-native";

//components
import { OrderConfirmModal } from "../components/OrderConfirmModal";
import { ListView } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Thumbnail,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  H2,
  H3,
  Card,
  CardItem,
  View,
  Subtitle
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";

//styles
import styles from "../styles/styles";

//resources
import * as strings from "../constants/strings";

//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { setOrderCustomer } from "../actions/orderActions";

//functions
import { calculateTotal } from "../functions/order";
import { getFullName, getCustomerById } from "../functions/customer";
import { showInfoToast, showErrorToast } from "../functions/toast";

//navigation
import { NavigationActions } from "react-navigation";

type Props = {};

type State = {};

class OrderConfirmScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this._toggleModalVisible = this._toggleModalVisible.bind(this);

    this._checkLoginState();
    this._checkEventState();
  }

  render() {
    let amountString = this.props.totalAmount
      ? this.props.totalAmount.toFixed(2) + " €"
      : "";
    let customerName = this.props.customer
      ? getFullName(this.props.customer)
      : "";

    return (
      <Container>
        {/* HEADER */}
        <Header style={styles.primaryBackground}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={styles.white} />
            </Button>
          </Left>
          <Body>
            <Title>{strings.ORDER}</Title>
            <Subtitle>{strings.CONFIRM}</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this._onCancelButtonPress()}>
              <Icon name="grid" />
            </Button>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        {/* HEADER END */}
        {/* CONTENT */}
        <Content padder contentContainerStyle={styles.scrollviewCenter}>
          <Card>
            {this._renderSummary()}
            <OrderConfirmModal
              ref="modal"
              onConfirmButtonPress={() => this._onModalConfirmButtonPress()}
              onCancelButtonPress={() => this._toggleModalVisible()}
              total={amountString}
              fullname={customerName}
            />
          </Card>
        </Content>
        {/* CONTENT END */}
      </Container>
    );
  }

  _renderSummary = () => {
    let amountString = this.props.totalAmount
      ? this.props.totalAmount.toFixed(2) + " €"
      : "";
    let eventName = this.props.event ? this.props.event.name : "";
    let cashierName = this.props.cashier ? getFullName(this.props.cashier) : "";
    let customerName = this.props.customer
      ? getFullName(this.props.customer)
      : "";
    let creditBalanceString = this.props.creditBalance
      ? this.props.creditBalance.toFixed(2) + " €"
      : "";
    let eventBalanceString;
    if (this.props.event.type === "event") {
      eventBalanceString = this.props.eventBalance
        ? this.props.eventBalance.toFixed(2) + " €"
        : "";
    }

    return (
      <View>
        <CardItem header>
          <Text>{strings.OVERVIEW}</Text>
        </CardItem>
        <CardItem>
          <Grid>
            <Row>
              <Text style={styles.label}>{strings.EVENT}</Text>
            </Row>
            <Row style={styles.valueRow}>
              <Text style={styles.value}>{eventName}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>{strings.CASHIER}</Text>
            </Row>
            <Row style={styles.valueRow}>
              <Text style={styles.value}>{cashierName}</Text>
            </Row>
          </Grid>
        </CardItem>
        <CardItem>
          <Grid>
            <Row>
              <Text style={styles.label}>{strings.CUSTOMER}</Text>
            </Row>
            <Row style={styles.valueRow}>
              <Text style={styles.value}>{customerName}</Text>
            </Row>
            <Row>
              <Text style={styles.label}>{strings.CURRENT_BALANCE}</Text>
            </Row>
            <Row style={styles.valueRow}>
              <Text style={styles.value}>{creditBalanceString}</Text>
            </Row>
            {this.props.event.type === "event" && (
              <View>
                <Row>
                  <Text style={styles.label}>{strings.EVENT_BALANCE}</Text>
                </Row>
                <Row style={styles.valueRow}>
                  <Text style={styles.value}>{eventBalanceString}</Text>
                </Row>
              </View>
            )}
            <Row>
              <Text style={styles.label}>{strings.TO_PAY}</Text>
            </Row>
            <Row style={styles.valueRow}>
              <Text style={styles.value}>{amountString}</Text>
            </Row>
          </Grid>
        </CardItem>
        <CardItem>
          <Body>
            <Button
              full
              style={styles.primaryActionButton}
              onPress={() => this._toggleModalVisible()}
            >
              <Text style={styles.primaryButtonText}>
                {strings.CONFIRM_ORDER}
              </Text>
            </Button>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Grid>
            <Col>
              <Button
                transparent
                full
                small
                onPress={() => {
                  this._onCancelButtonPress();
                }}
              >
                <Text style={styles.smallButtonText}>{strings.CANCEL}</Text>
              </Button>
            </Col>
            <Col />
          </Grid>
        </CardItem>
      </View>
    );
  };

  componentDidUpdate() {
    if (this.props.message !== null) {
      showInfoToast(this.props.message);
    }
    if (this.props.error !== null) {
      showErrorToast(this.props.error);
    }
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this._onBackButtonPressAndroid
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._onBackButtonPressAndroid
    );
  }

  _onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  _checkLoginState = () => {
    if (!this.props.cashier._id)
      this.props.navigation.navigate("AuthNavigator");
  };

  _checkEventState = () => {
    if (!this.props.event._id) this.props.navigation.navigate("EventScreen");
  };

  _toggleModalVisible = (): void => {
    let modal = this.refs.modal;
    modal.setState({
      isVisible: !modal.state.isVisible
    });
  };

  _onModalConfirmButtonPress = (value: number) => {
    // let modal = this.refs.modal;
    // let product = modal.state.product;
    // this.props.setProductQuantity(product._id, value);
    // this._toggleModalVisible();
  };

  _onCancelButtonPress = () => {
    this.props.setOrderCustomer(null);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "ProductScreen" })]
    });
    this.props.navigation.dispatch(resetAction);
  };
}

const mapStateToProps = state => {
  //amount to pay
  let orderlines = Object.keys(state.OrderReducer.orderlines).map(key => {
    return {
      productId: key,
      quantity: state.OrderReducer.orderlines[key]
    };
  });
  orderlines = orderlines.filter(o => o.quantity !== 0);
  let products = state.ProductReducer.products;
  let totalAmount = calculateTotal(orderlines, products);

  //event
  let event = state.EventReducer.events.find(
    e => e._id === state.EventReducer.eventId
  );

  //cashier
  let cashier = getCustomerById(
    state.CashierReducer.cashierId,
    state.CustomerReducer.customers
  );
  //customer
  let customer = state.OrderReducer.currentCustomer;
  //customer credit
  let creditBalance = customer ? customer.creditBalance : 0;
  let eventBalance = null;
  if (event.type === "event" && customer) {
    let subscription = state.SubscriptionReducer.subscriptions.find(
      s => s.customerId === customer._id && s.eventId === event._id
    );
    eventBalance = subscription.remainingCredit;
  }

  return {
    totalAmount: totalAmount,
    event: event,
    cashier: cashier,
    customer: customer,
    creditBalance: creditBalance,
    eventBalance: eventBalance,
    message: state.MessageReducer.message,
    error: state.MessageReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setOrderCustomer }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmScreen);
