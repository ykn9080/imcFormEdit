"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadEdit = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _lodash = _interopRequireDefault(require("lodash"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _index = require("config/index.js");

var _actions = require("actions");

var _findChildrens = require("components/functions/findChildrens");

var _PageHeadEdit = _interopRequireDefault(require("components/Edit/PageHeadEdit"));

var _Menu = _interopRequireDefault(require("components/Common/Menu"));

var _AppBar = _interopRequireDefault(require("components/Common/AppBar"));

var _antd = require("antd");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _icons = require("@ant-design/icons");

require("components/Common/Antd.css");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _dataUtil = require("components/functions/dataUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const HeadEdit = props => {
  let title = props.title;
  const forceUpdate = (0, _useForceUpdate.default)();
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let menu = (0, _reactRedux.useSelector)(state => state.global.menu); //const control = useSelector((state) => state.global.control);

  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  let login = (0, _reactRedux.useSelector)(state => state.global.login);
  let menuList = (0, _findChildrens.directChild)(tempMenu, "", "seq");
  const dispatch = (0, _reactRedux.useDispatch)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const history = (0, _reactRouterDom.useHistory)(); // const selectedmenu = (id) => {
  //   console.log(id, control, tempMenu);
  //   dispatch(globalVariable({ selectedKey: id }));
  //   $(".dropli").removeClass("selectli");
  //   $("#" + id).addClass("selectli");
  //   forceUpdate();
  // };
  // const findMenu = (tempMenu, pid) => {
  //   return tempMenu
  //     .filter((item, itemIndex) => item.pid === pid)
  //     .sort(function (a, b) {
  //       return a.seq < b.seq ? -1 : 1;
  //     });
  // };
  // const findControl = (tempMenu, id) => {
  //   const ctr = tempMenu.filter((item, itemIndex) => item.id === id);
  //   if (ctr) {
  //     return ctr[0].layout.sort(function (a, b) {
  //       return a.rowseq < b.rowseq ? -1 : 1;
  //     });
  //   }
  // };
  //click top menu and create treedata, having rootnode of clicked node
  //show sidebar anttree

  const selectedmenu = path => {
    const curr = _lodash.default.filter(tempMenu, function (o) {
      return o.path === path;
    });

    if (curr.length > 0) selectedKey = curr[0]._id;
    dispatch((0, _actions.globalVariable)({
      selectedKey: selectedKey
    }));
    const treeData = (0, _dataUtil.getNodeData)(tempMenu, selectedKey, "_id", "pid", "", "title");
    dispatch((0, _actions.globalVariable)({
      treeData: treeData
    })); // const sub = findMenu(tempMenu, id);
    // const ctr = findControl(tempMenu, id);
    // console.log("it's from index", sub);
    //dispatch(globalVariable({ control: ctr }));
    //dispatch(globalVariable({ subMenu: sub }));
    // markTab(id);
    // setForchg("");
  }; //click plus button on top and add new top level menu


  const addTopMenu = () => {
    if (_lodash.default.filter(menuList, function (o) {
      return o.path === "/edit/NewMenu";
    }).length > 0) return false;

    let obj = _lodash.default.maxBy(menuList, "seq");

    let type = "user";

    const findtype = _lodash.default.filter(menuList, function (o) {
      return o.hasOwnProperty("type");
    });

    if (findtype.length > 0) type = findtype[0].type;
    let newobj = {
      //_id: new ObjectID(),
      comp: login.comp,
      creator: login.user,
      desc: "",
      pid: "",
      type: type,
      seq: obj.seq + 1,
      title: "New Menu",
      layout: [],
      path: "/edit/NewMenu"
    };
    tempMenu.push(newobj);
    dispatch((0, _actions.globalVariable)({
      tempMenu: tempMenu
    }));
    forceUpdate();
  }; //save tempMenu to mongodb menu


  const saveHandler = () => {
    setLoading(true); //remove '/edit' from path

    tempMenu.map((a, i) => {
      return a.path = a.path.replace("/edit", "");
    }); //update tempMenu to menu

    dispatch((0, _actions.globalVariable)({
      menu: tempMenu
    }));
    let temp = (0, _cloneDeep.default)(tempMenu);
    let deleteLog = [],
        changeLog = []; //deleted obj find &  axios.delete

    menu.map((a, i) => {
      if (!_lodash.default.find(temp, {
        _id: a._id
      })) {
        console.log("deleted:", a);
        let config = {
          method: "delete",
          url: "".concat(_index.currentsetting.webserviceprefix, "menu/").concat(a._id)
        };
        return deleteLog.push(config);
      }

      return null;
    }); //loop axios put

    temp.map((a, i) => {
      if (a.pid === "") delete a.pid; //prevent mongodb error when ObjectId is ""

      let config = {
        method: "put",
        url: "".concat(_index.currentsetting.webserviceprefix, "menu/").concat(a._id),
        data: a
      }; //post execution

      if (!_lodash.default.find(menu, {
        _id: a._id
      })) {
        config = _objectSpread(_objectSpread({}, config), {}, {
          method: "post",
          url: "".concat(_index.currentsetting.webserviceprefix, "menu")
        });
        changeLog.push(config);
      } //find same _id object from original menu


      let obj = {};

      const array = _lodash.default.filter(menu, ["_id", a._id]);

      if (array.length === 1) obj = array[0];
      if (!_lodash.default.isEqual(a, obj)) changeLog.push(config);
      return null;
    });

    if (deleteLog.length > 0) {
      deleteLog.map((k, i) => {
        return (0, _axios.default)(k).then(r => {
          console.log(r);
        });
      });
    }

    changeLog.map((k, i) => {
      return (0, _axios.default)(k).then(r => {
        console.log(r);
      });
    });
    history.push("/");
  };

  const saveBtn = /*#__PURE__*/_react.default.createElement(_antd.Button, {
    ghost: true,
    onClick: saveHandler
  }, "Save");

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    title: "PageBuild",
    right: saveBtn
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, null, /*#__PURE__*/_react.default.createElement(_Menu.default, {
    menuList: menuList,
    handleClick: selectedmenu,
    id: "editMenu"
  })), /*#__PURE__*/_react.default.createElement(_antd.Col, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    color: "inherit",
    "aria-label": "menu"
  }, /*#__PURE__*/_react.default.createElement(_icons.PlusSquareOutlined, {
    style: {
      fontSize: 18,
      paddingTop: 3
    },
    onClick: addTopMenu
  }))))), /*#__PURE__*/_react.default.createElement(_PageHeadEdit.default, {
    title: title
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: loading,
    size: "large"
  }));
};

exports.HeadEdit = HeadEdit;