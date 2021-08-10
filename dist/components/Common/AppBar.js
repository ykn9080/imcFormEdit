"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DenseAppBar;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var _IconArray = _interopRequireDefault(require("components/SKD/IconArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function DenseAppBar(props) {
  //props={left:}
  const classes = useStyles();
  const history = (0, _reactRouterDom.useHistory)();
  let left = props.left;
  let children = props.children;
  let right = props.right;
  if (typeof left === "undefined") left = /*#__PURE__*/_react.default.createElement(_Home.default, {
    onClick: () => history.push("/")
  });else if (left === "showhide") left = /*#__PURE__*/_react.default.createElement(_IconArray.default, null);
  if (typeof children === "undefined") children = "";

  if (typeof right === "undefined") {
    if (props.left === "showhide") right = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Home.default, {
      onClick: () => history.push("/")
    }));else right = "";
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "static",
    style: {
      backgroundColor: "#161313"
    }
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    variant: "dense"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    "aria-label": "menu"
  }, left), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    color: "inherit",
    className: classes.title
  }, props.title), /*#__PURE__*/_react.default.createElement("span", {
    className: classes.children
  }, children), right)));
}