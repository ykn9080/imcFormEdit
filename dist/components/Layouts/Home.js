"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Head = _interopRequireDefault(require("./Head"));

var _Body = require("./Body");

var _Footer = _interopRequireDefault(require("./Footer"));

var _actions = require("actions");

var _dataUtil = require("components/functions/dataUtil");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeRegularSvgIcons = require("@fortawesome/free-regular-svg-icons");

var _axios = _interopRequireDefault(require("axios"));

var _index = require("config/index.js");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faCheckSquare, _freeSolidSvgIcons.faCoffee, _freeSolidSvgIcons.faUser, _freeSolidSvgIcons.faQuestionCircle, _freeSolidSvgIcons.faArrowCircleDown, _freeSolidSvgIcons.faArrowCircleRight, _freeSolidSvgIcons.faAdjust, _freeRegularSvgIcons.faAngry, _freeSolidSvgIcons.faGlobe, _freeSolidSvgIcons.faCog); // export const addPath1 = (menu, pid, pathname) => {
//   _.filter(menu, function (o) {
//     return o.pid === pid;
//   }).map((k, i) => {
//     k.path = pathname + "/" + k.title;
//     addedmenu.push(k);
//     addPath1(menu, k._id, k.path);
//   });
// };
// export const addRootPid = (data) => {
//   _.forEach(data, function (value, key) {
//     if (typeof value.pid === "undefined") value.pid = "";
//   });
//   return data;
// };
//1. chk redux menu
//2. if not redux openmenu
//3. if not fetch openmenu->dispatch openmenu,


const Home = _ref => {
  let {
    match
  } = _ref;
  let title = match.params.name,
      titleUpper;
  if (typeof match.params.child != "undefined") title = match.params.child;
  if (typeof match.params.grandchild != "undefined") title = match.params.grandchild;
  if (title) titleUpper = title.charAt(0).toUpperCase() + title.slice(1);
  const dispatch = (0, _reactRedux.useDispatch)();
  const openm = [{
    access: [],
    _id: "5ed1c7f116d4fdc25c28c7e4",
    title: "Service",
    desc: "Service and product introduction.... ",
    layout: [],
    path: "/open/service",
    pid: "",
    seq: 0,
    type: "open"
  }, {
    access: [],
    _id: "5ed1c7f116d4fdc25c28c7e5",
    title: "About us",
    desc: "Company introduction",
    layout: [],
    path: "/open/about us",
    seq: 1,
    pid: "",
    type: "open"
  }];
  dispatch((0, _actions.globalVariable)({
    openmenu: openm
  })); //!!!!알수 없는 이유로 db의  path 가 /open/ 사라짐

  let openmenu = openm; //useSelector((state) => state.global.openmenu);

  (0, _react.useEffect)(() => {
    if (typeof openmenu === "undefined" | openmenu.length === 0) {
      _axios.default.get(_index.currentsetting.webserviceprefix + "menu/any?type=open").then(response => {
        let dt = (0, _dataUtil.addRootPid)(response.data);
        (0, _dataUtil.addPath1)(dt, "", "");
        dispatch((0, _actions.globalVariable)({
          openmenu: _dataUtil.addedmenu
        }));
      }).catch(Error => {
        console.log(Error);
      });
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Head.default, null), /*#__PURE__*/_react.default.createElement(_Body.CenteredGrid, null), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};

var _default = Home;
exports.default = _default;