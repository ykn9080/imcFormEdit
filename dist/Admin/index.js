"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _Menu = _interopRequireDefault(require("components/Common/Menu"));

var _AppBar = _interopRequireDefault(require("components/Common/AppBar"));

var _FormList = _interopRequireDefault(require("Form/FormList"));

var _FormView = _interopRequireDefault(require("Form/FormView"));

var _FormEdit = _interopRequireDefault(require("Form/FormEdit"));

var _ModelViewParameter = _interopRequireDefault(require("Form/ModelViewParameter"));

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const adminMenu = [// {
//   access: [],
//   _id: "5e8ed662bdb50363914263af",
//   desc: "",
//   layout: [],
//   seq: 0,
//   title: "Organization",
//   type: "admin",
//   pid: "",
//   path: "/admin/organization",
// },
{
  access: [],
  _id: "5e8ed662bdb50363914263b1",
  desc: "",
  layout: [],
  seq: 2,
  title: "Control",
  pid: "",
  type: "admin",
  path: "/admin/control",
  breadcrumbName: "/admin/control"
}, // {
//   access: [],
//   _id: "5e8ed662bdb5036391426999",
//   desc: "",
//   layout: [],
//   seq: 3,
//   title: "Model",
//   pid: "",
//   type: "admin",
//   path: "/model",
//   breadcrumbName: "/admin/model",
// },
{
  access: [],
  _id: "5e8ed662bdb50363914263x1",
  desc: "",
  layout: [],
  seq: 0,
  title: "Form",
  pid: "5e8ed662bdb50363914263b1",
  type: "admin",
  path: "/admin/control/form",
  breadcrumbName: "/admin/Form Build"
}, // {
//   access: [],
//   _id: "5e8ed662bdb50363914263x9",
//   desc: "universial purpose, input data, make report with them",
//   layout: [],
//   seq: 1,
//   title: "Allpurpose",
//   pid: "5e8ed662bdb50363914263b1",
//   type: "admin",
//   path: "/admin/control/allpurpose",
//   breadcrumbName: "/admin/Allpurpose Build",
// },
{
  access: [],
  _id: "5e8ed662bdb50363914263b2",
  desc: "",
  layout: [],
  seq: 4,
  title: "System",
  pid: "",
  type: "admin",
  path: "/admin/system"
} // {
//   access: [],
//   _id: "5e8ed662bdb50363914263x1",
//   desc: "",
//   layout: [],
//   seq: 0,
//   title: "Data",
//   pid: "5e8ed662bdb50363914263b2",
//   type: "admin",
//   path: "/admin/system/data",
// },
// {
//   access: [],
//   _id: "5e8ed662bdb50363914263x5",
//   desc: "",
//   layout: [],
//   seq: 1,
//   title: "Style",
//   pid: "5e8ed662bdb50363914263b2",
//   type: "admin",
//   path: "/admin/system/style",
// },
// {
//   access: [],
//   _id: "5e8ed662bdb50363914263x6",
//   desc: "",
//   layout: [],
//   seq: 0,
//   title: "Icon",
//   pid: "5e8ed662bdb50363914263x5",
//   type: "admin",
//   path: "/admin/system/style/icon",
// },
// {
//   access: [],
//   _id: "5e8ed662bdb50363914263x7",
//   desc: "",
//   layout: [],
//   seq: 0,
//   title: "Image",
//   pid: "5e8ed662bdb50363914263x5",
//   type: "admin",
//   path: "/admin/system/style/image",
// },
// {
//   access: [],
//   _id: "5e8ed662bdb50363914263x2",
//   desc: "",
//   layout: [],
//   seq: 1,
//   title: "Help",
//   pid: "",
//   type: "admin",
//   path: "/admin/help",
// },
// {
//   access: [],
//   _id: "5e8ed71cbdb50363914263b3",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263af",
//   seq: 0,
//   title: "Company",
//   type: "admin",
//   path: "/admin/organization/company",
// },
// {
//   access: [],
//   _id: "5e8ed71cbdb50363914263b4",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263af",
//   seq: 1,
//   title: "User",
//   type: "admin",
//   path: "/admin/organization/user",
// },
// {
//   access: [],
//   _id: "5e8ed71cbdb50363914263b5",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263af",
//   seq: 2,
//   title: "Group",
//   type: "admin",
//   path: "/admin/organization/group",
// },
// {
//   access: [],
//   _id: "5e8ed71cbdb50363914263b6",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263af",
//   seq: 3,
//   title: "Organization",
//   type: "admin",
//   path: "/admin/organization/organization",
// },
// {
//   access: [],
//   _id: "5e8ed71cbdb50363914263b7",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263af",
//   seq: 4,
//   title: "Product/Service",
//   type: "admin",
//   path: "/admin/organization/product & Service",
// },
// {
//   access: [],
//   _id: "5e8ed7adbdb50363914263b8",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263b0",
//   seq: 0,
//   title: "MenuBuild",
//   type: "admin",
//   path: "/admin/menu/menubuild",
// },
// {
//   access: [],
//   _id: "5e8ed7adbdb50363914263b9",
//   desc: "",
//   layout: [],
//   pid: "5e8ed662bdb50363914263b0",
//   seq: 1,
//   title: "PageBuild",
//   type: "admin",
//   path: "/admin/menu/pagebuild",
// },
];

const Admin = _ref => {
  let {
    match
  } = _ref;
  let title = match.params.name,
      titleUpper = "";
  if (typeof match.params.child != "undefined") title = match.params.child;
  if (typeof match.params.grandchild != "undefined") title = match.params.grandchild;
  console.log(title);

  if (title) {
    titleUpper = title.charAt(0).toUpperCase() + title.slice(1);

    if (title.indexOf("allpurpose") > -1) {
      let up = titleUpper.replace("Allpurpose", "");
      titleUpper = up.charAt(0).toUpperCase() + up.slice(1);
    }
  }

  (0, _react.useEffect)(() => {}, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    title: "Admin"
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, {
    menuList: adminMenu
  })), ["formview", "formedit", "form"].indexOf(title) === -1 ? /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: titleUpper
  }) : null, (() => {
    switch (title) {
      case "form":
      case "table":
      case "chart":
      case "data":
        return /*#__PURE__*/_react.default.createElement(_FormList.default, {
          type: title
        });

      case "formview":
        return /*#__PURE__*/_react.default.createElement(_FormView.default, null);

      case "formedit":
        return /*#__PURE__*/_react.default.createElement(_FormEdit.default, null);

      case "formmulti":
        return /*#__PURE__*/_react.default.createElement(_ModelViewParameter.default, null);

      default:
        return null;
    }
  })());
};

var _default = Admin;
exports.default = _default;