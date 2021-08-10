"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _reactTable = require("react-table");

require("./ReactTable.css");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// const Styles = styled.div`
//   padding: 1rem;
//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//     th,
//     td {
//       margin: 0;
//       padding: 0.2rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;
const ReactTable = () => {
  const data = (0, _react.useMemo)(() => [{
    col1: "Hello",
    col2: "World"
  }, {
    col1: "react-table",
    col2: "rocks"
  }, {
    col1: "whatever",
    col2: "you want"
  }], []);
  const columns = (0, _react.useMemo)(() => [{
    Header: "Column 1",
    accessor: "col1" // accessor is the "key" in the data

  }, {
    Header: "Column 2",
    accessor: "col2"
  }], []);
  return (
    /*#__PURE__*/
    // <Styles>
    //   <Table columns={columns} data={data} />
    // </Styles>
    _react.default.createElement(Table, {
      columns: columns,
      data: data
    })
  );
};

const Table = _ref => {
  let {
    columns,
    data
  } = _ref;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = (0, _reactTable.useTable)({
    columns,
    data
  });
  return /*#__PURE__*/_react.default.createElement(_Table.default, _extends({}, getTableProps(), {
    // className="-striped -highlight"
    size: "small",
    noDataText: "No Data Available",
    filterable: true,
    defaultPageSize: 2 // style={{ border: "solid 1px blue" }}

  }), /*#__PURE__*/_react.default.createElement(_TableHead.default, null, headerGroups.map(headerGroup => /*#__PURE__*/_react.default.createElement("tr", headerGroup.getHeaderGroupProps(), headerGroup.headers.map(column => /*#__PURE__*/_react.default.createElement("th", _extends({}, column.getHeaderProps(), {
    style: {
      borderBottom: "solid 1px #D0D0D0",
      background: "#001529",
      color: "white",
      fontWeight: "normal"
    }
  }), column.render("Header")))))), /*#__PURE__*/_react.default.createElement(_TableBody.default, getTableBodyProps(), rows.map(row => {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, row.getRowProps(), row.cells.map(cell => {
      return /*#__PURE__*/_react.default.createElement(_TableCell.default, cell.getCellProps(), cell.render("Cell"));
    }));
  })));
};

var _default = ReactTable;
exports.default = _default;