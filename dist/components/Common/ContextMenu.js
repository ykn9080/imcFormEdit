"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./ContextMenu.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ContextMenu = props => {
  const contextRef = (0, _react.useRef)(null);
  const [visible, setVisible] = (0, _react.useState)(false);
  const [position, setPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  let items = [],
      node = {};
  if (props.items) items = props.items;
  if (props.node) node = props.node;
  (0, _react.useEffect)(() => {
    const click = (index, node) => {
      if (!index) {
        setVisible(false);
        setPosition({
          x: 0,
          y: 0
        });
        return false;
      }

      if (props.callback) {
        props.callback(index, JSON.parse(node));
      }
    };

    document.addEventListener("contextmenu", function (event) {
      var _contextRef$current;

      event.preventDefault();
      const clickX = event.clientX;
      const clickY = event.clientY;
      setVisible(true);
      const yoffset = (_contextRef$current = contextRef.current) === null || _contextRef$current === void 0 ? void 0 : _contextRef$current.clientHeight;
      if (yoffset) setPosition({
        x: clickX + 20,
        y: clickY - yoffset - 30
      });
    });
    document.addEventListener("click", function (event) {
      if (contextRef.current && contextRef.current.id === "customcontext") {
        click(event.target.getAttribute("index"), event.target.getAttribute("node"));
      }

      event.preventDefault();
      setVisible(false);
      setPosition({
        x: 0,
        y: 0
      });
    });
  }, []);

  const returnMenu = (items, node) => {
    var myStyle = {
      position: "absolute",
      top: "".concat(position.y, "px"),
      left: "".concat(position.x + 5, "px")
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-context",
      id: "customcontext",
      style: myStyle,
      ref: contextRef
    }, items.map((item, index, arr) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: arr.length - 1 === index ? "custom-context-item-last" : "custom-context-item",
        index: index,
        node: JSON.stringify(node)
      }, item.label);
    }));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "cmenu"
  }, visible ? returnMenu(items, node) : null);
};

var _default = ContextMenu;
exports.default = _default;