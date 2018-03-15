//@flow
import * as ActionConstants from "../actions/constants";

const initialState = {
  isFetching: false,
  customers: [],
  customerId: null
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case ActionConstants.REQUEST_CUSTOMERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ActionConstants.RECEIVE_CUSTOMERS:
      return Object.assign({}, state, {
        isFetching: false,
        customers: action.data
      });
    case ActionConstants.SET_CUSTOMER:
      return Object.assign({}, state, {
        customerId: action.data
      });

    default:
      return state;
  }
};

export default reducer;
