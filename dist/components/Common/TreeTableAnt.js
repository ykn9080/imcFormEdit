"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let columns = [{
  title: "Title",
  dataIndex: "title",
  key: "title",
  width: "30%"
}];

const TreeData = props => {
  let data = (0, _reactRedux.useSelector)(state => state.global.treeData);
  let radiotype; //= "checkbox";

  if (props.radiotype) radiotype = props.radiotype;
  if (props.columns) columns = props.columns;
  if (props.data) data = props.data; // rowSelection objects indicates the need for row selection

  let rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selectedRowKeys: ".concat(selectedRowKeys), "selectedRows: ", selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      if (props.onSelect) props.onSelect(record, selected, selectedRows);
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    }
  };
  if (radiotype) rowSelection = _objectSpread({
    type: radiotype
  }, rowSelection); //   const [checkStrictly, setCheckStrictly] = React.useState(false);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    columns: columns,
    rowSelection: rowSelection,
    dataSource: data
  }));
};

var _default = TreeData;
exports.default = _default;