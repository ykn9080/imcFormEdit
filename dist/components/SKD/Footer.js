"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Foot;

var _react = _interopRequireDefault(require("react"));

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _Container = _interopRequireDefault(require("@material-ui/core/Container"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Copyright() {
  return /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary"
  }, "Copyright © ", /*#__PURE__*/_react.default.createElement(_Link.default, {
    color: "inherit",
    href: "https://material-ui.com/"
  }, "Your Website"), " ", new Date().getFullYear(), ".");
}

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "50vh",
    marginTop: theme.spacing(4)
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    // padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800]
  }
}));

function Foot() {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement("footer", {
    className: classes.footer
  }, /*#__PURE__*/_react.default.createElement(_Container.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1"
  }, "Cyram NetMiner365."), /*#__PURE__*/_react.default.createElement(Copyright, null))));
}