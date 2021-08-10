"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Switches;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AntSwitch = (0, _styles.withStyles)(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex"
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none"
  },
  track: {
    border: "1px solid ".concat(theme.palette.grey[500]),
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(_Switch.default);

function Switches() {
  const [state, setState] = _react.default.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true
  });

  const handleChange = event => {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      [event.target.name]: event.target.checked
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_Typography.default, {
    component: "div"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    component: "label",
    container: true,
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, "Off"), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(AntSwitch, {
    checked: state.checkedC,
    onChange: handleChange,
    name: "checkedC"
  })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, "On")));
}