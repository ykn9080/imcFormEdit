"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _actions = require("actions");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

var _CardList = _interopRequireDefault(require("components/Common/CardList"));

var _bson = require("bson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//_id maker for MongoDB
const ControlCard = props => {
  const forceUpdate = (0, _useForceUpdate.default)();
  const history = (0, _reactRouterDom.useHistory)();
  let ctrList;
  const dispatch = (0, _reactRedux.useDispatch)();
  ctrList = (0, _reactRedux.useSelector)(state => state.global.control);
  let selectedKey = (0, _reactRedux.useSelector)(state => state.global.selectedKey);
  if (typeof ctrList == "undefined") ctrList = [];
  (0, _react.useEffect)(() => {
    (0, _jquery.default)(".MuiGrid-container").css({
      overflow: "hidden"
    });
  }, [selectedKey]);
  ctrList = _lodash.default.sortBy(ctrList, ["seq"]);

  const createControl = ctrList => {
    let maxseq = _lodash.default.maxBy(ctrList, "seq");

    if (typeof maxseq === "undefined") maxseq = -1;else maxseq = maxseq.seq;

    const _id = new _bson.ObjectID();

    return {
      _id: _id,
      ctrid: "",
      type: "",
      seq: maxseq + 1,
      size: 6
    };
  };

  const newData = createControl(ctrList);

  const addNewControl = ctrList => {
    //ctrList.push(makeNewControl(ctrList));
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    forceUpdate();
  };

  const removeControl = ctrList => {
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    forceUpdate();
  };

  const editControl = data => {
    //history.push("/controls", { data });
    console.log(data);
    history.push("/controledit1", {
      data
    });
  };

  const resizeControl = ctrList => {
    dispatch((0, _actions.globalVariable)({
      control: ctrList
    }));
    forceUpdate();
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CardList.default, {
    cardType: "complex",
    dtList: ctrList,
    removeItemHandler: removeControl,
    resizeItemHandler: resizeControl,
    newData: newData,
    addItemHandler: addNewControl,
    editItemHandler: editControl
  }));
};

var _default = ControlCard;
exports.default = _default;