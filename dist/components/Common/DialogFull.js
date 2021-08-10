"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DialogFull;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _AppBar = _interopRequireDefault(require("./AppBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Transition = /*#__PURE__*/_react.default.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Slide.default, _extends({
    direction: "up",
    ref: ref
  }, props));
});

function DialogFull(props) {
  let setting = {};
  if (props.fullScreen) setting = {
    fullScreen: true
  };
  if (props.maxWidth) setting = _objectSpread(_objectSpread({}, setting), {}, {
    maxWidth: props.maxWidth
  });
  const dispatch = (0, _reactRedux.useDispatch)(); //const [open, setOpen] = React.useState(false);

  let open = (0, _reactRedux.useSelector)(state => state.global.openDialog); //   useEffect(() => {
  //     setOpen(props.open);
  //   }, [props.open]);

  const handleClose = () => {
    open = false;
    dispatch((0, _actions.globalVariable)({
      openDialog: false
    }));
  };

  const right = /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    color: "inherit",
    onClick: handleClose,
    "aria-label": "close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Dialog.default, _extends({}, setting, {
    open: open,
    onClose: handleClose,
    TransitionComponent: Transition
  }), /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    title: props.title,
    right: right
  }), props.children));
}