"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PageHeadEdit = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

require("components/Common/Antd.css");

var _AntFormDisplay = _interopRequireDefault(require("Form/AntFormDisplay"));

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PageHeadEdit = props => {
  let title = "",
      pid = "";
  const forceUpdate = (0, _useForceUpdate.default)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const [isEdit, setIsEdit] = (0, _react.useState)(false);
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey); // let rtn = "";
  // const findTopNode = (id) => {
  //   if (id) {
  //     let pdt = _.filter(tempMenu, function (o) {
  //       return o._id == id;
  //     });
  //     if (pdt.length == 0) return;
  //     if (pdt[0].pid === "") {
  //       rtn = pdt[0]._id;
  //       return pdt[0]._id;
  //     }
  //     findTopNode(pdt[0].pid);
  //   }
  // };
  // findTopNode(selectedKey);
  // treeData = getNodeData(tempMenu, rtn, "_id", "pid", "", "title");

  let currdt = _lodash.default.filter(tempMenu, function (o) {
    return o._id === selectedKey;
  });

  if (currdt.length > 0) {
    currdt = currdt[0];
    title = currdt.title;
    pid = currdt.pid;
  }

  const summaryData = {
    setting: {
      formItemLayout: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      },
      layout: "vertical",
      formColumn: 1,
      size: "small",
      initialValues: {
        title: currdt.title,
        desc: currdt.desc
      },
      onFinish: values => {
        let patharr = currdt.path.split("/");
        patharr.splice(patharr.length - 1, 1, values.title);
        patharr = patharr.join("/");
        currdt = _objectSpread(_objectSpread(_objectSpread({}, currdt), values), {}, {
          path: patharr
        });

        var index = _lodash.default.findIndex(tempMenu, {
          _id: selectedKey
        }); //console.log("Received values of form: ", values, currdt);
        // Replace item at index using native splice


        let temp = (0, _cloneDeep.default)(tempMenu);
        temp.splice(index, 1, currdt);
        dispatch((0, _actions.globalVariable)({
          tempMenu: temp
        }));
        forceUpdate();
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      }
    },
    list: [{
      label: "Title",
      name: "title",
      type: "input",
      seq: 0
    }, {
      label: "Desc",
      name: "desc",
      type: "input.textarea",
      seq: 1
    }, {
      type: "button",
      seq: 1000,
      btnArr: [{
        btnLabel: "Submit",
        btnStyle: "primary",
        htmlType: "submit",
        seq: 0
      }, {
        btnLabel: "Cancel",
        btnStyle: "secondary",
        htmlType: "button",
        onClick: () => {
          setIsEdit(!isEdit);
        },
        seq: 1
      }]
    }]
  };

  const renderContent = function renderContent() {
    let column = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return /*#__PURE__*/_react.default.createElement(_antd.Descriptions, {
      size: "small",
      column: column
    }, /*#__PURE__*/_react.default.createElement(_antd.Descriptions.Item, {
      label: "Title"
    }, currdt.title), /*#__PURE__*/_react.default.createElement(_antd.Descriptions.Item, {
      label: "Desc"
    }, currdt.desc));
  };

  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: isEdit ? "View" : "Edit"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: isEdit ? /*#__PURE__*/_react.default.createElement(_icons.DesktopOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null),
    onClick: () => {
      setIsEdit(!isEdit);
    }
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Delete"
  }, /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
    title: "Are you sure to delete ?",
    onConfirm: () => {
      var index = _lodash.default.findIndex(tempMenu, {
        _id: selectedKey
      });

      let temp = (0, _cloneDeep.default)(tempMenu);
      temp.splice(index, 1);
      dispatch((0, _actions.globalVariable)({
        tempMenu: temp
      }));
    },
    okText: "Yes",
    cancelText: "No"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.DeleteOutlined, null)
  })))]; // const extraContent = (
  //   <div
  //     style={{
  //       display: "flex",
  //       width: "max-content",
  //       justifyContent: "flex-end",
  //     }}
  //   >
  //     {/* <SubMenu selectedmenu={selectedmenu} tempMenu={tempMenu} /> */}
  //   </div>
  // );

  const Content = _ref => {
    let {
      children,
      extraContent
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 3,
        paddingRight: 5
      }
    }, extraContent), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 3
      }
    }, children));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "site-page-header-ghost-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: title,
    extra: extra,
    ghost: false,
    span: 12
  }, /*#__PURE__*/_react.default.createElement(Content, {
    extraContent: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)
  }, isEdit ? /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formArray: summaryData,
    name: "menuEdit"
  }) : renderContent())));
};

exports.PageHeadEdit = PageHeadEdit;
var _default = PageHeadEdit;
exports.default = _default;