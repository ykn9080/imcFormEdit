"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FullWidthGrid;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function FullWidthGrid() {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 6,
    sm: 3
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: classes.paper
  }, "xs=6 sm=3"))));
}