"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _axios = _interopRequireDefault(require("axios"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _index = require("config/index.js");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

var _AntFormBuild = _interopRequireDefault(require("Form/AntFormBuild"));

var _AntFormDisplay = _interopRequireDefault(require("Form/AntFormDisplay"));

require("components/Common/Antd.css");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _DataEdit = _interopRequireDefault(require("Admin/Data/DataEdit"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Alert = _interopRequireDefault(require("@material-ui/lab/Alert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TabPane
} = _antd.Tabs;

const TableEdit = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const forceUpdate = (0, _useForceUpdate.default)();
  let iconSpin = {},
      btnDisabled = {}; //for snackbar open/close

  const [open, setOpen] = _react.default.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let formdt1 = {
    data: {
      setting: {
        formItemLayout: {
          labelCol: {
            span: 2
          },
          wrapperCol: {
            span: 22
          }
        },
        layout: "inline",
        formColumn: 2,
        size: "middle" //,onFinish:{values => {console.log(values);};}}

      },
      list: []
    }
  };
  let formdt = (0, _reactRedux.useSelector)(state => state.global.currentData);

  if (formdt === "") {
    formdt = formdt1;
    dispatch((0, _actions.globalVariable)({
      currentData: formdt
    }));
  }

  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey); //리로드 귀찮아서 해둰거 개발완료시 지울것!!!!!!!!!!!!!!!!!
  // if (formdt === "") {
  //   formdt = JSON.parse(localStorage.getItem("imsi"));
  //   dispatch(globalVariable({ currentData: formdt }));
  // }

  console.log("formdt", formdt);
  let initialValue = {};
  let summaryData = {
    setting: {
      formItemLayout: {
        labelCol: {
          span: 2
        },
        wrapperCol: {
          span: 22
        }
      },
      layout: "vertical",
      formColumn: 2,
      size: "small",
      initialValues: _objectSpread({}, {
        initialValue
      }),
      // onFieldsChange: (changedFields, allFields) => {
      //   const cf1 = changedFields[0];
      //   if (["title", "desc"].indexOf(cf1.name[0]) === -1) {
      //     formdt[cf1.name[0]] = cf1.value;
      //     dispatch(globalVariable({ currentData: formdt }));
      //     console.log("field", changedFields, allFields);
      //   }
      // },
      onValuesChange: (changedValues, allValues) => {
        formdt.name = allValues.name;
        formdt.desc = allValues.desc;
        let sett = formdt.data.setting;
        sett.formItemLayout.labelCol.span = allValues.labelwidth;
        sett.formItemLayout.wrapperCol.span = 24 - allValues.labelwidth;
        sett.formColumn = allValues.column;
        sett.layout = allValues.layout;
        sett.size = allValues.size;
        dispatch((0, _actions.globalVariable)({
          currentData: formdt
        }));
        if (["name", "desc"].indexOf(Object.keys(changedValues)[0]) === -1) forceUpdate();
      },
      onFinish: values => {
        console.log("Received values of form: ", values);
      },
      onFinishFailed: (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate);
      }
    },
    list: [{
      label: "Title",
      name: "name",
      type: "input",
      seq: 0
    }, {
      label: "Desc",
      name: "desc",
      type: "input.textarea",
      seq: 1
    }, {
      label: "Column",
      name: "column",
      type: "select",
      defaultValue: 1,
      optionArray: [{
        text: "1",
        value: 1
      }, {
        text: "2",
        value: 2
      }, {
        text: "3",
        value: 3
      }],
      seq: 2
    }, {
      label: "Layout",
      name: "layout",
      type: "radio.button",
      defaultValue: "horizontal",
      optionArray: [{
        text: "horizontal",
        value: "horizontal"
      }, {
        text: "vertical",
        value: "vertical"
      }, {
        text: "inline",
        value: "inline"
      }],
      seq: 3
    }, {
      label: "Label Width",
      name: "labelwidth",
      type: "slider",
      min: 0,
      max: 24,
      defaultValue: 6,
      marks: {
        0: 0,
        2: 2,
        4: 4,
        6: 6,
        8: 8,
        10: 10,
        12: 12,
        14: 14,
        16: 16,
        18: 18,
        20: 20,
        22: 22,
        24: 24
      },
      seq: 4
    }, {
      label: "Size",
      name: "size",
      type: "radio.button",
      defaultValue: "middle",
      optionArray: [{
        text: "small",
        value: "small"
      }, {
        text: "middle",
        value: "middle"
      }, {
        text: "large",
        value: "large"
      }],
      seq: 5
    }]
  };

  const updateInitialValues = (summaryData, formdt) => {
    const initialValue = {
      name: formdt.name,
      desc: formdt.desc,
      column: formdt.data.setting.formColumn,
      labelwidth: formdt.data.setting.formItemLayout.labelCol.span,
      layout: formdt.data.setting.layout,
      size: formdt.data.setting.size
    };
    summaryData.setting.initialValues = initialValue;
    return summaryData;
  };

  if (formdt != "") summaryData = updateInitialValues(summaryData, formdt);
  const [sumdt, setSumdt] = (0, _react.useState)(summaryData);
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      formEdit: true
    })); //temporary use for editing phase only for
    //initialValue setting, pls delete when save

    formdt.data.setting = _objectSpread(_objectSpread({}, formdt.data.setting), {}, {
      onValuesChange: (changedValues, allValues) => {
        formdt.data.setting.initialValues = _objectSpread(_objectSpread({}, formdt.data.setting.initialValues), changedValues);
        dispatch((0, _actions.globalVariable)({
          currentData: formdt
        }));
      }
    });
    setSumdt(updateInitialValues(sumdt, formdt));
  }, [formdt]);

  if (typeof formdt._id === "undefined") {
    // iconSpin = { spin: true };
    btnDisabled = {
      disabled: true
    };
  }

  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Save",
    key: "1save"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.SaveOutlined, iconSpin),
    onClick: () => {
      console.log(sumdt, formdt._id);

      _antd.message.config({
        top: 100,
        duration: 3,
        maxCount: 3,
        rtl: true
      }); // //remove onValuesChange
      //inorderto set initialValues, append onValuesChange eventhandler
      //must remove onValuesChange when to save to database


      delete formdt.data.setting.onValuesChange;
      formdt.type = "form";
      let config = {
        method: "put",
        url: "".concat(_index.currentsetting.webserviceprefix, "bootform/").concat(formdt._id),
        data: formdt
      };
      if (typeof formdt._id === "undefined") config = _objectSpread(_objectSpread({}, config), {
        method: "post",
        url: "".concat(_index.currentsetting.webserviceprefix, "bootform")
      });
      (0, _axios.default)(config).then(r => _antd.message.info("File Saved"));
    }
  })), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Save As",
    key: "1saveas"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, btnDisabled, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.CopyOutlined, null),
    onClick: () => {
      //remove onValuesChange
      let curr = (0, _cloneDeep.default)(formdt);
      delete curr.data.setting.onValuesChange;
      delete curr._id;
      curr.name += " Copy";
      sumdt.setting.initialValues.name += " Copy";
      curr.data.setting.initialValues = sumdt.setting.initialValues;
      setOpen(true);
      dispatch((0, _actions.globalVariable)({
        currentData: curr
      }));
    }
  }))), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "View",
    key: "2view"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, _extends({}, btnDisabled, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.DesktopOutlined, null),
    onClick: () => history.push("/admin/control/form/formview")
  })))];

  const SaveAsCancel = () => {
    formdt._id = selectedKey;
    formdt.name = formdt.name.replace(" Copy", "");
    dispatch((0, _actions.globalVariable)({
      currentData: formdt
    }));
    setOpen(false);
  };

  const actbutton = /*#__PURE__*/_react.default.createElement(_antd.Button, {
    color: "primary",
    onClick: () => {
      dispatch((0, _actions.globalVariable)({
        openDialog: true
      }));
    }
  }, "Save As");

  function Alert(props) {
    return /*#__PURE__*/_react.default.createElement(_Alert.default, _extends({
      elevation: 6,
      variant: "filled"
    }, props));
  }

  const snack = /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    open: open,
    autoHideDuration: 10000,
    onClose: handleClose,
    message: "Click save button to finish!!!",
    action: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      color: "secondary",
      size: "small",
      onClick: SaveAsCancel
    }, "Undo"), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      size: "small",
      "aria-label": "close",
      color: "inherit",
      onClick: handleClose
    }, /*#__PURE__*/_react.default.createElement(_Close.default, {
      fontSize: "small"
    })))
  });

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "site-page-header-ghost-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: "TableEdit",
    onBack: true,
    extra: extra,
    ghost: false
  }, /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    defaultActiveKey: "1",
    tabPosition: "bottom"
  }, /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Display",
    key: "1"
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formArray: sumdt,
    name: "fsummary"
  })), /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "Data",
    key: "2"
  }, /*#__PURE__*/_react.default.createElement(_DataEdit.default, null))))), /*#__PURE__*/_react.default.createElement(_AntFormBuild.default, {
    formdt: formdt
  }), snack);
};

var _default = TableEdit;
exports.default = _default;