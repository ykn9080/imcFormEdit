"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const RadioAnt = props => {
  const [value, setValue] = (0, _react.useState)(-1);

  const onChange = e => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    if (props.onChange) props.onChange(e.target.value);
  };

  let radioStyle = {}; //vertical position
  //   radioStyle = {
  //     display: "block",
  //     height: "30px",
  //     lineHeight: "30px",
  //   };
  //type="button" buttonStyle="solid" -> box style

  let groupStyle = {};
  if (props.buttonStyle) groupStyle = _objectSpread(_objectSpread({}, groupStyle), {}, {
    buttonStyle: props.buttonStyle
  });
  if (props.radioStyle) radioStyle = _objectSpread(_objectSpread({}, radioStyle), props.radioStyle);

  const Rad = _ref => {
    let {
      k
    } = _ref;
    if (props.type === "button") return /*#__PURE__*/_react.default.createElement(_antd.Radio.Button, {
      value: k.value
    }, k.label ? k.label : k.value);else {
      return /*#__PURE__*/_react.default.createElement(_antd.Radio, {
        style: radioStyle,
        value: k.value
      }, k.label ? k.label : k.value, value === -2 ? /*#__PURE__*/_react.default.createElement(_antd.Input, {
        style: {
          width: 100,
          marginLeft: 10
        }
      }) : null);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, _extends({
    onChange: onChange,
    value: value
  }, groupStyle), props.radioArray.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(Rad, {
      k: k
    });
  }));
};

var _default = RadioAnt;
exports.default = _default;