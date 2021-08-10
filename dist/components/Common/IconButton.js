"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _fgLoadcss = require("fg-loadcss");

var _Icon = _interopRequireDefault(require("@material-ui/core/Icon"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _antd = require("antd");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2)
    }
  }
}));

const IconBtn = props => {
  //props={tooltip""this is deete", children: < DeleteIcon />,  handleClick: ()=>console.log('hhh')
  //, color:primary,secondary,default,inherit,transparant, aria-label:"screen reader only label", aria-controls:"main" }
  //Example
  // <IconBtn tooltip="this is example" handleClick={() => history.push("/")} color="primary" >
  //   <HomeIcon />;
  // </IconBtn>
  const classes = useStyles();

  _react.default.useEffect(() => {
    const node = (0, _fgLoadcss.loadCSS)("https://use.fontawesome.com/releases/v5.12.0/css/all.css", document.querySelector("#font-awesome-css"));
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  let iconProps = {},
      handleClick;
  let aweProps = {};
  if (props.fontSize) aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
    fontSize: props.fontSize
  });
  if (props.style) aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
    style: props.style
  });
  if (props.onClick) aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
    onClick: props.onClick
  });
  if (props.style) aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
    style: props.style
  });
  if (props.id) aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
    id: props.id
  });

  if (props.handleClick) {
    handleClick = props.handleClick;
    iconProps = _objectSpread(_objectSpread({}, iconProps), {}, {
      handleClick
    });
  }

  if (props.color) iconProps = _objectSpread(_objectSpread({}, iconProps), {}, {
    color: props.color
  });

  if (props["aria-label"]) {
    iconProps = _objectSpread(_objectSpread({}, iconProps), {}, {
      "aria-label": props["aria-label"]
    });
    aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
      "aria-label": props["aria-label"]
    });
  }

  if (props["aria-controls"]) {
    iconProps = _objectSpread(_objectSpread({}, iconProps), {}, {
      "aria-controls": props["aria-controls"]
    });
    aweProps = _objectSpread(_objectSpread({}, aweProps), {}, {
      "aria-controls": props["aria-controls"]
    });
  }

  if (props.color) iconProps = _objectSpread(_objectSpread({}, iconProps), {}, {
    color: props.color
  });
  const fontawe = "fa fa-".concat(props.awesome);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: props.tooltip
  }, props.btntype === "ant" ? /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, iconProps, {
    icon: props.awesome ? /*#__PURE__*/_react.default.createElement(_Icon.default, _extends({
      className: fontawe
    }, aweProps)) : props.icon
  }), props.children) : /*#__PURE__*/_react.default.createElement(_IconButton.default, iconProps, props.children, props.awesome ? /*#__PURE__*/_react.default.createElement(_Icon.default, _extends({
    className: fontawe
  }, aweProps)) : props.icon)));
};

var _default = IconBtn;
exports.default = _default;