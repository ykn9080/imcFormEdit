"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

require("components/Common/Antd.css");

var _jExcel = _interopRequireDefault(require("components/Common/jExcel"));

var _reactDataGrid = _interopRequireDefault(require("react-data-grid"));

var _ReactTable = _interopRequireDefault(require("components/Common/ReactTable"));

var _ReactDataTable = _interopRequireDefault(require("components/Common/ReactDataTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const columns = [{
  key: "id",
  name: "ID"
}, {
  key: "title",
  name: "Title"
}, {
  key: "count",
  name: "Count"
}];
const rows = [{
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

function DataGrid() {
  return /*#__PURE__*/_react.default.createElement(_reactDataGrid.default, {
    columns: columns,
    rowGetter: i => rows[i],
    rowsCount: 3,
    minHeight: 150
  });
}

const TableView = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)(); // dispatch(globalVariable({ formEdit: false }));

  let formdt = (0, _reactRedux.useSelector)(state => state.global.currentData);
  if (location.state) formdt = location.state;
  dispatch((0, _actions.globalVariable)({
    currentData: formdt
  })); // const sum = formdt.data.setting;
  // const content = [
  //   { term: "Title", detail: formdt.name },
  //   { term: "Column", detail: sum.formColumn },
  //   { term: "Size", detail: sum.size },
  //   { term: "Layout", detail: sum.layout },
  //   { term: "LabelWidth", detail: sum.formItemLayout.labelCol.span },
  //   { term: "Description", detail: sum.desc, span: 24 },
  // ];
  // console.log(formdt, sum, content);

  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Edit"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null),
    onClick: () => history.push("/admin/control/table/tableedit")
  }))];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "site-page-header-ghost-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: "TableView",
    onBack: true,
    extra: extra //content={content}
    ,
    ghost: false,
    span: 12
  })), /*#__PURE__*/_react.default.createElement(_jExcel.default, null), " ", /*#__PURE__*/_react.default.createElement(DataGrid, null), /*#__PURE__*/_react.default.createElement(_ReactTable.default, null), /*#__PURE__*/_react.default.createElement(_ReactDataTable.default, null));
};

var _default = TableView;
exports.default = _default;