"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

require("Opendir/open.css");

const _excluded = ["label", "items", "depthStep", "depth"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SidebarItem(_ref) {
  let {
    label,
    items,
    depthStep = 10,
    depth = 0
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ListItem.default, _extends({
    button: true,
    dense: true
  }, rest), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    style: {
      paddingLeft: depth * depthStep
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, label))), Array.isArray(items) ? /*#__PURE__*/_react.default.createElement(_List.default, {
    disablePadding: true,
    dense: true
  }, items.map(subItem => /*#__PURE__*/_react.default.createElement(SidebarItem, _extends({
    key: subItem.name,
    depth: depth + 1,
    depthStep: depthStep
  }, subItem)))) : null);
}

function Sidebar(_ref2) {
  let {
    items,
    depthStep,
    depth
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "sidebar"
  }, /*#__PURE__*/_react.default.createElement(_List.default, {
    disablePadding: true,
    dense: true
  }, items.map((sidebarItem, index) => /*#__PURE__*/_react.default.createElement(SidebarItem, _extends({
    key: "".concat(sidebarItem.name).concat(index),
    depthStep: depthStep,
    depth: depth
  }, sidebarItem)))));
}

var _default = Sidebar;
exports.default = _default;