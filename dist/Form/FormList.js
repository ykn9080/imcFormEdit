"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _axios = _interopRequireDefault(require("axios"));

var _index = require("config/index.js");

var _List = _interopRequireDefault(require("components/Common/List"));

var _antd = require("antd");

var _PageHeader = _interopRequireDefault(require("components/Common/PageHeader"));

var _icons = require("@ant-design/icons");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FormList = props => {
  let title = props.type,
      titleUpper = "";
  const [loading, setLoading] = (0, _react.useState)(false);
  const [listData, setListData] = (0, _react.useState)([]);
  const forceUpdate = (0, _useForceUpdate.default)();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    setLoading(true);

    _axios.default.get("".concat(_index.currentsetting.webserviceprefix, "bootform/any?type=").concat(props.type)).then(response => {
      let imsiData1 = [];
      response.data.map((k, i) => {
        return imsiData1.push({
          _id: k._id,
          data: k.data,
          name: k.name,
          description: k.desc,
          titleHandler: true,
          href: {
            pathname: "/admin/control/".concat(props.type, "/").concat(props.type, "view"),
            search: "?_id=".concat(k._id),
            state: k
          },
          avatar: {
            size: 24,
            style: {
              backgroundColor: "#87d068"
            },
            shape: "square",
            icon: /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null)
          },
          desc: k.desc
        });
      });
      dispatch((0, _actions.globalVariable)({
        listData: imsiData1
      }));
      setListData(imsiData1);
      setLoading(false);
    });
  }, [props.type]);

  const createHandler = () => {
    dispatch((0, _actions.globalVariable)({
      currentData: ""
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: "imsi"
    }));
    history.push("/admin/control/".concat(props.type, "/").concat(props.type, "edit"));
  };

  const editHandler = item => {
    dispatch((0, _actions.globalVariable)({
      currentData: item
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: item._id
    }));
    history.push("/admin/control/".concat(props.type, "/").concat(props.type, "edit"));
  };

  const deleteHandler = item => {
    let config = {
      method: "delete",
      url: "".concat(_index.currentsetting.webserviceprefix, "bootform/").concat(item._id)
    };
    (0, _axios.default)(config).then(r => {
      _lodash.default.remove(listData, function (currentObject) {
        return currentObject._id === item._id;
      });

      setListData(listData);
      localStorage.removeItem("imsi");
      dispatch((0, _actions.globalVariable)({
        currentData: ""
      }));
      forceUpdate();
    });
  };

  let propSetting = {};

  if (props.selectHandler) {
    propSetting = {
      selectHandler: props.selectHandler
    };
  }

  const footer = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "ant design"), " footer part");

  const pagination = {
    onChange: page => {},
    pageSize: 25
  };
  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Create New",
    key: "1create"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.FileAddOutlined, null),
    onClick: createHandler
  }))];
  if (title) titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: titleUpper,
    extra: extra
  }), /*#__PURE__*/_react.default.createElement(_List.default, _extends({
    listData: listData,
    loading: loading,
    editHandler: editHandler,
    deleteHandler: deleteHandler,
    size: "small",
    layout: "horizontal",
    footer: footer,
    pagination: pagination
  }, propSetting)));
};

var _default = FormList;
exports.default = _default;