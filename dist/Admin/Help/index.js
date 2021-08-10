"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.helpSet = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

var _index = require("config/index.js");

var _actions = require("actions");

var _antd = require("antd");

var _TreeAnt = _interopRequireDefault(require("components/Common/TreeAnt"));

var _AntFormDisplay = _interopRequireDefault(require("Form/AntFormDisplay"));

var _Common_make = require("fromImc/Common_make");

var _view = _interopRequireWildcard(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const helpSet = qry => {
  //example code
  //const his=HelpSet({query:"home",tag:"new"})
  //history.push(his)
  const his = {
    pathname: "/open/help",
    search: "?query=".concat(qry.query, "&tag=").concat(qry.tag)
  };
  return his;
};

exports.helpSet = helpSet;

const Help = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const dispatch = (0, _reactRedux.useDispatch)();
  const [selcontent, setSelcontent] = (0, _react.useState)();
  const [node, setNode] = (0, _react.useState)();
  const [initialValues, setInitialValues] = (0, _react.useState)();
  const [patchlist, setPatchlist] = (0, _react.useState)();
  const [reload, setReload] = (0, _react.useState)(false);
  const [edit, setEdit] = (0, _react.useState)(false);
  const [newkey, setNewkey] = (0, _react.useState)();
  const [selected_id, setSelected_id] = (0, _react.useState)();
  let helpcontent = (0, _reactRedux.useSelector)(state => state.global.help);
  let helpLink = (0, _reactRedux.useSelector)(state => state.global.helpLink);
  (0, _react.useEffect)(() => {
    //help menu get from server
    if (!helpcontent | reload) {
      _axios.default.get("".concat(_index.currentsetting.webserviceprefix, "help")).then(res => {
        dispatch((0, _actions.globalVariable)({
          help: res.data
        }));
        dispatch((0, _actions.globalVariable)({
          treeData: res.data
        }));
        locationFind(res.data);
        setReload(false); //setSelected_id(null);
      });
    }
  }, [reload]);
  (0, _react.useEffect)(() => {
    dispatch((0, _actions.globalVariable)({
      helpLink: null
    }));
    if (props.edit) setEdit(props.edit);
    setTimeout(() => {
      (0, _jquery.default)(".ant-tree-treenode").css("padding", 0);
    }, 500);
  }, []);
  (0, _react.useEffect)(() => {
    locationFind(helpcontent);
  }, [location.pathname, helpLink]);
  const treeData = [{
    title: "parent 1",
    key: "0-0",
    children: [{
      title: "parent 1-0",
      key: "0-0-0",
      disabled: true,
      children: [{
        title: "leaf",
        key: "0-0-0-0",
        disableCheckbox: true
      }, {
        title: "leaf",
        key: "0-0-0-1"
      }]
    }, {
      title: "parent 1-1",
      key: "0-0-1",
      children: [{
        title: /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: "#1890ff"
          }
        }, "sss"),
        key: "0-0-1-0"
      }]
    }]
  }];

  const locationFind = helplist => {
    // const queryParams = new URLSearchParams(location.search);
    // const qry = queryParams.get("query");
    if (!helpLink) helpLink = location.pathname;
    console.log(helpLink);
    if (!helplist) return;

    const curhelp = _lodash.default.find(helplist, o => {
      let linkarr;
      if (o.link) linkarr = o.link.split(";");
      if (linkarr) return linkarr.indexOf(helpLink) > -1;
    });

    if (curhelp) {
      onSelect(curhelp);
      setSelected_id(curhelp._id);
    }
  };

  let contextItems = [{
    label: "New"
  }, {
    label: "Edit"
  }, {
    label: "Delete"
  }];

  const contextCallback = (index, node) => {
    if (node && typeof node === "string") node = JSON.parse(node);
    setNode(node);
    contextAction(contextItems[index].label, node);
  };

  const contextAction = (type, node) => {
    let find;

    switch (type) {
      default:
        return null;

      case "New":
        let pid1 = null;
        if (node) pid1 = node._id;
        const add = {
          title: "Newnode",
          pid: pid1,
          content: ""
        };
        setNewkey(pid1);
        helpcontent.push(add);
        dispatch((0, _actions.globalVariable)({
          help: helpcontent
        }));
        dispatch((0, _actions.globalVariable)({
          treeData: helpcontent
        }));
        setNode(add);
        setInitialValues({
          title: "Newnode",
          desc: "",
          link: "",
          tag: "",
          type: "",
          related: null
        });
        setSelcontent("");
        break;

      case "Edit":
        find = _lodash.default.find(helpcontent, o => {
          return o._id === node._id;
        });

        if (find) {
          onSelect(find);
        }

        break;

      case "Delete":
        //chk if node has children, if any can't delete
        find = _lodash.default.filter(helpcontent, o => {
          return o.pid === node._id;
        });

        if (find && find.length > 0) {
          //error msg
          _antd.message.error("Fail to delete!! Please children first");
        } else {
          const opt = {
            title: "Delete?"
          };
          (0, _Common_make.sweetmsgconfirm)(() => {
            helpcontent.map((k, i) => {
              if (k._id === node._id) helpcontent.splice(i, 1);
              return null;
            });
            dispatch((0, _actions.globalVariable)({
              help: helpcontent
            }));
            if (node._id) _axios.default.delete("".concat(_index.currentsetting.webserviceprefix, "help/").concat(node._id)).then(rsp => {
              setReload(true);
            });
          }, opt);
        }

        break;
    }
  };

  const onSelect = val => {
    const summary = {
      _id: val._id,
      pid: val.pid,
      title: val.title,
      desc: val.desc,
      link: val.link,
      tag: val.tag,
      type: val.type,
      related: val.related
    };
    setInitialValues(summary);
    if (val.contents) setSelcontent(val.contents);
    setNode(summary);
  };

  const onSummaryChange = (changedValues, allValues) => {
    localStorage.removeItem("persist.root");
    localStorage.setItem("helpsummray", JSON.stringify(allValues));
  };

  const onSave = contents => {
    let val1 = {},
        val2;
    let local = localStorage.getItem("helpsummray");

    if (local) {
      local = JSON.parse(local);
      val1 = {
        title: local.title,
        desc: local.desc,
        link: local.link,
        tag: local.tag,
        type: local.type,
        related: local.related,
        contents: contents
      };
    }

    val2 = _objectSpread(_objectSpread({}, node), {}, {
      contents: contents
    }, val1);
    let config = {
      method: "post",
      url: "".concat(_index.currentsetting.webserviceprefix, "help"),
      data: _objectSpread(_objectSpread({}, val2), {}, {
        pid: node.pid
      })
    };

    if (node._id) {
      config.method = "put";
      config.url += "/" + node._id;
    }

    (0, _axios.default)(config).then(r => {
      _antd.message.info("File Saved");

      helpcontent.map((k, i) => {
        if (k._id === node._id) helpcontent.splice(i, 1, config.data);
        return null;
      });
      dispatch((0, _actions.globalVariable)({
        help: helpcontent
      }));
      setReload(true);
    });
    localStorage.removeItem("helpsummray");
  };

  const onDrop = dropobj => {
    if (!dropobj) return;
    let config = {
      method: "put",
      url: "".concat(_index.currentsetting.webserviceprefix, "help/").concat(dropobj._id),
      data: dropobj
    };
    (0, _axios.default)(config).then(r => {
      _antd.message.info("File Updated");

      setReload(true);
    });
  };

  let setting = {};

  if (edit === true) {
    setting = {
      contextItems: contextItems,
      contextCallback: contextCallback
    };
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 10,
      width: "97%"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 5
  }, helpcontent && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeAnt.default, _extends({
    treeData: helpcontent,
    treedatatype: "flat",
    treeProps: {
      root: null
    },
    onSelect: onSelect,
    search: true,
    newkey: newkey,
    selected_id: selected_id,
    edit: edit,
    onDrop: onDrop
  }, setting)))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 19
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginRight: 5,
      marginBottom: 20
    }
  }, edit ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      border: "solid #E5E5E5 1px",
      marginBottom: "5px",
      padding: "10px 5px 0 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_AntFormDisplay.default, {
    formid: "5f7180353f15603130abe066",
    onValuesChange: onSummaryChange,
    patchlist: patchlist,
    initialValues: initialValues
  }))) : /*#__PURE__*/_react.default.createElement(_view.default, {
    initialValues: initialValues
  }), !edit && /*#__PURE__*/_react.default.createElement(_view.ViewTail, {
    initialValues: initialValues
  })))), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => {
      console.log(helpcontent, treeData, selcontent);
    }
  }, "helpcontent,treedata"));
};

var _default = Help;
exports.default = _default;