"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DescRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DescRow = _ref => {
  let {
    data,
    title,
    format,
    colspan,
    extra
  } = _ref;
  if (!format) format = -1;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Descriptions, {
    column: {
      xxl: 4,
      xl: 3,
      lg: 3,
      md: 3,
      sm: 2,
      xs: 1
    },
    title: title,
    size: "small",
    extra: extra
  }, Object.keys(data).map((a, b) => {
    let txt = data[a];
    let colspan1 = 1;
    if (!a) return;
    const upperKey = a[0].toUpperCase() + a.slice(1);

    if (colspan && colspan[a]) {
      colspan1 = parseInt(colspan[a]);
    }

    return /*#__PURE__*/_react.default.createElement(_antd.Descriptions.Item, {
      label: upperKey,
      key: a + b,
      span: colspan1
    }, txt);
  })));
};

exports.DescRow = DescRow;
const titlestyle = {
  marginTop: 10,
  marginLeft: 20,
  marginBottom: 10
};

const Description = _ref2 => {
  let {
    data,
    title,
    format,
    colspan,
    extra
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "99%",
      padding: 5
    }
  }, data && /*#__PURE__*/_react.default.createElement(DescRow, {
    data: data,
    title: title,
    format: format,
    colspan: colspan,
    extra: extra
  })));
};

var _default = Description;
exports.default = _default;