"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactstrap = require("reactstrap");

var _classnames = _interopRequireDefault(require("classnames"));

var _DataSrc = _interopRequireDefault(require("./DataSrc"));

var _AntFormBuild = _interopRequireDefault(require("Form/AntFormBuild"));

var _AppBar = _interopRequireDefault(require("components/Common/AppBar"));

var _IconButton = _interopRequireDefault(require("components/Common/IconButton"));

var _Settings = _interopRequireDefault(require("@material-ui/icons/Settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// const formData = {
//   setting: {
//     formItemLayout: {
//       labelCol: { span: 8 },
//       wrapperCol: { span: 16 },
//     },
//     layout: "horizontal",
//     size: "middle",
//     initialValues: { name: "hhh" },
//     onFinish: (values) => {
//       console.log("Received values of form: ", values);
//     },
//     onFinishFailed: (values, errorFields, outOfDate) => {
//       console.log(values, errorFields, outOfDate);
//     },
//   },
//   list: [
//     { label: "Name", name: "name", type: "input", seq: 1 },
//     {
//       label: "Pass",
//       name: "password",
//       type: "input.password",
//       rules: [{ required: true, message: "enter!!!" }],
//       seq: 2,
//     },
//     {
//       type: "button",
//       seq: 1000,
//       tailLayout: {
//         wrapperCol: { offset: 8, span: 16 },
//       },
//       btnArr: [
//         {
//           btnLabel: "Submit",
//           btnStyle: "secondary",
//           htmlType: "submit",
//           seq: 0,
//         },
//         {
//           btnLabel: "Cancel",
//           btnStyle: "primary",
//           htmlType: "button",
//           seq: 1,
//         },
//       ],
//     },
//     {
//       label: "Date",
//       name: "date",
//       type: "datepicker",
//       rules: [
//         { type: "object", required: true, message: "Please select time!" },
//       ],
//       seq: 0,
//     },
//   ],
// };
// const Fetch = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     (async () => {
//       // let res = await fetch(
//       //   "http://localhost:3001/bootform/5e8054063346b1dd6ce970aa" //example and simple data
//       // );
//       const result = await axios.get(
//         "http://localhost:3001/bootform/5e8054063346b1dd6ce970aa"
//       );
//       // let response = await res.json();
//       dispatch(globalVariable({ formData: result.data.data }));
//       setData(JSON.stringify(result.data.data));
//       console.log(result.data.data);
//     })();
//   }, []);
//   return <div>{data}</div>;
// };
const EditTab = props => {
  const [activeTab, setActiveTab] = (0, _react.useState)("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const NItem = _ref => {
    let {
      indx,
      title
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_reactstrap.NavItem, null, /*#__PURE__*/_react.default.createElement(_reactstrap.NavLink, {
      className: (0, _classnames.default)({
        active: activeTab === indx
      }),
      onClick: () => {
        toggle(indx);
      }
    }, title));
  };

  const dispatch = (0, _reactRedux.useDispatch)();
  const pathname = encodeURIComponent(window.location.pathname);
  console.log(pathname); // useEffect(() => {
  //   setFetching(true);
  //   fetch(
  //     `${currentsetting.webserviceprefix}bootform/5e8054063346b1dd6ce970aa`
  //   ).then(response =>
  //     dispatch(globalVariable({ formData: response.data[0].data }))
  //   );
  //   setFetching(false);
  // }, []);
  // useEffect(async () => {
  //   const result = await axios.get(
  //     `${currentsetting.webserviceprefix}bootform/id?pathname=${pathname}`
  //   );
  //   dispatch(globalVariable({ formData: result.data.data }));
  //   setting = result.data.data.setting;
  //   list = result.data.data.list;
  //   console.log(result.data.data, result);
  // }, []);

  let edit = (0, _reactRedux.useSelector)(state => state.global.formEdit);

  const handleEdit = () => {
    dispatch((0, _actions.globalVariable)({
      formEdit: !edit
    }));
  };

  const right = /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    tooltip: "Edit Page",
    handleClick: handleEdit
  }, /*#__PURE__*/_react.default.createElement(_Settings.default, null));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    title: "Control Edit",
    right: right
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingLeft: 5,
      marginTop: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Nav, {
    tabs: true
  }, /*#__PURE__*/_react.default.createElement(NItem, {
    indx: "1",
    title: "Summary"
  }), /*#__PURE__*/_react.default.createElement(NItem, {
    indx: "2",
    title: "DataSource"
  })), /*#__PURE__*/_react.default.createElement(_reactstrap.TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.TabPane, {
    tabId: "1"
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/_react.default.createElement(_AntFormBuild.default, null)))), /*#__PURE__*/_react.default.createElement(_reactstrap.TabPane, {
    tabId: "2"
  }, /*#__PURE__*/_react.default.createElement(_reactstrap.Row, null, /*#__PURE__*/_react.default.createElement(_reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/_react.default.createElement(_DataSrc.default, null)))))));
};

var _default = EditTab;
exports.default = _default;