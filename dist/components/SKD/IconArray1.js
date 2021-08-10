"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _IconButton = _interopRequireDefault(require("components/Common/IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const IconArray1 = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)();
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);

  const handleReset = () => {
    dispatch((0, _actions.globalVariable)({
      control: []
    }));
    dispatch((0, _actions.globalVariable)({
      menuedit: false
    }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuEdit = () => {
    dispatch((0, _actions.globalVariable)({
      menuedit: true
    }));
    dispatch((0, _actions.globalVariable)({
      control: []
    }));
    handleClose();
  };

  const handleNavigate = e => {
    //e.preventDefault();
    history.push("/controls");
    handleClose();
  };

  const editMenu = /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "editMenu",
    anchorEl: anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleMenuEdit
  }, "Edit"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleReset
  }, "Reset"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleNavigate
  }, "Navigate"));

  const MakeBtn = _ref => {
    let {
      btnArr
    } = _ref;
    return btnArr.map((k, i) => {
      return /*#__PURE__*/_react.default.createElement(_IconButton.default, _extends({
        key: i
      }, k));
    });
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(MakeBtn, {
    btnArr: props.btnArr
  }), editMenu);
};

var _default = IconArray1;
exports.default = _default;