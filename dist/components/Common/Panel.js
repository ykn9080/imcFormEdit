"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Panel;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _ExpansionPanel = _interopRequireDefault(require("@material-ui/core/ExpansionPanel"));

var _ExpansionPanelSummary = _interopRequireDefault(require("@material-ui/core/ExpansionPanelSummary"));

var _ExpansionPanelDetails = _interopRequireDefault(require("@material-ui/core/ExpansionPanelDetails"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function Panel(props) {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, props.array.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(_ExpansionPanel.default, null, /*#__PURE__*/_react.default.createElement(_ExpansionPanelSummary.default, {
      expandIcon: /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null),
      "aria-controls": "".concat(props.panelid, "controls") + i,
      id: "".concat(props.panelid) + i
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      className: classes.heading
    }, k.heading)), /*#__PURE__*/_react.default.createElement(_ExpansionPanelDetails.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, null, k.detail)));
  }));
}