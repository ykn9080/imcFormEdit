"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _uuid = require("uuid");

var _reactBeautifulDnd = require("react-beautiful-dnd");

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", _extends({}, provided.draggableProps, provided.dragHandleProps, {
    ref: provided.innerRef,
    style: provided.draggableProps.style,
    className: snapshot.isDragging ? "dragging" : ""
  }), item.label));
};

function Copyable(props) {
  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
    renderClone: getRenderItem(props.items, props.className),
    droppableId: props.droppableId,
    isDropDisabled: true
  }, (provided, snapshot) => /*#__PURE__*/_react.default.createElement("ul", {
    ref: provided.innerRef,
    className: props.className
  }, props.items.map((item, index) => {
    const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: item.id
    }, shouldRenderClone ? /*#__PURE__*/_react.default.createElement("li", {
      className: "react-beatiful-dnd-copy"
    }, item.label) : /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
      draggableId: item.id,
      index: index
    }, (provided, snapshot) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("li", _extends({
      ref: provided.innerRef
    }, provided.draggableProps, provided.dragHandleProps, {
      className: snapshot.isDragging ? "dragging" : ""
    }), item.label))));
  }), provided.placeholder));
}

function Shop(props) {
  return /*#__PURE__*/_react.default.createElement(Copyable, {
    droppableId: "SHOP",
    className: "shop",
    items: props.items
  });
}

function ShoppingBag(props) {
  return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
    droppableId: "BAG"
  }, (provided, snapshot) => /*#__PURE__*/_react.default.createElement("ul", {
    ref: provided.innerRef,
    className: "shopping-bag"
  }, props.items.map((item, index) => /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
    key: item.id,
    draggableId: item.id,
    index: index
  }, (provided, snapshot) => /*#__PURE__*/_react.default.createElement("li", _extends({
    ref: provided.innerRef
  }, provided.draggableProps, provided.dragHandleProps, {
    style: provided.draggableProps.style
  }), item.label))), provided.placeholder));
}

const COLLECTION = [{
  id: (0, _uuid.v4)(),
  label: "Apple"
}, {
  id: (0, _uuid.v4)(),
  label: "Banana"
}, {
  id: (0, _uuid.v4)(),
  label: "orange"
}];

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, _objectSpread(_objectSpread({}, item), {}, {
    id: (0, _uuid.v4)()
  }));
  return destination;
};

function App() {
  const [shoppingBagItems, setShoppingBagItems] = _react.default.useState([]);

  const onDragEnd = _react.default.useCallback(result => {
    const {
      source,
      destination
    } = result;

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setShoppingBagItems(state => reorder(state, source.index, destination.index));
        break;

      case "SHOP":
        setShoppingBagItems(state => copy(COLLECTION, state, source, destination));
        break;

      default:
        break;
    }
  }, [setShoppingBagItems]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Shop"), /*#__PURE__*/_react.default.createElement(Shop, {
    items: COLLECTION
  }), /*#__PURE__*/_react.default.createElement("h2", null, "Shopping bag"), /*#__PURE__*/_react.default.createElement(ShoppingBag, {
    items: shoppingBagItems
  })));
}