"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("actions");

var _reactRouterDom = require("react-router-dom");

var _lodash = _interopRequireDefault(require("lodash"));

var _jquery = _interopRequireDefault(require("jquery"));

var _styles = require("@material-ui/core/styles");

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _IconButton = _interopRequireDefault(require("components/Common/IconButton"));

var _Layout = _interopRequireDefault(require("images/Layout/Layout1.png"));

var _Layout2 = _interopRequireDefault(require("images/Layout/Layout2.png"));

var _Layout3 = _interopRequireDefault(require("images/Layout/Layout3.png"));

var _Layout4 = _interopRequireDefault(require("images/Layout/Layout4.png"));

var _Layout5 = _interopRequireDefault(require("images/Layout/Layout5.png"));

var _Layout6 = _interopRequireDefault(require("images/Layout/Layout6.png"));

var _Layout7 = _interopRequireDefault(require("images/Layout/Layout7.png"));

var _Layout8 = _interopRequireDefault(require("images/Layout/Layout8.png"));

var _bson = require("bson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//_id maker for MongoDB
const useStyles = (0, _styles.makeStyles)(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));

const IconArray = () => {
  const layout = [{
    col: [1],
    repeat: 1
  }, {
    col: [1],
    repeat: 2
  }, {
    col: [2],
    repeat: 2
  }, {
    col: [3],
    repeat: 3
  }, {
    col: [1, 2],
    repeat: 1
  }, {
    col: [2, 1],
    repeat: 1
  }, {
    col: [1, 3],
    repeat: 1
  }, {
    col: [3, 1],
    repeat: 1
  }];
  let ctrList = (0, _reactRedux.useSelector)(state => state.global.control);
  if (typeof ctrList === "undefined") ctrList = [];
  const dispatch = (0, _reactRedux.useDispatch)();
  const history = (0, _reactRouterDom.useHistory)();
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  const [anchorEl1, setAnchorEl1] = (0, _react.useState)(null);
  const [layoutIndex, setLayoutIndex] = (0, _react.useState)(0); //selected layout form index

  const handleReset = () => {
    dispatch((0, _actions.globalVariable)({
      control: []
    }));
    dispatch((0, _actions.globalVariable)({
      menuedit: false
    }));
    handleClose();
  };

  const handleClick = event => {
    const id = (0, _jquery.default)(event.currentTarget).attr("aria-controls");
    console.log(id, event.currentTarget);

    switch (id) {
      case "editMenu":
        setAnchorEl(event.currentTarget);
        break;

      case "layoutMenu":
        setAnchorEl1(event.currentTarget);
        break;

      default:
        return null;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = num => {
    console.log(num);
    setLayoutIndex(num - 1);
    LayoutControl(layout[num - 1]);
    setAnchorEl1(null);
  };

  const handleMenuEdit = () => {
    dispatch((0, _actions.globalVariable)({
      menuedit: true
    }));
    dispatch((0, _actions.globalVariable)({
      control: []
    }));
    handleClose();
  };

  const handleNavigate = e => {
    //e.preventDefault();
    history.push("/controls");
    handleClose();
  };

  const findNthWidth = (seq, arr) => {
    //find nth round
    const ttl = _lodash.default.sum(arr);

    const index = seq % ttl; //find arr index

    if (index + 1 <= arr[0]) return 12 / arr[0];else return 12 / arr[1];
  };

  let addCtr = (seq, size) => {
    const id = new _bson.ObjectID();
    console.log(id);
    return {
      _id: id,
      ctrid: "",
      type: "",
      seq: seq,
      size: size
    };
  };

  const handleAddControl = () => {
    const ctrLength = ctrList.length;
    console.log(layoutIndex);
    const layObj = layout[layoutIndex];
    const ttl = _lodash.default.sum(layObj.col) * layObj.repeat;
    console.log(ctrLength, layObj, ttl);
    let seq = ctrLength;
    ctrList.push(addCtr(seq, findNthWidth(seq, layObj.col)));
    console.log(ctrList);
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    LayoutControl(layObj, ctrList);
  };

  const LayoutControl = (layObj, ctrl) => {
    if (typeof layObj === "undefined") return false;
    if (typeof ctrl != "undefined") ctrList = ctrl;
    console.log(ctrList); // let unitwidth = 12 / _.sum(layObj.col);

    if (ctrList.length === 0) {
      //| isBlank()) {
      ctrList = [];
      let seq = 0;

      for (let i = 0; i < layObj.repeat; i++) {
        layObj.col.map((v, i) => {
          for (let j = 0; j < v; j++) {
            return ctrList.push(addCtr(seq, findNthWidth(seq, layObj.col))), seq++;
          }

          return null;
        });
      }
    } else {
      ctrList = _lodash.default.sortBy(ctrList, ["seq"]);
      ctrList.map((ctr, j) => {
        ctr.seq = j;
        ctr.size = findNthWidth(j, layObj.col);
        return null;
      });
      console.log(ctrList);
    }

    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
  };

  const layoutMenu = /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "layoutMenu",
    anchorEl: anchorEl1,
    keepMounted: true,
    open: Boolean(anchorEl1),
    onClose: handleClose1
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(1)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(2)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout2.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(3)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout3.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(4)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout4.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(5)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout5.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(6)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout6.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(7)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout7.default,
    alt: "img",
    width: 25
  }))), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: () => handleClose1(8)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _Layout8.default,
    alt: "img",
    width: 25
  }))));

  const editMenu = /*#__PURE__*/_react.default.createElement(_Menu.default, {
    id: "editMenu",
    anchorEl: anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleMenuEdit
  }, "Edit"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleReset
  }, "Reset"), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    onClick: handleNavigate
  }, "Navigate"));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    tooltip: "Go to Previous",
    awesome: "chevron-circle-left",
    fontSize: "small",
    "aria-controls": "back",
    onClick: () => history.goBack()
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    tooltip: "Other menus",
    awesome: "caret-square-down",
    fontSize: "small",
    "aria-controls": "editMenu",
    onClick: handleClick
  }), layoutMenu, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    tooltip: "Layout for controls",
    awesome: "grip-vertical",
    fontSize: "small",
    "aria-controls": "layoutMenu",
    onClick: handleClick
  }), editMenu, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    tooltip: "Add Controls",
    awesome: "plus-square",
    fontSize: "small",
    onClick: handleAddControl
  }));
};

var _default = IconArray;
exports.default = _default;