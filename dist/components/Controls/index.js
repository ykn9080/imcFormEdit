"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _styles = require("@material-ui/core/styles");

var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _ControlList = _interopRequireDefault(require("./ControlList"));

var _ControlCard = _interopRequireDefault(require("./ControlCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    color: "white",
    flex: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (0, _styles.fade)(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: (0, _styles.fade)(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const Controls = _ref => {
  let {
    id,
    type,
    status,
    status1
  } = _ref;
  const classes = useStyles();
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)();
  const [ctype, setCtype] = (0, _react.useState)(true); //status: for open/close, status1: just for reload purpose

  (0, _react.useEffect)(() => {
    switch (type) {
      case "table":
        break;

      case "chart":
        break;

      default:
        break;
    }
  }, [status, status1]);

  const handleClose = () => {
    dispatch((0, _actions.globalVariable)({
      selectedKey: "m2"
    }));
    history.push("/Edit");
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    className: classes.appBar
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    color: "inherit",
    onClick: handleClose,
    "aria-label": "close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    className: classes.title
  }, "Control Type"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    component: "div"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "MuiTypography-body1",
    style: {
      fontSize: "1.1rem",
      marginRight: 8
    }
  }, "List"), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Switch.default, {
      checked: ctype,
      onChange: () => setCtype(!ctype)
    }),
    label: "Card"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.search
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.searchIcon
  }, /*#__PURE__*/_react.default.createElement(_Search.default, null)), /*#__PURE__*/_react.default.createElement(_InputBase.default, {
    placeholder: "Search\u2026",
    classes: {
      root: classes.inputRoot,
      input: classes.inputInput
    },
    inputProps: {
      "aria-label": "search"
    }
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    autoFocus: true,
    color: "inherit",
    onClick: handleClose
  }, "save"))), ctype ? /*#__PURE__*/_react.default.createElement(_ControlCard.default, null) : /*#__PURE__*/_react.default.createElement(_ControlList.default, null));
};

var _default = Controls;
exports.default = _default;