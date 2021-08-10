"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _BootStrapTable = _interopRequireDefault(require("components/Controls/Table/BootStrapTable2"));

var _reactBootstrapTable2Filter = require("react-bootstrap-table2-filter");

var _reactBootstrapTable2Editor = require("react-bootstrap-table2-editor");

var _ApiUrlSearch = _interopRequireDefault(require("./ApiUrlSearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DataSrc = () => {
  const apiUrl = (0, _reactRedux.useSelector)(state => state.global.apiUrl);
  const dt = {
    dataList: [],
    columns: [{
      dataField: "id",
      text: "Product ID",
      sort: true
    }, {
      dataField: "name",
      text: "Product Name",
      sort: true,
      filter: (0, _reactBootstrapTable2Filter.textFilter)()
    }, {
      dataField: "price",
      text: "Product Price",
      sort: true
    }, {
      dataField: "quality",
      text: "Product Quality",
      sort: true,
      editor: {
        type: _reactBootstrapTable2Editor.Type.SELECT,
        options: [{
          value: "A",
          label: "A"
        }, {
          value: "B",
          label: "B"
        }, {
          value: "C",
          label: "C"
        }, {
          value: "D",
          label: "D"
        }, {
          value: "E",
          label: "E"
        }]
      }
    }, {
      dataField: "done",
      text: "Done",
      editor: {
        type: _reactBootstrapTable2Editor.Type.CHECKBOX,
        value: "Y:N"
      }
    }, {
      dataField: "date",
      text: "Date",
      formatter: cell => {
        let dateObj = cell;

        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }

        return "".concat(("0" + dateObj.getUTCDate()).slice(-2), "/").concat(("0" + (dateObj.getUTCMonth() + 1)).slice(-2), "/").concat(dateObj.getUTCFullYear());
      },
      editor: {
        type: _reactBootstrapTable2Editor.Type.DATE
      }
    }, {
      dataField: "desc",
      text: "desc",
      editor: {
        type: _reactBootstrapTable2Editor.Type.TEXTAREA
      }
    }]
  }; //const url = apiUrl; //"http://localhost:3001/results";

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ApiUrlSearch.default, null), /*#__PURE__*/_react.default.createElement(_BootStrapTable.default, {
    dt: dt,
    apiUrl: apiUrl
  }));
};

var _default = DataSrc;
exports.default = _default;