"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactSortableHoc = require("react-sortable-hoc");

var _icons = require("@ant-design/icons");

var _react2 = require("@emotion/react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const header = (0, _react2.css)({
  backgroundColor: "rgb(100, 108, 140)",
  color: "white",
  margin: "50px"
});
const tableCSS = (0, _react2.css)({
  margin: "40px 120px",
  backgroundColor: "white",
  "& table": {
    borderCollapse: "collapse"
  },
  "& thead > tr > th": {
    backgroundColor: "darkblue",
    color: "white"
  },
  "& thead > tr": {
    borderWidth: "2px",
    borderColor: "yellow",
    borderStyle: "solid"
  }
});
const DragHandle = (0, _reactSortableHoc.sortableHandle)(() => /*#__PURE__*/_react.default.createElement(_icons.MenuOutlined, {
  style: {
    cursor: "pointer",
    color: "#999"
  }
}));

const TableAntSort = props => {
  const [dataSource, setDataSource] = (0, _react.useState)();
  const [columns, setColumns] = (0, _react.useState)();
  const [selectedRowKeys, setSelectedRowKeys] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (props.rowSelection) {
      setSelectedRowKeys(props.rowSelection.selectedRowKeys);
    }

    if (props.data) setDataSource(props.data);
    if (props.columns) setColumns(props.columns);
  }, [props]);

  const onSelectChange = (keys, rows) => {
    setSelectedRowKeys({
      keys
    });
    if (props.onSelectChange) props.onSelectChange(keys, rows);
  };

  let rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  let tableSetting = {};

  if (props.rowSelection) {
    tableSetting = {
      rowSelection: rowSelection
    };
    if (props.rowSelection.onChange) tableSetting = {
      rowSelection: props.rowSelection
    };
  }

  let setting = {};
  if (props.size) setting = _objectSpread(_objectSpread({}, setting), {}, {
    size: props.size
  });
  if (props.footer) setting = _objectSpread(_objectSpread({}, setting), {}, {
    footer: props.footer
  }); //if (props.expandable)

  setting = _objectSpread(_objectSpread({}, setting), {}, {
    expandable: props.expandable
  });
  return /*#__PURE__*/_react.default.createElement(_antd.Table, _extends({
    pagination: false,
    dataSource: dataSource,
    columns: columns,
    rowKey: "key"
  }, setting, {
    className: tableCSS,
    headerClassName: header // components={{
    //   body: {
    //     wrapper: DraggableContainer,
    //     row: DragableBodyRow,
    //   },
    // }}

  }, tableSetting));
};

var _default = TableAntSort;
exports.default = _default;