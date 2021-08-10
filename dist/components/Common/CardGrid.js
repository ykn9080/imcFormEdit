"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardGroup = void 0;

var _react = _interopRequireDefault(require("react"));

require("antd/dist/antd.css");

var _antd2 = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let gridStyle = {
  width: "50%",
  textAlign: "center"
};

const CardGrid = props => {
  if (props.gridStyle) gridStyle = props.gridStyle;
  return /*#__PURE__*/_react.default.createElement(_antd2.Card, {
    title: props.title
  }, props.cardArray.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_antd2.Card.Grid, {
      style: gridStyle
    }, k);
  }));
};

const CardGroup = props => {
  if (props.gridStyle) gridStyle = _objectSpread(_objectSpread({}, gridStyle), props.gridStyle);
  return /*#__PURE__*/_react.default.createElement(_antd2.Space, {
    size: 8
  }, /*#__PURE__*/_react.default.createElement(_antd2.Card, {
    title: "Card",
    style: gridStyle
  }, /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content")), /*#__PURE__*/_react.default.createElement(_antd2.Card, {
    title: "Card",
    style: gridStyle
  }, /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content")), /*#__PURE__*/_react.default.createElement(_antd2.Card, {
    title: "Card",
    style: gridStyle
  }, /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content")), /*#__PURE__*/_react.default.createElement(_antd2.Card, {
    title: "Card",
    style: gridStyle
  }, /*#__PURE__*/_react.default.createElement("p", null, "Card content"), /*#__PURE__*/_react.default.createElement("p", null, "Card content")));
};

exports.CardGroup = CardGroup;
var _default = CardGrid;
exports.default = _default;