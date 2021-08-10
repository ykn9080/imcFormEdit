"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GridLay = void 0;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactGridLayout = _interopRequireWildcard(require("react-grid-layout"));

require("./react-grid-layout.css");

require("./react-resizable.css");

var _antd = require("antd");

var _HighlightOff = _interopRequireDefault(require("@material-ui/icons/HighlightOff"));

var _AuthorChart = _interopRequireDefault(require("Model/Authoring/AuthorChart"));

var _AuthorGraph = _interopRequireDefault(require("Model/Authoring/AuthorGraph"));

var _AuthorTable = _interopRequireDefault(require("Model/Authoring/AuthorTable"));

var _AuthorMatrix = _interopRequireDefault(require("Model/Authoring/AuthorMatrix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);

const GridLay = props => {
  const defaultProps = {
    className: "layout",
    // items: 20,
    rowHeight: 100,
    measureBeforeMount: false,
    // mounted: false,
    //autoSize: false,
    compactType: null,
    currentBreakpoint: "lg",
    useCSSTransforms: true,
    preventCollision: false,
    // onDrop: { onDrop },
    // isDraggable: false,
    // isResizable: false,
    onLayoutChange: function onLayoutChange() {},
    cols: {
      lg: 12,
      md: 10,
      sm: 6,
      xs: 4,
      xxs: 2
    },
    breakpoints: {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0
    } // isDroppable: true,

  }; // useEffect(() => {
  //   $(".MuiCard-root").css("overflow", "auto");
  // }, []);

  props = _objectSpread(_objectSpread({}, defaultProps), props);
  let ww = 3,
      hh = 6;
  if (props.w) ww = props.w;
  if (props.h) hh = props.h;

  const itemCreate = arr => {
    return arr.map(function (k, i) {
      const y = 6,
            x = 3;
      return {
        i: i.toString(),
        title: k.title,
        x: i * 3 % (cols || 12),
        y: Math.floor(i / x) * y,
        w: ww,
        h: hh
      };
    });
  };

  (0, _react.useEffect)(() => {
    if (props.resultsLayout) setItems(props.resultsLayout);else setItems(itemCreate(props.children));
  }, []); //const layout1 = generateLayout();

  const [layout, setLayout] = (0, _react.useState)();
  const [items, setItems] = (0, _react.useState)();
  const [newCounter, setNewCounter] = (0, _react.useState)(0);
  const [breakpoint, setBreakpoint] = (0, _react.useState)(null);
  const [cols, setCols] = (0, _react.useState)(null);

  const onLayoutChange = layout => {
    //if (props.onLayoutChange)
    props.onLayoutChange(layout);
  };

  const CreateContent = k => {
    return (() => {
      switch (k.type) {
        case "table":
          return /*#__PURE__*/_react.default.createElement(_AuthorTable.default, {
            authObj: k
          });

        case "matrix":
          return /*#__PURE__*/_react.default.createElement(_AuthorMatrix.default, {
            obj: k
          });

        case "chart":
          return /*#__PURE__*/_react.default.createElement(_AuthorChart.default, {
            authObj: k
          });

        case "graph":
          return /*#__PURE__*/_react.default.createElement(_AuthorGraph.default, {
            authObj: k
          });

        default:
          break;
      }
    })();
  };

  let contentarr = [];
  if (props.children) contentarr = props.children;

  const createElement = el => {
    let removeStyle = {
      position: "absolute",
      right: "5px",
      top: "5px",
      cursor: "pointer"
    };
    if (props.remove === false) removeStyle = _objectSpread(_objectSpread({}, removeStyle), {}, {
      display: "none"
    });
    const i = el.i;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      "data-grid": el
    }, /*#__PURE__*/_react.default.createElement(CreateContent, el), /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
      placement: "top",
      title: "Delete?",
      onConfirm: () => onRemoveItem(i),
      okText: "Yes",
      cancelText: "No"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "remove",
      style: removeStyle
    }, /*#__PURE__*/_react.default.createElement(_HighlightOff.default, null))));
  };

  let childcomponent = [];
  if (items) childcomponent = _lodash.default.map(items, el => createElement(el)); // const onAddItem = () => {
  //   /*eslint no-console: 0*/
  //   console.log("adding", "n" + newCounter);
  //   setNewCounter(newCounter + 1);
  //   let newitems = items.concat({
  //     i: "n" + newCounter,
  //     x: (items.length * 2) % (cols || 12),
  //     y: Infinity, // puts it at the bottom
  //     w: 2,
  //     h: 2,
  //   });
  //   setItems(newitems);
  // };
  // We're using the cols coming back from this to calculate where to add new items.

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  };

  const onRemoveItem = i => {
    let removedItems = _lodash.default.reject(items, {
      i: i
    });

    setItems([...removedItems]);
  };

  const onDrop = elemParams => {
    setNewCounter(newCounter + 1);
    let newitems = items.concat(_objectSpread(_objectSpread({}, elemParams), {}, {
      i: "n" + newCounter
    }));
    setItems(newitems);
  };

  return /*#__PURE__*/_react.default.createElement(ResponsiveReactGridLayout, _extends({
    onLayoutChange: onLayoutChange,
    layout: layout,
    onDrop: onDrop,
    onBreakpointChange: onBreakpointChange,
    isDroppable: true
  }, props, {
    currentBreakpoint: breakpoint
  }), childcomponent);
};

exports.GridLay = GridLay;
var _default = GridLay;
exports.default = _default;