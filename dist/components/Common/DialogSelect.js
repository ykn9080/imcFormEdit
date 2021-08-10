"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DialogSelect;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _styles = require("@material-ui/core/styles");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Icon = _interopRequireWildcard(require("Admin/Help/Icon"));

const _excluded = ["children", "classes", "onClose"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  },
  helpButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(-0.3),
    color: theme.palette.grey[500]
  }
});

function DialogSelect(props) {
  const dispatch = (0, _reactRedux.useDispatch)();
  let open1 = (0, _reactRedux.useSelector)(state => state.global.openDialog1);

  const [open, setOpen] = _react.default.useState(false);

  (0, _react.useEffect)(() => {
    setOpen(open1);
  }, [open1]);
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      helpLink: "/admin/control/form/formedit?type=control"
    }));
  }, []);

  const handleClose = () => {
    setOpen(false);
    dispatch((0, _actions.globalVariable)({
      openDialog1: false
    }));
  };

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
    }, /*#__PURE__*/_react.default.createElement(_Close.default, null)) : null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      "aria-label": "help",
      className: classes.helpButton,
      onClick: () => {
        dispatch((0, _actions.globalVariable)({
          openHelp: true
        }));
      }
    }, /*#__PURE__*/_react.default.createElement(_Icon.Helpicon, null)));
  });
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    fullWidth: true,
    maxWidth: "xl",
    open: open,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(DialogTitle, {
    id: "customized-dialog-title",
    onClose: handleClose
  }, "Fill the form"), /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, props.children), /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, props.dialogAction, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: handleClose,
    color: "primary"
  }, "Cancel"))), /*#__PURE__*/_react.default.createElement(_Icon.default, null));
}