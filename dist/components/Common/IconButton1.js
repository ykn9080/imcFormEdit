"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2)
    }
  }
}));

const IconButton1 = props => {
  const classes = useStyles();
  let setting = {
    color: "inherit"
  };
  if (props.color) setting = {
    color: props.color
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: props.tooltip
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, setting, props.icon)));
};

var _default = IconButton1;
exports.default = _default;