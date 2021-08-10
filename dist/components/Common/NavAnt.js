"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  TabPane
} = _antd.Tabs;

const NavAnt = props => {
  let tab = [{
    title: "1st",
    content: "1st contetnt"
  }, {
    title: "2nd",
    content: "2nd contetnt"
  }];
  if (props.tab) tab = props.tab;

  function callback(key) {
    console.log(key);
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    tabPosition: "top",
    onChange: callback
  }, tab.map((k, i) => {
    return /*#__PURE__*/_react.default.createElement(TabPane, {
      tab: k.title,
      key: i
    }, k.content);
  }));
};

var _default = NavAnt;
exports.default = _default;