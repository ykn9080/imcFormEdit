"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Container = _interopRequireDefault(require("@material-ui/core/Container"));

var _index = require("config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  footer: {
    textAlign: "center",
    // position: "absolute",
    bottom: 0,
    // width: "100% !important",
    height: "30px !important" // backgroundColor: "#3F51B5"

  }
}));

const Footer = () => {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_Container.default, {
    className: classes.footer
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "title"
  }, "Footer Text **current server:", /*#__PURE__*/_react.default.createElement("b", null, _index.currentsetting.webserviceprefix)));
};

var _default = Footer;
exports.default = _default;