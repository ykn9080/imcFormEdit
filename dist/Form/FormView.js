"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _stringquery = _interopRequireDefault(require("stringquery"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _fa = require("react-icons/fa");

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

var _AntFormDisplay = _interopRequireDefault(require("Form/AntFormDisplay"));

require("components/Common/Antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  Text
} = _antd.Typography;

const FormView = props => {
  var _formdt, _formdt$data;

  const location = (0, _reactRouterDom.useLocation)();
  let query = (0, _stringquery.default)(location.search);
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();
  dispatch((0, _actions.globalVariable)({
    formEdit: false
  }));
  const [submitted, setSubmitted] = (0, _react.useState)();
  let formdt = (0, _reactRedux.useSelector)(state => state.global.currentData);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  if (query.rtn) history.push("/admin/control/form/formedit");
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      helpLink: null
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: formdt._id
    }));
  }, []);
  if (typeof location.state != "undefined") formdt = location.state; //in order to reload

  dispatch((0, _actions.globalVariable)({
    currentData: formdt
  }));
  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Edit"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null),
    onClick: () => history.push("/admin/control/form/formedit")
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Copy Code"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_fa.FaRegCopy, null),
    onClick: () => navigator.clipboard.writeText(JSON.stringify(formdt)).then(function () {
      console.log("Async: Copying the code to clipboard was successful!");
    })
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "View Code"
  }, /*#__PURE__*/_react.default.createElement(_antd.Popover, {
    placement: "topLeft",
    title: "Submitted data",
    content: submitted,
    trigger: "click"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CopyrightCircleOutlined, null),
    onClick: () => {}
  })))];

  const copyclipboard = /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Copy to Clipboard"
  }, formdt._id, "  ", /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      border: "none"
    },
    icon: /*#__PURE__*/_react.default.createElement(_icons.PaperClipOutlined, null),
    onClick: () => {
      navigator.clipboard.writeText(formdt._id).then(function () {
        console.log("Async: Copying to clipboard was successful!");
      });
    }
  }));

  const sum = (_formdt = formdt) === null || _formdt === void 0 ? void 0 : (_formdt$data = _formdt.data) === null || _formdt$data === void 0 ? void 0 : _formdt$data.setting;
  const content = [{
    term: "Id",
    detail: copyclipboard
  }, {
    term: "Title",
    detail: formdt.name
  }, {
    term: "Column",
    detail: sum === null || sum === void 0 ? void 0 : sum.formColumn
  }, {
    term: "Size",
    detail: sum === null || sum === void 0 ? void 0 : sum.size
  }, {
    term: "Layout",
    detail: sum === null || sum === void 0 ? void 0 : sum.layout
  }, {
    term: "LabelWidth",
    detail: sum === null || sum === void 0 ? void 0 : sum.formItemLayout.labelCol.span
  }, {
    term: "Description",
    detail: sum === null || sum === void 0 ? void 0 : sum.desc,
    span: 24
  }];

  const onValuesChange = (changedValues, allValues) => {
    setSubmitted(JSON.stringify(allValues, null, 4));
  };

  const onFinish = val => {
    setSubmitted(JSON.stringify(val, null, 4));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "site-page-header-ghost-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: "FormView",
    onBack: true,
    extra: extra,
    content: content,
    ghost: false,
    span: 12
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 10
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, submitted && /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(_antd.Alert, {
    message: submitted,
    type: "success"
  }))), /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formArray: formdt.data,
    onValuesChange: onValuesChange,
    onFinish: onFinish
  })));
};

var _default = FormView;
exports.default = _default;