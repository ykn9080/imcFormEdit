"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.reverse.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactDataTableComponent = _interopRequireDefault(require("react-data-table-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ReactDataTable = props => {
  const [selectedRows, setSelectedRows] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);
  const handleChange = (0, _react.useCallback)(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const makeColumnFromList = list => {
    let col = [];
    if (!(list && list.length > 0)) return col;
    Object.keys(list[0]).reverse().map((k, i) => {
      col.push({
        name: k,
        selector: k,
        sortable: true,
        right: true
      });
      return null;
    });
    col.map((k, i) => {
      if (_lodash.default.indexOf(["@LABEL", "seq"], k.name) !== -1) col.splice(i, 1);
      return null;
    });
    col.unshift({
      name: "@LABEL",
      selector: "@LABEL",
      sortable: true,
      right: false
    });
    col.unshift({
      name: "seq",
      selector: "seq",
      sortable: true,
      right: true
    });
    return col;
  };

  const columnss = makeColumnFromList(props.list);
  console.log(props.list, columnss);
  let seqlist = [];
  if (props.list) props.list.map((k, i) => {
    seqlist.push(_objectSpread({
      seq: i + 1
    }, k));
    return null;
  }); //<p>{JSON.stringify(data)}</p>;

  return /*#__PURE__*/_react.default.createElement(_reactDataTableComponent.default, {
    data: seqlist,
    columns: columnss,
    onSelectedRowsChange: handleChange,
    pagination: true // selectableRows
    // expandableRows
    // expandableRowsComponent={<ExpanableComponent />}

  });
};

var _default = ReactDataTable;
exports.default = _default;