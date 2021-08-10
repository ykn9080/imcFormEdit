"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _Head = require("./Head");

var _Body = require("./Body");

var _Footer = _interopRequireDefault(require("components/Layouts/Footer"));

var _SubMenu = require("./SubMenu");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const Edit = props => {
  let title = props.match.params.name;
  if (typeof props.match.params.child != "undefined") title = props.match.params.child;
  let tempMenu;
  const dispatch = (0, _reactRedux.useDispatch)();
  tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  let showSidebar = (0, _reactRedux.useSelector)(state => state.global.showSidebar);

  const selectedmenu = id => {
    dispatch((0, _actions.globalVariable)({
      selectedKey: id
    }));
    selectedKey = id;
  };

  const addControl = newArr => {
    dispatch((0, _actions.globalVariable)({
      control: newArr
    }));
  };

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_Head.HeadEdit, {
    selectedmenu: selectedmenu,
    title: title
  })), showSidebar ? /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 3
  }, /*#__PURE__*/_react.default.createElement(_SubMenu.SubMenu, {
    selectedmenu: selectedmenu,
    tempMenu: tempMenu
  })) : null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: true
  }, /*#__PURE__*/_react.default.createElement(_Body.Body, {
    addControl: addControl
  })))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};

var _default = Edit;
exports.default = _default;