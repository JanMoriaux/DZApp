//cashier auth actions
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

//event actions
export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const SET_EVENT = "SET_EVENT";
export const FETCH_EVENTS_FAILED = "FETCH_EVENTS_FAILED";

//customer actions
export const REQUEST_CUSTOMERS = "REQUEST_CUSTOMERS";
export const RECEIVE_CUSTOMERS = "RECEIVE_CUSTOMERS";
export const SET_CUSTOMER = "SET_CUSTOMER";
export const FETCH_CUSTOMERS_FAILED = "FETCH_CUSTOMERS_FAILED";

//product actions
export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const FETCH_PRODUCTS_FAILED = "FETCH_PRODUCTS_FAILED";

//order actions
export const SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY";

//topup actions
export const LOCAL_TOPUP = "LOCAL_TOPUP";
export const TOPUP_SYNC_STARTED = "TOPUP_SYNC_STARTED";
export const TOPUP_SYNC_COMPLETE = "TOPUP_SYNC_COMPLETE";
export const TOPUP_SYNC_FAILED = "TOPUP_SYNC_FAILED";

//message actions
export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_ERROR = "SEND_ERROR";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const REMOVE_ERROR = "REMOVE_ERROR";
