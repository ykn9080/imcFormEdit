"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

var _dataUtil = require("components/functions/dataUtil");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  SubMenu
} = _antd.Menu;

const AntMenu = props => {
  const history = (0, _reactRouterDom.useHistory)();
  let location = (0, _reactRouterDom.useLocation)();
  const [current, setCurrent] = (0, _react.useState)("");
  const [gData, setgData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setgData(treeDt);
    setCurrent(location.pathname);
  }, [props.menuList, location.pathname]); // const routesMap = ({ path, breadcrumbName }) => {
  //   let newdt = [],
  //     links = "";
  //   path.split("/").filter((k, i) => {
  //     if (links.endsWith("/")) links += k;
  //     else {
  //       links += "/" + k;
  //     }
  //     if (i === 0) k = "Home";
  //     return(
  //     newdt.push({ path: links, breadcrumbName: k })
  //     )
  //   });
  //   if (typeof breadcrumbName != "undefined") {
  //     breadcrumbName
  //       .split("/")
  //       .filter((k, i) => (newdt[i]["breadcrumbName"] = k));
  //   }
  //   return newdt;
  // };

  const handleClick = e => {
    console.log("click ", e.item.props.path);
    history.push(e.item.props.path);
    setCurrent(e.key);
    if (props.handleClick) props.handleClick(e.key);
  };

  let treeDt = (0, _dataUtil.getTreeFromFlatData)({
    flatData: props.menuList.map(node => _objectSpread(_objectSpread({}, node), {}, {
      title: node.title
    })),
    getKey: node => node._id,
    // resolve a node's key
    getParentKey: node => node.pid,
    // resolve a node's parent's key
    rootKey: "" // The value of the parent key when there is no parent (i.e., at root level)

  });

  const loop = data => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return /*#__PURE__*/_react.default.createElement(SubMenu, {
          title: item.title,
          key: item._id
        }, loop(item.children));
      }

      return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: item.path,
        path: item.path
      }, item.title);
    });
  };

  return /*#__PURE__*/_react.default.createElement(_antd.Menu, {
    onClick: handleClick,
    selectedKeys: [current],
    mode: "horizontal",
    theme: "dark"
  }, loop(gData));
};

var _default = AntMenu;
exports.default = _default;