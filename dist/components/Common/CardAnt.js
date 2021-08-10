"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const CardAnt = props => {
  let setting = {},
      children = {},
      data;
  if (props.size) setting = _objectSpread(_objectSpread({}, setting), {}, {
    size: props.size
  });
  if (props.width) setting = _objectSpread(_objectSpread({}, setting), {}, {
    style: {
      width: props.width
    }
  });
  if (props.extra) setting = _objectSpread(_objectSpread({}, setting), {}, {
    extra: props.extra
  });
  if (props.title) setting = _objectSpread(_objectSpread({}, setting), {}, {
    title: props.title
  });
  if (props.hoverable) setting = _objectSpread(_objectSpread({}, setting), {}, {
    hoverable: props.hoverable
  });
  if (props.cover) setting = _objectSpread(_objectSpread({}, setting), {}, {
    cover: props.cover
  });

  if (props.data) {
    data = props.data;
    if (data.title) setting = _objectSpread(_objectSpread({}, setting), {}, {
      title: data.title
    });
  } //cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />


  if (props.children) children = _objectSpread({}, props.children); //children: <Meta title="Europe Street beat" description="www.instagram.com" />

  const actions = [/*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, {
    key: "delete",
    onClick: () => props.removeItemHandler(props.id)
  }), /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, {
    key: "edit",
    onClick: () => props.editItemHandler(props.id)
  })];
  if (props.actions) setting = _objectSpread(_objectSpread({}, setting), {}, {
    actions: actions
  });
  if (props.specialactions) setting = _objectSpread(_objectSpread({}, setting), {}, {
    actions: props.specialactions
  }); // if diffenent actions

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Card, setting, props.children));
};

var _default = CardAnt;
exports.default = _default;