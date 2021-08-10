"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function confirm(e) {
  console.log(e);

  _antd.message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);

  _antd.message.error("Click on No");
}

const PopConfirm = props => {
  return /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
    title: "Are you sure delete?",
    onConfirm: props.confirm,
    onCancel: cancel,
    okText: "Yes",
    cancelText: "No"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "Delete"));
};

var _default = PopConfirm;
exports.default = _default;