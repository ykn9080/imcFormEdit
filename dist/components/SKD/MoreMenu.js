"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoreMenu;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _antd = require("antd");

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MoreMenu(props) {
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  let openDialog1 = (0, _reactRedux.useSelector)(state => state.global.openDialog1);

  let icon = /*#__PURE__*/_react.default.createElement(_MoreVert.default, null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  (0, _react.useEffect)(() => {
    if (!openDialog1) setAnchorEl(null);
  }, [openDialog1]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (props.icon) icon = props.icon;
  return /*#__PURE__*/_react.default.createElement("div", null, props.button ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
    icon: icon,
    onClick: handleClick
  }) : /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "settings",
    onClick: handleClick
  }, icon), /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "simple-menu",
    anchorEl: anchorEl // keepMounted
    ,
    open: Boolean(anchorEl) //open={open}
    ,
    onClose: handleClose
  }, props.menu.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: "moremenu".concat(i),
      onClick: () => {
        k.onClick();
        setAnchorEl(null);
      }
    }, k.title);
  })));
}