"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SnackBar = props => {
  //for snackbar open/close
  const [open, setOpen] = _react.default.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    open: open,
    autoHideDuration: 10000,
    onClose: handleClose,
    message: "Click save button to finish!!!",
    action: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      size: "small",
      "aria-label": "close",
      color: "inherit",
      onClick: handleClose
    }, /*#__PURE__*/_react.default.createElement(_Close.default, {
      fontSize: "small"
    })))
  });
};

var _default = SnackBar;
exports.default = _default;