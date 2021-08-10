"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MuTabs;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

const _excluded = ["children", "value", "index"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
    id: "vertical-tabpanel-".concat(index),
    "aria-labelledby": "vertical-tab-".concat(index)
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
    id: "vertical-tab-".concat(index),
    "aria-controls": "vertical-tabpanel-".concat(index)
  };
}

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224
  },
  tabs: {
    borderRight: "1px solid ".concat(theme.palette.divider),
    height: 300
  },
  tabpanels: {
    width: "100%"
  }
}));

function MuTabs(props) {
  const classes = useStyles();

  const [value, setValue] = _react.default.useState(0); //let tf1 = useSelector((state) => state.global.tf1); //create new


  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    console.log(event, newValue);
  }; //   var tabArray = ["tab1", "tab2"];
  //   var tabpanelArray = [
  //     <CardGroup />,
  //     <CardGroup gridStyle={{ width: "200px" }} />,
  //   ];


  console.log(props.tabPanelArray);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    orientation: "vertical",
    variant: "scrollable",
    value: value,
    onChange: handleChange,
    "aria-label": "Vertical tabs example",
    className: classes.tabs
  }, props.tabArray.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
      label: k
    }, a11yProps(i)));
  })), props.tabPanelArray.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(TabPanel, {
      className: classes.tabpanels,
      value: value,
      index: i
    }, k);
  }));
}