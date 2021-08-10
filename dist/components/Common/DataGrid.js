"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDataGrid = _interopRequireDefault(require("react-data-grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DataGrid = props => {
  let rowCount = 3,
      minHeight = 150;
  let columns = [{
    key: "id",
    name: "ID"
  }, {
    key: "title",
    name: "Title"
  }, {
    key: "count",
    name: "Count"
  }];
  let rows = [{
    id: 0,
    title: "row1",
    count: 20
  }, {
    id: 1,
    title: "row1",
    count: 40
  }, {
    id: 2,
    title: "row1",
    count: 60
  }];
  if (props.rowCount) rowCount = props.rowCount;
  if (props.minHeight) minHeight = props.minHeight;
  if (props.columns) columns = props.columns;
  if (props.rows) rows = props.rows;
  return /*#__PURE__*/_react.default.createElement(_reactDataGrid.default, {
    columns: columns,
    rowGetter: i => rows[i],
    rowsCount: rowCount,
    minHeight: minHeight
  });
};

var _default = DataGrid;
exports.default = _default;