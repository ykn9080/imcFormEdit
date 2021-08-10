"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("react-sortable-tree/style.css");

require("antd/dist/antd.css");

var _TreeAnt = _interopRequireDefault(require("components/Common/TreeAnt"));

require("./SKD.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Sidebar = props => {
  //selectedKey
  const [key, setKey] = (0, _react.useState)("");
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  if (selectedKey !== key) setKey(selectedKey);
  let setting = {};
  if (props.defaultExpandAll) setting = {
    defaultExpandAll: props.defaultExpandAll
  }; //let treeData = getNodeData(tempMenu, selectedKey, "_id", "pid", "", "title");

  const onSelect = selectedObj => {
    if (props.onSelect) props.onSelect(selectedObj);
  };

  let contextItems = [{
    label: "Item 2"
  }, {
    label: "Menu item 3"
  }, {
    label: "Apple1"
  }, {
    label: "This is orange1"
  }, {
    label: "Conetxt menu is fun1"
  }, {
    label: "Cool1"
  }];

  const contextCallback = (index, node) => {
    console.log(index, node);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeAnt.default, _extends({
    onSelect: onSelect,
    contextItems: contextItems,
    contextCallback: contextCallback
  }, setting, {
    id: "_id"
  })));
};

var _default = Sidebar;
exports.default = _default;