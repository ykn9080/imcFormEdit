"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _axios = _interopRequireDefault(require("axios"));

require("../../../../node_modules/bootstrap/dist/css/bootstrap.min.css");

var _reactBootstrapTableNext = _interopRequireDefault(require("react-bootstrap-table-next"));

var _reactBootstrapTable2Filter = _interopRequireDefault(require("react-bootstrap-table2-filter"));

var _reactBootstrapTable2Paginator = _interopRequireDefault(require("react-bootstrap-table2-paginator"));

var _reactBootstrapTable2Editor = _interopRequireDefault(require("react-bootstrap-table2-editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BootTable = _ref => {
  let {
    dt,
    apiUrl,
    keyfield,
    attr
  } = _ref;
  // let condensed = "";
  // if (props.condensed) condensed = props.condensed;
  let hover = false,
      striped = false;
  let selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true
  };
  if (typeof keyfield == "undefined") keyfield = "id";

  if (typeof attr != "undefined") {
    if (typeof attr.hover != "undefined") hover = attr.hover;
    if (typeof attr.striped != "undefined") striped = attr.striped;
  }

  const [state, setState] = (0, _react.useState)(dt);
  (0, _react.useEffect)(() => {
    _axios.default.get(apiUrl).then(response => {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        dataList: response.data.results
      }));
    }); // axios.get("http://localhost:3001/results").then(response => {
    //   console.log(response);
    //   setState({ ...state, products: response.data.results });
    // });

  }, [apiUrl]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    style: {
      marginTop: 50
    }
  }, /*#__PURE__*/_react.default.createElement(_reactBootstrapTableNext.default, {
    striped: striped,
    hover: hover,
    keyField: keyfield,
    data: state.dataList,
    columns: state.columns,
    filter: (0, _reactBootstrapTable2Filter.default)(),
    pagination: (0, _reactBootstrapTable2Paginator.default)(),
    cellEdit: (0, _reactBootstrapTable2Editor.default)({
      mode: "dbclick",
      blurToSave: true,
      onStartEdit: (row, column, rowIndex, columnIndex) => {
        console.log("start:", row, column, rowIndex, columnIndex);
      },
      beforeSaveCell: (oldValue, newValue, row, column) => {
        console.log("Before:", oldValue, newValue, row, column);
      },
      afterSaveCell: (oldValue, newValue, row, column) => {
        console.log("After:", oldValue, newValue, row, column);
      }
    }),
    selectRow: selectRow
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: () => {
      _axios.default.get("http://localhost:3001/results").then(response => {
        console.log(response);
        setState(_objectSpread(_objectSpread({}, state), {}, {
          dataList: response.data.results
        }));
      });
    }
  }, "click"));
};

var _default = BootTable;
exports.default = _default;