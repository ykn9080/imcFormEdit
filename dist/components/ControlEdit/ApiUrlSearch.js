"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchInput;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _Directions = _interopRequireDefault(require("@material-ui/icons/Directions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

function SearchInput() {
  const classes = useStyles();
  const dispatch = (0, _reactRedux.useDispatch)();
  const [value, setValue] = (0, _react.useState)("");

  const onSubmit = e => {
    e.preventDefault();
    dispatch((0, _actions.globalVariable)({
      apiUrl: value
    }));
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return /*#__PURE__*/_react.default.createElement(_Paper.default, {
    component: "form",
    className: classes.root,
    onSubmit: onSubmit
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    className: classes.iconButton,
    "aria-label": "menu"
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, null)), /*#__PURE__*/_react.default.createElement(_InputBase.default, {
    className: classes.input,
    placeholder: "Search Google Maps",
    inputProps: {
      "aria-label": "search google maps"
    },
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    type: "submit",
    className: classes.iconButton,
    "aria-label": "search"
  }, /*#__PURE__*/_react.default.createElement(_Search.default, null)), /*#__PURE__*/_react.default.createElement(_Divider.default, {
    className: classes.divider,
    orientation: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    color: "primary",
    className: classes.iconButton,
    "aria-label": "directions"
  }, /*#__PURE__*/_react.default.createElement(_Directions.default, null)));
}