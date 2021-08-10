"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sortable = void 0;

require("core-js/modules/es.array.sort.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _styles = require("@material-ui/core/styles");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

require("jquery-ui-bundle");

require("jquery-ui-bundle/jquery-ui.min.css");

require("./Head.css");

var _findChildrens = require("components/functions/findChildrens");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _AddCircle = _interopRequireDefault(require("@material-ui/icons/AddCircle"));

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _bson = require("bson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//_id maker for MongoDB
const useStyles = (0, _styles.makeStyles)(theme => ({
  menuButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Sortable = props => {
  let tempMenu = (0, _reactRedux.useSelector)(state => state.global.tempMenu);
  let keyval = props.pid;
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  let login = (0, _reactRedux.useSelector)(state => state.global.login);
  const dispatch = (0, _reactRedux.useDispatch)();
  const forceUpdate = (0, _useForceUpdate.default)();
  (0, _react.useEffect)(() => {
    //$(refs.sortable);
    const $node = (0, _jquery.default)("#ulSortable");
    $node.sortable({
      opacity: props.opacity,
      // Get the incoming onChange function
      // and invoke it on the Sortable `change` event
      drop: function drop(event, ui) {
        props.onChange(event, ui);
      },
      change: (event, ui) => props.onChange(event, ui)
    });
    return () => {
      $node.sortable();
    };
    keyval = selectedKey;
  }, [selectedKey]);
  const classes = useStyles();
  let menuList = // directChild(tempMenu, keyval, "seq");
  tempMenu.filter((subitem, itemIndex) => subitem.pid === keyval).sort(function (a, b) {
    return a["seq"] < b["seq"] ? -1 : 1;
  });

  const addTopMenu = () => {
    let obj = _lodash.default.maxBy(menuList, "seq");

    let type = "user";

    const findtype = _lodash.default.filter(menuList, function (o) {
      return o.hasOwnProperty("type");
    });

    if (findtype.length > 0) type = findtype[0].type;
    let newobj = {
      _id: new _bson.ObjectID(),
      comp: login.comp,
      creator: login.user,
      desc: "",
      pid: "",
      type: type,
      seq: obj.seq + 1,
      title: "New Menu",
      layout: []
    };
    tempMenu.push(newobj);
    dispatch((0, _actions.globalVariable)({
      tempMenu: tempMenu
    }));
    forceUpdate();
  };

  return /*#__PURE__*/_react.default.createElement("ul", {
    className: props.ulclass,
    id: "ulSortable"
  }, menuList ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(DropList, {
    menuList: menuList,
    tempMenu: tempMenu,
    depth: props.depth,
    liclass: props.liclass,
    selectedmenu: props.selectedmenu
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    "aria-label": "menu",
    onClick: addTopMenu
  }, /*#__PURE__*/_react.default.createElement(_AddCircle.default, null))) : /*#__PURE__*/_react.default.createElement("li", {
    className: ["ui-state-default"],
    onClick: () => props.selectedmenu(""),
    key: findmaxnum
  }, "new menu"));
};

exports.Sortable = Sortable;

const DropList = props => {
  return props.menuList.map((item, i) => {
    let selectli = "";
    if (i === 0) selectli = "selectli";
    let delicon = delbtn(item._id);
    let moduleicon = "";
    let subdata = [];
    const subMenu = (0, _findChildrens.directChild)(props.tempMenu, item._id, "seq");

    const li = /*#__PURE__*/_react.default.createElement("li", {
      key: "droplist" + item._id,
      id: item._id,
      className: [props.liclass, selectli, "ui-state-default"].join(" "),
      onClick: () => props.selectedmenu(item._id)
    }, item.title, delicon);

    return subMenu.length > 0 && props.depth === "all" ? /*#__PURE__*/_react.default.createElement("li", {
      key: "droplist" + item._id,
      id: item._id,
      className: [props.liclass, selectli, "ui-state-default"].join(" "),
      onClick: () => props.selectedmenu(item._id)
    }, item.title, /*#__PURE__*/_react.default.createElement(NestedList, {
      data: subMenu,
      tempMenu: props.tempMenu
    }), delicon) : li;
  });
};

const markTab = id => {
  (0, _jquery.default)(".dropli").removeClass("selectli");
  (0, _jquery.default)("#" + id).addClass("selectli");
};

const NestedList = props => {
  return props.data ? /*#__PURE__*/_react.default.createElement("ul", null, props.data.map((item, i) => {
    let delicon = delbtn(item.id);
    let subdata = (0, _findChildrens.directChild)(props.tempMenu, item._id, "seq");
    return subdata ? /*#__PURE__*/_react.default.createElement("li", {
      key: "droplist" + item.id,
      id: item.id,
      className: ["ui-state-default"].join(" "),
      onClick: () => props.selectedmenu(item._id)
    }, item.title, /*#__PURE__*/_react.default.createElement(NestedList, {
      data: subdata,
      tempMenu: props.tempMenu
    }), delicon) : /*#__PURE__*/_react.default.createElement("li", {
      key: "droplist" + item.id,
      id: item.id,
      className: ["ui-state-default"].join(" "),
      onClick: () => props.selectedmenu(item._id)
    }, item.title, delicon);
  })) : "";
};

const findmaxnum = () => {
  return "test";
};

const delbtn = id => {
  //delete button at topmenu tab
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    style: {
      float: "right",
      marginTop: 5,
      marginRight: 2,
      marginLeft: 5
    },
    icon: _freeSolidSvgIcons.faTimes,
    key: "del" + id,
    onClick: () => console.log("deleled ud: ", id)
  }));
};