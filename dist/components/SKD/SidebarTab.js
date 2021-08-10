"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

require("react-sortable-tree/style.css");

require("antd/dist/antd.css");

var _CardList = _interopRequireDefault(require("components/SKD/CardList"));

require("./SKD.css");

var _NavAnt = _interopRequireDefault(require("components/Common/NavAnt"));

var _antd2 = require("antd");

var _index = require("config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TextArea
} = _antd2.Input;

const SidebarTab = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();
  let graphdata = (0, _reactRedux.useSelector)(state => state.global.graphdata);
  const initform = {
    setting: {
      formItemLayout: {
        labelCol: {
          span: 2
        },
        wrapperCol: {
          span: 22
        }
      },
      layout: "horizontal",
      size: "middle",
      initialValues: {
        name: "",
        password: "",
        date: null
      },
      onFinish: "{values => {console.log(values);};}",
      formColumn: 1
    },
    list: [{
      label: "Name",
      name: "name",
      type: "input",
      seq: 0
    }, {
      label: "Pass",
      name: "password",
      type: "input.password",
      rules: [{
        required: false,
        message: "hello"
      }],
      seq: 2,
      formColumn: 2,
      layout: "inline",
      formItemLayout: null,
      tailLayout: null,
      editable: true
    }, {
      label: "Date",
      name: "date",
      type: "datepicker",
      rules: [{
        type: "object",
        required: true,
        message: "Please select time!"
      }],
      seq: 1
    }, {
      label: "Type",
      name: "type",
      type: "select",
      optionArray: [{
        text: "ss",
        value: "ss"
      }, {
        text: "ss2",
        value: "ss1"
      }],
      seq: 3
    }, {
      label: "Pass12345",
      name: "first col",
      type: "input",
      seq: 10,
      placeholder: "pls insert"
    }, {
      type: "button",
      seq: 1000,
      tailLayout: {
        wrapperCol: {
          offset: 8,
          span: 16
        }
      },
      btnArr: [{
        btnLabel: "Submit",
        btnStyle: "secondary",
        htmlType: "submit",
        seq: 0
      }, {
        btnLabel: "Cancel",
        btnStyle: "primary",
        htmlType: "button",
        seq: 1
      }]
    }]
  };
  const [formdt, setFormdt] = (0, _react.useState)(initform);
  const [param, setParam] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    _axios.default.get("".concat(_index.currentsetting.webserviceprefix, "bootform/5eac0e7868c258495433823f")).then(response => {
      setFormdt(response.data.data);
      console.log(response.data);
    });
  }, [graphdata]);

  const runAxios = () => {
    let newarr = [],
        obj = {};
    graphdata.edges.map((k, i) => {
      return obj = {}, obj.src = k.from, obj.tgt = k.to, obj.wgt = k.value, newarr.push(obj);
    });

    let postdata = _objectSpread({
      matrixes: [_objectSpread({
        edgelist: newarr
      }, JSON.parse(param.matrixparam))]
    }, JSON.parse(param.otherparam));

    let config = {
      method: "post",
      url: "".concat(param.url),
      data: postdata
    };
    (0, _axios.default)(config).then(r => console.log(r.data));
  };

  const AntForm = () => {
    const onFinish = values => {
      console.log("Success:", values);
      setParam(values);
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return /*#__PURE__*/_react.default.createElement(_antd2.Form, {
      name: "basic",
      onFinish: onFinish,
      onFinishFailed: onFinishFailed
    }, /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, {
      name: "matrixparam"
    }, /*#__PURE__*/_react.default.createElement(TextArea, {
      rows: 5,
      placeholder: "param inside matrix"
    })), /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, {
      name: "otherparam"
    }, /*#__PURE__*/_react.default.createElement(TextArea, {
      rows: 5,
      placeholder: "parameter input"
    })), /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, {
      label: "url",
      name: "url"
    }, /*#__PURE__*/_react.default.createElement(_antd2.Input, {
      placeholder: "api url"
    })), /*#__PURE__*/_react.default.createElement(_antd2.Form.Item, null, /*#__PURE__*/_react.default.createElement(_antd2.Button, {
      type: "primary",
      htmlType: "submit"
    }, "Submit")));
  };

  const ctrList = [{
    _id: "1",
    ctrid: "",
    type: "",
    seq: 0,
    content: /*#__PURE__*/_react.default.createElement("h3", null, "test1"),
    size: 12
  }, {
    _id: "2",
    ctrid: "",
    type: "",
    seq: 1,
    content: /*#__PURE__*/_react.default.createElement("h3", null, "test1"),
    size: 12
  } // {
  //   _id: "3",
  //   ctrid: "",
  //   type: "",
  //   seq: 2,
  //   size: 12,
  // },
  ];
  const tabarr = [{
    title: "Summary",
    content: // <TreeAnt
    //   onSelect={onSelect}
    //   contextItems={contextItems}
    //   contextCallback={contextCallback}
    //   {...setting}
    //   id={"_id"}
    // />
    "this is summary area"
  }, {
    title: "Analysis",
    content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CardList.default, {
      ctrList: ctrList,
      addtext: "+ Add New Analysis",
      addNew: () => _addNew("model?from=" + location.pathname + location.search)
    }), /*#__PURE__*/_react.default.createElement(AntForm, null))
  }, {
    title: "Widget",
    content: /*#__PURE__*/_react.default.createElement(_CardList.default, {
      ctrList: ctrList,
      addtext: "+ Add New Widget",
      addNew: () => _addNew("widget?from=" + location.pathname + location.search)
    })
  }];
  const [tabb, setTabb] = (0, _react.useState)(tabarr);

  const _addNew = type => {
    history.push("/".concat(type));
  };

  console.log("formdt:", formdt);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavAnt.default, {
    tab: tabb
  }), /*#__PURE__*/_react.default.createElement(_antd2.Button, {
    onClick: runAxios
  }, "run"));
};

var _default = SidebarTab;
exports.default = _default;