"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubMenu = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("actions");

require("react-sortable-tree/style.css");

require("antd/dist/antd.css");

var _SubMenuHead = _interopRequireDefault(require("./SubMenuHead"));

var _TreeAnt = _interopRequireDefault(require("components/Common/TreeAnt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * @Author: yknam
 * @Date: 2020-2-29 14:34
 * @Last Modified by: yknam
 * @Last Modified time: 2020-2-29 14:34
 * @Desc: Side Menu Bar Open when click top tab
 * Work on contextmenu 2-29
 */
// This only needs to be imported once in your app
const SubMenu = props => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)(); //selectedKey

  const [key, setKey] = (0, _react.useState)("");
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey); //const login = useSelector((state) => state.global.login);

  let showSidebar = (0, _reactRedux.useSelector)(state => state.global.showSidebar);
  if (selectedKey !== key) setKey(selectedKey); //let treeData = getNodeData(tempMenu, selectedKey, "_id", "pid", "", "title");

  const [reload, setReload] = (0, _react.useState)(false); //for reload from child

  const onSelect = selectedObj => {
    if (selectedObj) history.push(selectedObj.path);
    dispatch((0, _actions.globalVariable)({
      control: selectedObj.layout
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: selectedObj._id
    }));
    dispatch((0, _actions.globalVariable)({
      currentData: selectedObj
    }));
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

  return /*#__PURE__*/_react.default.createElement("div", null, showSidebar ? /*#__PURE__*/_react.default.createElement(_SubMenuHead.default, {
    callBack: setReload
  }) : null, showSidebar ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeAnt.default, {
    onSelect: onSelect,
    contextItems: contextItems,
    contextCallback: contextCallback,
    id: "_id"
  })) : null);
};

exports.SubMenu = SubMenu;