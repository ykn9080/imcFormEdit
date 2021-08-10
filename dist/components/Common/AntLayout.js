"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("antd/dist/antd.css");

require("./Antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Step
} = _antd.Steps;
const {
  Header,
  Footer,
  Sider,
  Content
} = _antd.Layout;

const AntLayout = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Steps, {
    size: "small",
    current: 1
  }, /*#__PURE__*/_react.default.createElement(Step, {
    title: "Layout"
  }), /*#__PURE__*/_react.default.createElement(Step, {
    title: "Contents"
  }), /*#__PURE__*/_react.default.createElement(Step, {
    title: "Waiting"
  })), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Header, null, "Header"), /*#__PURE__*/_react.default.createElement(Content, null, "Content"), /*#__PURE__*/_react.default.createElement(Footer, null, "Footer")), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Header, null, "Header"), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Sider, null, "Sider"), /*#__PURE__*/_react.default.createElement(Content, null, "Content")), /*#__PURE__*/_react.default.createElement(Footer, null, "Footer")), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Header, null, "Header"), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Content, null, "Content"), /*#__PURE__*/_react.default.createElement(Sider, null, "Sider")), /*#__PURE__*/_react.default.createElement(Footer, null, "Footer")), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Sider, null, "Sider"), /*#__PURE__*/_react.default.createElement(_antd.Layout, null, /*#__PURE__*/_react.default.createElement(Header, null, "Header"), /*#__PURE__*/_react.default.createElement(Content, null, "Content"), /*#__PURE__*/_react.default.createElement(Footer, null, "Footer"))));
};

var _default = AntLayout;
exports.default = _default;