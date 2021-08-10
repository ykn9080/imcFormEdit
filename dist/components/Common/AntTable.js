"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AntTable;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactWindow = require("react-window");

var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AntTable(props) {
  const {
    columns,
    scroll,
    className
  } = props;
  const [tableWidth, setTableWidth] = (0, _react.useState)(0);
  const widthColumnCount = columns.filter(_ref => {
    let {
      width
    } = _ref;
    return !width;
  }).length;
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column;
    }

    return _objectSpread(_objectSpread({}, column), {}, {
      width: Math.floor(tableWidth / widthColumnCount)
    });
  });
  const gridRef = (0, _react.useRef)();
  const [connectObject] = (0, _react.useState)(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft
          });
        }
      }
    });
    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false
    });
  };

  (0, _react.useEffect)(() => resetVirtualGrid, []);
  (0, _react.useEffect)(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData, _ref2) => {
    let {
      scrollbarSize,
      ref,
      onScroll: _onScroll
    } = _ref2;
    ref.current = connectObject;
    return /*#__PURE__*/_react.default.createElement(_reactWindow.VariableSizeGrid, {
      ref: gridRef,
      className: "virtual-grid",
      columnCount: mergedColumns.length,
      columnWidth: index => {
        const {
          width
        } = mergedColumns[index];
        return index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
      },
      height: scroll.y,
      rowCount: rawData.length,
      rowHeight: () => 54,
      width: tableWidth,
      onScroll: _ref3 => {
        let {
          scrollLeft
        } = _ref3;

        _onScroll({
          scrollLeft
        });
      }
    }, _ref4 => {
      let {
        columnIndex,
        rowIndex,
        style
      } = _ref4;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("virtual-table-cell", {
          "virtual-table-cell-last": columnIndex === mergedColumns.length - 1
        }),
        style: style
      }, rawData[rowIndex][mergedColumns[columnIndex].dataIndex]);
    });
  };

  return /*#__PURE__*/_react.default.createElement(_rcResizeObserver.default, {
    onResize: _ref5 => {
      let {
        width
      } = _ref5;
      setTableWidth(width);
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, _extends({}, props, {
    className: (0, _classnames.default)(className, "virtual-table"),
    columns: mergedColumns,
    pagination: false,
    components: {
      body: renderVirtualList
    }
  })));
} // Usage


const columns = [{
  title: "A",
  dataIndex: "key",
  width: 150
}, {
  title: "B",
  dataIndex: "key"
}, {
  title: "C",
  dataIndex: "key"
}, {
  title: "D",
  dataIndex: "key"
}, {
  title: "E",
  dataIndex: "key",
  width: 200
}, {
  title: "F",
  dataIndex: "key",
  width: 100
}];
const data = [];

for (let i = 0; i < 100000; i += 1) {
  data.push({
    key: i
  });
}

ReactDOM.render( /*#__PURE__*/_react.default.createElement(VirtualTable, {
  columns: columns,
  dataSource: data,
  scroll: {
    y: 300,
    x: "100vw"
  }
}), mountNode);