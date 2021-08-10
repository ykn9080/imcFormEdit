"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizedDialogs = CustomizedDialogs;
exports.default = exports.AppBarWrap = exports.ConditionalWrap = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

const _excluded = ["children", "classes", "onClose"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useStyles = (0, _styles.makeStyles)(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = /*#__PURE__*/_react.default.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Slide.default, _extends({
    direction: "up",
    ref: ref
  }, props));
});

const ConditionalWrap = _ref => {
  let {
    wrap,
    children,
    index
  } = _ref;
  let open = (0, _reactRedux.useSelector)(state => state.global.fullscreen);
  open = open.index;
  return open ? wrap(children) : children;
};

exports.ConditionalWrap = ConditionalWrap;

const DialogWrap = _ref2 => {
  let {
    children,
    index
  } = _ref2;
  const dispatch = (0, _reactRedux.useDispatch)();
  let fullscreen = (0, _reactRedux.useSelector)(state => state.global.fullscreen);
  let open = fullscreen.index;
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    open: open,
    onClose: () => {
      dispatch((0, _actions.globalVariable)({
        fullscreen: {
          index: !fullscreen
        }
      }));
    },
    TransitionComponent: Transition
  }, children);
};

const AppBarWrap = _ref3 => {
  let {
    children
  } = _ref3;
  const dispatch = (0, _reactRedux.useDispatch)();
  const classes = useStyles();
  let open = (0, _reactRedux.useSelector)(state => state.global.fullscreen);
  const [fulldialog, setFulldialog] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    fullScreen: fulldialog,
    open: open,
    onClose: () => dispatch((0, _actions.globalVariable)({
      fullscreen: false
    })),
    TransitionComponent: Transition
  }, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    className: classes.appBar
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    variant: "dense"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    color: "inherit",
    onClick: () => dispatch((0, _actions.globalVariable)({
      fullscreen: false
    })),
    "aria-label": "close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    color: "inherit",
    className: classes.title
  }, "Sound"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    autoFocus: true,
    color: "inherit",
    onClick: () => dispatch((0, _actions.globalVariable)({
      fullscreen: false
    }))
  }, "save"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    autoFocus: true,
    color: "inherit",
    onClick: () => setFulldialog(!fulldialog)
  }, "fullscreen"))), children);
};

exports.AppBarWrap = AppBarWrap;

function CustomizedDialogs(_ref4) {
  let {
    children
  } = _ref4;
  const dispatch = (0, _reactRedux.useDispatch)();
  let open = (0, _reactRedux.useSelector)(state => state.global.fullscreen);

  const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

  const DialogTitle = (0, _styles.withStyles)(styles)(props => {
    const {
      children,
      classes,
      onClose
    } = props,
          other = _objectWithoutProperties(props, _excluded);

    return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, _extends({
      disableTypography: true,
      className: classes.root
    }, other), /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6"
    }, children), onClose ? /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      "aria-label": "close",
      className: classes.closeButton,
      onClick: onClose
    }, /*#__PURE__*/_react.default.createElement(_Close.default, null)) : null);
  });
  const DialogContent = (0, _styles.withStyles)(theme => ({
    root: {
      padding: theme.spacing(2)
    }
  }))(_DialogContent.default);
  const DialogActions = (0, _styles.withStyles)(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1)
    }
  }))(_DialogActions.default);

  const handleClose = () => {
    dispatch((0, _actions.globalVariable)({
      fullscreen: false
    }));
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    "aria-labelledby": "customized-dialog-title",
    open: open,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }, "Modal title"), /*#__PURE__*/_react.default.createElement(DialogContent, {
    dividers: true
  }, children), /*#__PURE__*/_react.default.createElement(DialogActions, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    autoFocus: true,
    onClick: handleClose,
    color: "primary"
  }, "Close"))));
}

var _default = DialogWrap;
exports.default = _default;