"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoreMenu;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import MoreVertIcon from '@material-ui/icons/MoreVert';
const options = ['Ascending', 'Descending'];
const ITEM_HEIGHT = 48;

function MoreMenu(props) {
  const [anchorEl, setAnchorEl] = _react.default.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icons.MoreOutlined, {
    onClick: handleClick
  }), /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "simple-menu",
    anchorEl: anchorEl // keepMounted
    ,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, props.menu.map((k, i) => /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    key: "moremenu".concat(i),
    onClick: () => {
      k.onClick();
      setAnchorEl(null);
    }
  }, k.title))));
}