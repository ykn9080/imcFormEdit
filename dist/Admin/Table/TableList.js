"use strict";

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

const FormList = () => {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [listData, setListData] = (0, _react.useState)([]);
  const forceUpdate = (0, _useForceUpdate.default)();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    setLoading(true);

    _axios.default.get(_index.currentsetting.webserviceprefix + "bootform/any?type=table").then(response => {
      let imsiData1 = [];
      response.data.map((k, i) => {
        imsiData1.push({
          _id: k._id,
          id: k.id,
          data: k.data,
          name: k.name,
          description: k.desc,
          titleHandler: true,
          href: {
            pathname: "/admin/control/table/tableview",
            search: "?_id=".concat(k._id),
            state: k
          },
          avatar: {
            size: 32,
            style: {
              backgroundColor: "#87d068"
            },
            shape: "square",
            icon: /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null)
          },
          desc: k.desc
        });
      });
      setListData(imsiData1);
      dispatch((0, _actions.globalVariable)({
        listData: imsiData1
      }));
      console.log(listData);
      setLoading(false);
    });
  }, []);

  const createHandler = () => {
    dispatch((0, _actions.globalVariable)({
      currentData: ""
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: ""
    }));
    history.push("/admin/control/table/tableedit");
  };

  const editHandler = item => {
    dispatch((0, _actions.globalVariable)({
      currentData: item
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: item._id
    }));
    history.push("/admin/control/table/tabledit");
  };

  const deleteHandler = item => {
    let config = {
      method: "delete",
      url: "".concat(_index.currentsetting.webserviceprefix, "bootform/").concat(item._id)
    };
    (0, _axios.default)(config).then(r => {
      console.log(r);
      console.log(listData);

      _lodash.default.remove(listData, function (currentObject) {
        return currentObject._id === item._id;
      });

      console.log(listData);
      setListData(listData);
      localStorage.removeItem("imsi");
      dispatch((0, _actions.globalVariable)({
        currentData: ""
      }));
      forceUpdate();
    });
  };

  const footer = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "ant design"), " footer part");

  const pagination = {
    onChange: page => {
      console.log(page);
    },
    pageSize: 5
  };
  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Create New",
    key: "1create"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.FileAddOutlined, null),
    onClick: createHandler
  }))];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: "Table",
    extra: extra
  }), /*#__PURE__*/_react.default.createElement(_List.default, {
    listData: listData,
    loading: loading,
    editHandler: editHandler,
    deleteHandler: deleteHandler,
    size: "small",
    layout: "vertical" // footer={footer}
    ,
    pagination: pagination
  }));
};

var _default = FormList;
exports.default = _default;