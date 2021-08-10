"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconLabelTabs;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _styles = require("@material-ui/core/styles");

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Phone = _interopRequireDefault(require("@material-ui/icons/Phone"));

var _Favorite = _interopRequireDefault(require("@material-ui/icons/Favorite"));

var _PersonPin = _interopRequireDefault(require("@material-ui/icons/PersonPin"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _DataSrc = _interopRequireDefault(require("./DataSrc"));

const _excluded = ["children", "value", "index"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _styles.makeStyles)({
  root: {
    flexGrow: 1,
    maxWidth: 500
  }
});

function TabPanel(props) {
  const {
    children,
    value,
    index
  } = props,
        other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement(_Typography.default, _extends({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 3
  }, children));
}

TabPanel.propTypes = {
  children: _propTypes.default.node,
  index: _propTypes.default.any.isRequired,
  value: _propTypes.default.any.isRequired
};

function a11yProps(index) {
  return {
    id: "simple-tab-".concat(index),
    "aria-controls": "simple-tabpanel-".concat(index)
  };
}

function IconLabelTabs() {
  const classes = useStyles();

  const [value, setValue] = _react.default.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    square: true,
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    value: value,
    onChange: handleChange,
    variant: "fullWidth",
    indicatorColor: "secondary",
    textColor: "secondary",
    "aria-label": "icon label tabs example"
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    icon: /*#__PURE__*/_react.default.createElement(_Phone.default, null),
    label: "RECENTS"
  }, a11yProps(0))), /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    icon: /*#__PURE__*/_react.default.createElement(_Favorite.default, null),
    label: "FAVORITES"
  }, a11yProps(1))), /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    icon: /*#__PURE__*/_react.default.createElement(_PersonPin.default, null),
    label: "NEARBY"
  }, a11yProps(2))))), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/_react.default.createElement(_DataSrc.default, null)), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 1
  }), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 2
  }, "Item Three"));
}