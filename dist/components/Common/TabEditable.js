"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

require("antd/dist/antd.css");

var _antd2 = require("antd");

var _Common_make = require("fromImc/Common_make");

var _Buttons = _interopRequireDefault(require("Collections/Buttons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TabPane
} = _antd2.Tabs;

const TabEditable = props => {
  //props:panes, newpane,extra,handleAction
  const [panes, setPanes] = (0, _react.useState)();
  const [activeKey, setActiveKey] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (props.panes) {
      setPanes(props.panes);

      if (props.panes.length > 0) {
        setActiveKey(props.panes[0].key); // props.onChange(props.panes[0].key);
      }
    }

    if (props.ActiveKey) setActiveKey(props.ActiveKey);
  }, [props.panes]);

  const onChange = activeKey => {
    setActiveKey(activeKey);
    props.onChange(activeKey);
  };

  const onEdit = (targetKey, action) => {
    //[action](targetKey);
    console.log(targetKey, action);

    switch (action) {
      case "remove":
        const opt = {
          title: "Delete?"
        };
        (0, _Common_make.sweetmsgconfirm)(() => remove(targetKey), opt);
        break;

      case "add":
        add();
        break;

      default:
        break;
    }
  }; // const combineChange = (allVal, from) => {
  //   if (props.combineChange) props.combineChange(allVal, from);
  // };


  const add = () => {
    const maxseq = () => {
      let seq = 0;
      panes.map((k, i) => {
        if (k.seq > seq) seq = k.seq;
        return null;
      });
      return seq;
    };

    const activeKey1 = parseInt(Math.random() * 100000).toString();
    let newPanes = [];
    if (panes) newPanes = [...panes];
    let newpane = {
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey1,
      seq: maxseq()
    };
    if (props.newpane) newpane = _objectSpread(_objectSpread({}, newpane), {}, {
      content: _objectSpread({}, props.newpane)
    }); //{title:"",content:""}

    newPanes.push(newpane);
    setPanes(newPanes);
    setActiveKey(activeKey1);
    if (props.add) props.add(activeKey1);
  };

  const remove = targetKey => {
    console.log(targetKey);
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);

    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    setPanes(newPanes);
    setActiveKey(newActiveKey);
    if (props.remove) props.remove(targetKey, newPanes, newActiveKey);
  };

  let extra = "";
  if (props.extra) extra = props.extra;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd2.Tabs, {
    type: "editable-card",
    tabBarExtraContent: extra,
    onChange: onChange,
    activeKey: activeKey,
    onEdit: onEdit
  }, panes && panes.map(pane => /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: pane.title,
    key: pane.key,
    closable: pane.closable
  }, pane.content))), panes && panes.length === 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    onClick: add
  })));
};

var _default = TabEditable;
exports.default = _default;