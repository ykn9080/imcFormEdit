"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.glovalVariableReducer = void 0;

var _redux = require("redux");

var _config = require("./config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const counterReducer = function counterReducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    default:
      return state;
  }
};

const loggedReducer = function loggedReducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SIGN_IN":
      return !state;

    default:
      return state;
  }
};

const glovalVariableReducer = function glovalVariableReducer() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.globalVar;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, state), {}, {
    [action.type]: action.payload
  });
};

exports.glovalVariableReducer = glovalVariableReducer;
const allReducers = (0, _redux.combineReducers)({
  counter: counterReducer,
  isLogged: loggedReducer,
  global: glovalVariableReducer
});
var _default = allReducers;
exports.default = _default;