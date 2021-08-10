"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useForm = (callback, props) => {
  const [values, setValues] = (0, _react.useState)({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback(...Object.values(values));
  };

  const handleSubmitCallback = async event => {
    if (event) event.preventDefault();
    console.log(props, values);
    values.props = props;
    console.log(...Object.values(values));
    callback(...Object.values(values));
  };

  const handleChange = event => {
    event.persist();
    setValues(values => _objectSpread(_objectSpread({}, values), {}, {
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    handleSubmitCallback,
    values
  };
};

var _default = useForm;
exports.default = _default;