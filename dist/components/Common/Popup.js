"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("antd/dist/antd.css");

var _antd2 = require("antd");

var _jquery = _interopRequireDefault(require("jquery"));

var _actions = require("actions");

var _Icon = _interopRequireDefault(require("Admin/Help/Icon"));

var _fa = require("react-icons/fa");

var _ai = require("react-icons/ai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Style = {
  root: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10000,
    backgroundColor: "white",
    border: "solid 1px gray",
    overflow: "auto",
    boxShadow: "3px 5px #888888"
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    textAlign: "right",
    cursor: "move"
  },
  close: {
    color: "white",
    fontSize: 20,
    cursor: "pointer",
    margin: 20,
    paddingTop: 40
  },
  content: {
    padding: 10,
    marginTop: 30
  },
  helpButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "inherit"
  },
  iconStyle: {
    color: "white",
    cursor: "pointer",
    marginTop: 10,
    marginRight: 10,
    fontSize: 20
  }
};

const Popup = props => {
  let x = 0,
      y = 0,
      w = "100%",
      h = "100%";
  if (props.x) x = props.x;
  if (props.y) y = props.y;
  if (props.w) w = props.w;
  if (props.h) h = props.h;
  Style.root = _objectSpread(_objectSpread({}, Style.root), {}, {
    left: x,
    top: y,
    width: w,
    height: h
  });
  let openPopup = (0, _reactRedux.useSelector)(state => state.global.openPopup);
  const dispatch = (0, _reactRedux.useDispatch)();

  const handleCancel = () => {
    dispatch((0, _actions.globalVariable)({
      openPopup: false
    }));
  };

  let link = null;
  if (props.helpLink) link = props.helpLink;
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      helpLink: link
    }));
  }, []);
  const ModalText = props.children;
  setTimeout(() => {
    (0, _jquery.default)(".popdiv").draggable();
  }, 1500);
  return openPopup && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: Style.root,
    className: "popdiv"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: Style.header
  }, /*#__PURE__*/_react.default.createElement(_antd2.Row, {
    justify: "end"
  }, /*#__PURE__*/_react.default.createElement(_antd2.Col, null, /*#__PURE__*/_react.default.createElement(_fa.FaQuestionCircle, {
    style: Style.iconStyle,
    onClick: () => {
      dispatch((0, _actions.globalVariable)({
        openHelp: true
      }));
    }
  })), /*#__PURE__*/_react.default.createElement(_antd2.Col, null, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineClose, {
    style: Style.iconStyle,
    onClick: handleCancel
  })))), /*#__PURE__*/_react.default.createElement("div", {
    style: Style.content
  }, ModalText)), /*#__PURE__*/_react.default.createElement(_Icon.default, null));
};

var _default = Popup;
exports.default = _default;