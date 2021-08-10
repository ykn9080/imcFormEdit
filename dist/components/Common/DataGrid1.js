"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.reduce.js");

var _react = _interopRequireDefault(require("react"));

var _reactDataGrid = _interopRequireDefault(require("react-data-grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const formatter = _ref => {
  let {
    value
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("span", {
    class: "label label-info"
  }, value);
};

function createColumns(count) {
  return [...Array(count).keys()].map(i => ({
    key: "col".concat(i),
    name: "Column ".concat(i),
    width: 160,
    editable: true,
    formatter
  }));
}

function createSingleRow(columns, rowIdx) {
  return columns.reduce((row, c, cidx) => _objectSpread(_objectSpread({}, row), {}, {
    [c.key]: "Row ".concat(rowIdx, " - Col ").concat(cidx)
  }), {});
}

function createRows(count, columns) {
  return [...Array(count).keys()].map(rowIdx => createSingleRow(columns, rowIdx));
}

const columns = createColumns(50);

class DataGrid1 extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      rows: createRows(1000, columns)
    });

    _defineProperty(this, "onGridRowsUpdated", _ref2 => {
      let {
        fromRow,
        toRow,
        updated
      } = _ref2;
      this.setState(state => {
        const rows = state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = _objectSpread(_objectSpread({}, rows[i]), updated);
        }

        return {
          rows
        };
      });
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDataGrid.default, {
      columns: columns,
      rowGetter: i => this.state.rows[i],
      rowsCount: this.state.rows.length,
      onGridRowsUpdated: this.onGridRowsUpdated,
      enableCellSelect: true,
      enableCellAutoFocus: false,
      minHeight: 650
    }));
  }

}

var _default = DataGrid1;
exports.default = _default;