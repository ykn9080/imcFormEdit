"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

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

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _axios = _interopRequireDefault(require("axios"));

var _index = require("config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    margin: theme.spacing(4, 0, 4)
  },
  form: {
    width: "100%",
    // Fix IE 11 issue.
    marginTop: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
  }
}));

const Summary = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const [values, setValues] = (0, _react.useState)({});

  const handleChange = event => {
    event.persist();
    setValues(values => _objectSpread(_objectSpread({}, values), {}, {
      [event.target.name]: event.target.value
    }));
  }; // const keyEnter = event => {
  //   if (event.key === "Enter") {
  //     handleSubmit(event);
  //   }
  // };


  const handleSubmit = async e => {
    e.preventDefault();
    console.log(values);

    _axios.default.post("".concat(_index.currentsetting.webserviceprefix, "login"), values).then(function (response) {}).catch(e => console.log(e.message));
  };

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("form", {
    className: classes.form,
    noValidate: true,
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "title",
    label: "Title",
    name: "title",
    autoComplete: "title",
    autoFocus: true,
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    variant: "outlined",
    margin: "normal",
    multiline: true,
    rows: "4",
    fullWidth: true,
    name: "desc",
    label: "Description",
    id: "desc",
    autoComplete: "description",
    onChange: handleChange
  }));
};

var _default = Summary;
exports.default = _default;