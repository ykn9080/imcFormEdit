"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _AddBox = _interopRequireDefault(require("@material-ui/icons/AddBox"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _bson = require("bson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//_id maker for MongoDB
const useStyles = (0, _styles.makeStyles)(theme => ({
  border: {
    borderRight: "1px solid #EFEFEF"
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));

const SubMenuHead = props => {
  const classes = useStyles();
  const dispatch = (0, _reactRedux.useDispatch)();
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);

  const handleAddSubMenu = () => {
    const id = new _bson.ObjectID();

    const length = _lodash.default.filter(tempMenu, function (o) {
      return o.pid === selectedKey;
    }).length;

    let newmenu = {
      _id: id,
      id: "imsi" + Math.random().toString(),
      comp: "1",
      creator: "ykn",
      desc: "",
      pid: selectedKey,
      private: false,
      seq: length,
      title: "New submenu",
      layout: [],
      access: []
    };
    tempMenu.push(newmenu);
    dispatch((0, _actions.globalVariable)({
      tempMenu: tempMenu
    }));
    props.callBack(true);
  };

  const handleCollapse = () => {
    dispatch((0, _actions.globalVariable)({
      showSidebar: false
    }));
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    display: "flex",
    p: 1,
    className: classes.border
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 1,
    flexGrow: 1
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, "Sub Menu")), /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 0
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Add new SubMenu"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "add new SubMenu",
    onClick: handleAddSubMenu
  }, /*#__PURE__*/_react.default.createElement(_AddBox.default, null)))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 0
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Hide Sidebar"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "Hide Sidebar",
    onClick: handleCollapse
  }, /*#__PURE__*/_react.default.createElement(_KeyboardArrowLeft.default, null))))), /*#__PURE__*/_react.default.createElement(_Divider.default, null));
};

var _default = SubMenuHead;
exports.default = _default;