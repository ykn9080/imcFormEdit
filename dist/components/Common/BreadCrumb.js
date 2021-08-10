"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

require("antd/dist/antd.css");

var _antd2 = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AntBreadCrumb = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const pathSnippets = location.pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = "/".concat(pathSnippets.slice(0, index + 1).join("/"));
    return /*#__PURE__*/_react.default.createElement(_antd2.Breadcrumb.Item, {
      key: url
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: url
    }, _));
  });
  const breadcrumbItems = [/*#__PURE__*/_react.default.createElement(_antd2.Breadcrumb.Item, {
    key: "home"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Home"))].concat(extraBreadcrumbItems);
  return /*#__PURE__*/_react.default.createElement(_antd2.Breadcrumb, null, breadcrumbItems);
};

var _default = AntBreadCrumb;
exports.default = _default;