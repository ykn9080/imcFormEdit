"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Helpicon = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _IconButton2 = _interopRequireDefault(require("components/Common/IconButton1"));

var _Help = _interopRequireDefault(require("Admin/Help"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Transition = /*#__PURE__*/_react.default.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Slide.default, _extends({
    direction: "up",
    ref: ref
  }, props));
});

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#cccccc",
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  children: {
    flexGrow: 9
  },
  appBar: {
    position: "relative"
  }
}));

const Helpicon = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return /*#__PURE__*/_react.default.createElement(_IconButton2.default, {
    icon: /*#__PURE__*/_react.default.createElement(_fa.FaQuestionCircle, {
      style: {
        fontSize: 22,
        marginTop: 0
      },
      onClick: () => dispatch((0, _actions.globalVariable)({
        openHelp: true
      }))
    }),
    tooltip: "Help",
    color: "inherit"
  });
};

exports.Helpicon = Helpicon;

const Helpdialog = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const classes = useStyles();
  let open = (0, _reactRedux.useSelector)(state => state.global.openHelp); //const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch((0, _actions.globalVariable)({
      openHelp: false
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    fullScreen: true,
    open: open,
    onClose: handleClose,
    TransitionComponent: Transition
  }, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "static",
    style: {
      backgroundColor: "#161313"
    }
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    variant: "dense"
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    color: "inherit",
    className: classes.title
  }, "Help"), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    color: "inherit",
    onClick: handleClose,
    "aria-label": "close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)))), /*#__PURE__*/_react.default.createElement(_Help.default, null));
};

var _default = Helpdialog;
exports.default = _default;