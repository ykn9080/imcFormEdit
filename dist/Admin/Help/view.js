"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ViewTail = void 0;

var _react = _interopRequireWildcard(require("react"));

require("antd/dist/antd.css");

var _antd2 = require("antd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  Text,
  Title
} = _antd2.Typography;

const ViewHead = props => {
  console.log(props.initialValues);
  let init;
  if (props !== null && props !== void 0 && props.initialValues) init = props.initialValues;
  return init ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Title, null, init.title), /*#__PURE__*/_react.default.createElement(Text, null, init.desc)) : null;
};

const ViewTail = props => {
  var _props$initialValues;

  console.log(props.initialValues);
  let tags = [];
  if (props !== null && props !== void 0 && (_props$initialValues = props.initialValues) !== null && _props$initialValues !== void 0 && _props$initialValues.tag) tags = props.initialValues.tag;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h2", null, "ViewTail"), tags.map(tag => {
    return /*#__PURE__*/_react.default.createElement(_antd2.Tag, {
      color: "purple"
    }, tag);
  }));
};

exports.ViewTail = ViewTail;
var _default = ViewHead;
exports.default = _default;