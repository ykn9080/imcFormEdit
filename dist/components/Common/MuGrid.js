"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MuGrid;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function MuGrid(props) {
  const classes = useStyles();
  let xs,
      sm,
      wth = {
    xs: 12,
    sm: xs / 2
  };
  let cont = {
    spacing: 3,
    direction: "row",
    justify: "center",
    alignItems: "center"
  };
  if (props.xs) wth = _objectSpread(_objectSpread({}, wth), {}, {
    xs: props.xs
  });
  if (props.sm) wth = _objectSpread(_objectSpread({}, wth), {}, {
    sm: props.sm
  });
  if (props.spacing) cont = _objectSpread(_objectSpread({}, cont), {}, {
    spacing: props.spacing
  });
  if (props.direction) cont = _objectSpread(_objectSpread({}, cont), {}, {
    direction: props.direction
  });
  if (props.justify) cont = _objectSpread(_objectSpread({}, cont), {}, {
    justify: props.justify
  });
  if (props.alignItems) cont = _objectSpread(_objectSpread({}, cont), {}, {
    alignItems: props.alignItems
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, _extends({
    container: true
  }, cont), props.array.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, _extends({
      item: true
    }, wth), k);
  })));
}