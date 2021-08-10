"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _materialUiConfirm = require("material-ui-confirm");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ListGen = props => {
  let title = props.type,
      titleUpper = "",
      dataformat;
  const confirm = (0, _materialUiConfirm.useConfirm)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const [listData, setListData] = (0, _react.useState)([]);
  const forceUpdate = (0, _useForceUpdate.default)();
  const history = (0, _reactRouterDom.useHistory)();
  const dispatch = (0, _reactRedux.useDispatch)();

  let avataricon = /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, null);

  if (props.avataricon) avataricon = props.avataricon;
  if (props.dataformat) dataformat = props.dataformat;

  const datamapping = k => {
    let data = {
      _id: k._id,
      data: k.data && k.data,
      name: k.title,
      description: k.desc,
      titleHandler: true,
      href: {
        pathname: "/".concat(props.url, "/view"),
        search: "?_id=".concat(k._id),
        state: k
      },
      avatar: {
        size: 32,
        style: {
          backgroundColor: "#87d068"
        },
        shape: "square",
        icon: {
          avataricon
        }
      },
      desc: k.desc
    };
    let obj = {
      href: {
        pathname: "/".concat(props.url, "/view"),
        search: "?_id=".concat(k._id),
        state: k
      },
      avatar: {
        size: 32,
        style: {
          backgroundColor: "#1890FF"
        },
        shape: "square",
        icon: /*#__PURE__*/_react.default.createElement(_icons.SisternodeOutlined, null)
      }
    };

    if (dataformat) {
      dataformat.map((a, j) => {
        obj[a] = k[a];
        if (a === "title") return obj.name = k[a];
        if (a === "desc") return obj.description = k[a];
      });
      data = obj;
    }

    return data;
  };

  (0, _react.useEffect)(() => {
    setLoading(true);

    _axios.default.get("".concat(_index.currentsetting.webserviceprefix).concat(props.url)).then(response => {
      let imsiData1 = [];
      response.data.map((k, i) => {
        return imsiData1.push(datamapping(k));
      });
      setListData(imsiData1);
      dispatch((0, _actions.globalVariable)({
        listData: imsiData1
      }));
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
    history.push("/".concat(props.url, "/edit"));
  };

  const editHandler = item => {
    dispatch((0, _actions.globalVariable)({
      currentData: item
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: item._id
    }));
    history.push("/".concat(props.url, "/edit"));
  };

  const selectHandler = item => {
    alert("selected", item.id);
    dispatch((0, _actions.globalVariable)({
      currentData: item
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: item._id
    }));
    history.push("/".concat(props.url, "/edit"));
  };

  const selectHandler1 = item => {
    dispatch((0, _actions.globalVariable)({
      currentData: item
    }));
    dispatch((0, _actions.globalVariable)({
      selectedKey: item._id
    }));
    history.push({
      pathname: "/project/view",
      search: "?_id=5ef99d0b48fbce0ff8541448",
      state: {
        detail: "response.data"
      }
    });
    history.go();
  };

  const deleteHandler = item => {
    let config = {
      method: "delete",
      url: "".concat(_index.currentsetting.webserviceprefix).concat(props.url, "/").concat(item._id)
    };
    (0, _axios.default)(config).then(r => {
      _lodash.default.remove(listData, function (currentObject) {
        return currentObject._id === item._id;
      });

      dispatch((0, _actions.globalVariable)({
        listData: listData
      }));
      setListData(listData);
      forceUpdate();
    });
  };

  const footer = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "NetMiner365"));

  let pagination = {
    onChange: page => {
      console.log(page);
    },
    pageSize: 5
  };
  if (props.pagination) pagination = props.pagination;
  const extra = [/*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: "Create New",
    key: "1create"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    shape: "circle",
    icon: /*#__PURE__*/_react.default.createElement(_icons.FileAddOutlined, null),
    onClick: createHandler
  }))];
  let setting = {};
  setting = {
    editHandler,
    deleteHandler
  };
  if (props.return) setting = _objectSpread(_objectSpread({}, setting), {}, {
    selectHandler: selectHandler1
  });
  if (title) titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    title: titleUpper,
    extra: extra
  }), /*#__PURE__*/_react.default.createElement(_List.default, _extends({
    listData: listData,
    loading: loading // editHandler={editHandler}
    // deleteHandler={deleteHandler}
    ,
    size: "small",
    layout: "horizontal",
    footer: footer,
    pagination: pagination
  }, setting)));
};

var _default = ListGen;
exports.default = _default;