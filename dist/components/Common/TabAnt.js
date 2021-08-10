"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  TabPane
} = _antd.Tabs;

const TabAnt = props => {
  let mode = "top"; //"left"

  if (props.mode) mode = props.mode;

  function callback(key) {
    console.log(key);
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    defaultActiveKey: "0",
    onChange: callback,
    tabPosition: mode,
    style: {
      height: 350
    }
  }, props.tabArray.map((k, i) => {
    let setting = {};
    if (k.disabled) setting = {
      disabled: true
    };
    return /*#__PURE__*/_react.default.createElement(TabPane, _extends({
      tab: "".concat(k.title),
      key: k.title + i
    }, setting), k.content);
  }));
};

var _default = TabAnt;
exports.default = _default;